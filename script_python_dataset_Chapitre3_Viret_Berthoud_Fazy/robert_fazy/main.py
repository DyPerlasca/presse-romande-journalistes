import csv
import re
from pathlib import Path


# =========================================================
# CARTELLE E FILE DI OUTPUT
# =========================================================

BASE_DIR = Path(__file__).resolve().parent

OUTPUT_DIR = BASE_DIR / "output_fazy"
OUTPUT_DIR.mkdir(exist_ok=True)

OUTPUT_GDL = OUTPUT_DIR / "robert_fazy_GDL_firme.csv"
OUTPUT_JDG = OUTPUT_DIR / "robert_fazy_JDG_firme.csv"
OUTPUT_ALL = OUTPUT_DIR / "robert_fazy_tous_journaux.csv"


# =========================================================
# NOMI POSSIBILI DELLE COLONNE
# =========================================================

TEXT_COLUMNS = [
    "text.content",
    "content",
    "text",
    "ocr",
    "fulltext",
    "article",
    "contenu",
    "texte",
]

DATE_COLUMNS = [
    "meta.date",
    "date",
    "Date",
    "publication_date",
    "issue_date",
]

JOURNAL_COLUMNS = [
    "meta.mediaTitle",
    "mediaTitle",
    "journal",
    "giornale",
    "newspaper",
]


# =========================================================
# REGEX
# =========================================================

# Serve soltanto per contare quante righe contengono
# il nome Robert Fazy, indipendentemente dal fatto
# che si tratti di una firma o di una menzione.
NAME_REGEX = re.compile(
    r"\bRobert\s+Fazy\b",
    flags=re.IGNORECASE,
)


# Cerca la firma esclusivamente alla fine dell'articolo.
#
# Riconosce:
#
# Robert Fazy.
# Robert FAZY
# Robert Fazy, juge fédéral.
# Robert Fazy, Président de la Société suisse
# des amis de l'Extrême-Orient.
#
# Non riconosce:
#
# Mme Robert Fazy
# M. Robert Fazy
# una menzione seguita da altro testo
SIGNATURE_END_REGEX = re.compile(
    r"""
    \b
    Robert
    \s+
    Fazy
    \b

    (?:
        \s*,\s*
        (?:
            juge
            \s+
            fédéral

            |

            président
            \s+
            de
            \s+
            la
            \s+
            société
            \s+
            suisse
            \s+
            des
            \s+
            amis
            \s+
            de
            \s+
            l['’]
            extrême-orient
        )
    )?

    \s*
    [.,;:!†*—–-]*
    \s*
    $
    """,
    flags=re.IGNORECASE | re.VERBOSE,
)


# =========================================================
# LETTURA DEI CSV
# =========================================================

def detect_encoding(file_path):
    """
    Prova automaticamente alcune codifiche comuni.
    """

    encodings = [
        "utf-8-sig",
        "utf-8",
        "cp1252",
        "latin-1",
    ]

    for encoding in encodings:
        try:
            with file_path.open(
                "r",
                encoding=encoding,
                newline=""
            ) as file:
                file.read(20000)

            return encoding

        except UnicodeDecodeError:
            continue

    return "latin-1"


def detect_delimiter(file_path, encoding):
    """
    Cerca di riconoscere automaticamente
    il separatore del CSV.
    """

    with file_path.open(
        "r",
        encoding=encoding,
        newline=""
    ) as file:
        sample = file.read(20000)

    try:
        dialect = csv.Sniffer().sniff(
            sample,
            delimiters=",;\t|"
        )

        return dialect.delimiter

    except csv.Error:
        return ","


def find_column(fieldnames, candidates):
    """
    Cerca una colonna ignorando maiuscole
    e spazi esterni.
    """

    if not fieldnames:
        return None

    normalized = {
        field.strip().lower(): field
        for field in fieldnames
        if field is not None
    }

    for candidate in candidates:
        key = candidate.strip().lower()

        if key in normalized:
            return normalized[key]

    return None


# =========================================================
# NORMALIZZAZIONE DEL TESTO
# =========================================================

def normalize_text(value):
    """
    Uniforma gli spazi senza eliminare gli a capo.

    Gli a capo vengono conservati perché possono
    separare la firma dal corpo dell'articolo.
    """

    if value is None:
        return ""

    text = str(value)

    text = text.replace("\r\n", "\n")
    text = text.replace("\r", "\n")

    # Uniforma soltanto gli spazi orizzontali
    text = re.sub(r"[ \t]+", " ", text)

    # Elimina gli spazi prima e dopo gli a capo
    text = re.sub(r" *\n *", "\n", text)

    # Riduce le sequenze di righe vuote
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


def extract_last_words(text, total_words=50):
    """
    Estrae le ultime 50 parole dell'articolo,
    firma compresa.
    """

    words = re.findall(r"\S+", text)

    return " ".join(
        words[-total_words:]
    )


# =========================================================
# RICONOSCIMENTO DELLA FIRMA
# =========================================================

def find_final_signature(text):
    """
    Cerca Robert Fazy esclusivamente alla fine
    dell'articolo.

    Restituisce None quando il nome è soltanto
    menzionato nel corpo del testo.
    """

    if not text:
        return None

    match = SIGNATURE_END_REGEX.search(text)

    if match is None:
        return None

    return {
        "start": match.start(),
        "end": match.end(),
        "firma_esatta": match.group().strip(),
    }


# =========================================================
# IDENTIFICAZIONE DEL GIORNALE
# =========================================================

def journal_from_filename(file_path):
    """
    Deduce la testata dal nome del file
    o della cartella.
    """

    full_path = str(file_path).lower()

    if (
        "jdg" in full_path
        or "journal de genève" in full_path
        or "journal de geneve" in full_path
    ):
        return "Journal de Genève"

    if (
        "gdl" in full_path
        or "gazette de lausanne" in full_path
    ):
        return "Gazette de Lausanne"

    return ""


def canonicalize_journal(value, file_path):
    """
    Uniforma le diverse forme del nome
    della testata.
    """

    journal = str(value or "").strip()
    normalized = journal.lower()

    if (
        normalized == "jdg"
        or "journal de genève" in normalized
        or "journal de geneve" in normalized
    ):
        return "Journal de Genève"

    if (
        normalized == "gdl"
        or "gazette de lausanne" in normalized
    ):
        return "Gazette de Lausanne"

    inferred = journal_from_filename(file_path)

    if inferred:
        return inferred

    return journal


# =========================================================
# ELABORAZIONE DI UN SINGOLO CSV
# =========================================================

def process_csv(file_path):
    encoding = detect_encoding(file_path)
    delimiter = detect_delimiter(
        file_path,
        encoding
    )

    rows_found = []
    rows_with_name = 0

    with file_path.open(
        "r",
        encoding=encoding,
        newline=""
    ) as file:

        reader = csv.DictReader(
            file,
            delimiter=delimiter
        )

        fieldnames = reader.fieldnames or []

        text_column = find_column(
            fieldnames,
            TEXT_COLUMNS
        )

        date_column = find_column(
            fieldnames,
            DATE_COLUMNS
        )

        journal_column = find_column(
            fieldnames,
            JOURNAL_COLUMNS
        )

        print()
        print(f"File: {file_path}")
        print(f"Separatore: {repr(delimiter)}")
        print(f"Colonna testo: {text_column}")
        print(f"Colonna data: {date_column}")
        print(f"Colonna giornale: {journal_column}")

        if text_column is None:
            print(
                "ERRORE: colonna del testo non trovata."
            )
            print(
                f"Colonne disponibili: {fieldnames}"
            )
            return []

        for row in reader:
            text = normalize_text(
                row.get(text_column, "")
            )

            if not text:
                continue

            # Conta tutte le righe in cui il nome compare,
            # comprese le semplici menzioni.
            if NAME_REGEX.search(text):
                rows_with_name += 1

            signature = find_final_signature(text)

            # Esclude le semplici menzioni.
            if signature is None:
                continue

            date = (
                str(
                    row.get(date_column, "")
                ).strip()
                if date_column
                else ""
            )

            journal_value = (
                row.get(journal_column, "")
                if journal_column
                else ""
            )

            journal = canonicalize_journal(
                journal_value,
                file_path
            )

            rows_found.append({
                "data": date,
                "testo_50_parole": extract_last_words(
                    text,
                    total_words=50
                ),
                "giornale": journal,
                "firma_esatta": signature[
                    "firma_esatta"
                ],
                "file_origine": file_path.name,
            })

    print(
        f"Righe contenenti il nome: "
        f"{rows_with_name}"
    )

    print(
        f"Firme finali riconosciute: "
        f"{len(rows_found)}"
    )

    return rows_found


# =========================================================
# RIMOZIONE DEI DUPLICATI
# =========================================================

def remove_duplicates(rows):
    unique_rows = []
    seen = set()

    for row in rows:
        key = (
            row["data"],
            row["giornale"],
            row["testo_50_parole"],
        )

        if key in seen:
            continue

        seen.add(key)
        unique_rows.append(row)

    return unique_rows


# =========================================================
# SCRITTURA DEGLI OUTPUT
# =========================================================

def write_csv(output_path, rows):
    columns = [
        "data",
        "testo_50_parole",
        "giornale",
        "firma_esatta",
        "file_origine",
    ]

    with output_path.open(
        "w",
        encoding="utf-8-sig",
        newline=""
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=columns
        )

        writer.writeheader()
        writer.writerows(rows)


# =========================================================
# ESECUZIONE PRINCIPALE
# =========================================================

def main():
    # Cerca tutti i CSV nelle cartelle e sottocartelle
    # in cui si trova main.py.
    #
    # Esclude i CSV già prodotti nella cartella output_fazy.
    csv_files = [
        path
        for path in BASE_DIR.rglob("*.csv")
        if OUTPUT_DIR not in path.parents
    ]

    if not csv_files:
        raise FileNotFoundError(
            f"Nessun CSV trovato dentro: {BASE_DIR}"
        )

    all_rows = []

    for csv_file in sorted(csv_files):
        all_rows.extend(
            process_csv(csv_file)
        )

    all_rows = remove_duplicates(all_rows)

    gdl_rows = [
        row
        for row in all_rows
        if row["giornale"]
        == "Gazette de Lausanne"
    ]

    jdg_rows = [
        row
        for row in all_rows
        if row["giornale"]
        == "Journal de Genève"
    ]

    gdl_rows.sort(
        key=lambda row: row["data"]
    )

    jdg_rows.sort(
        key=lambda row: row["data"]
    )

    all_rows.sort(
        key=lambda row: (
            row["data"],
            row["giornale"],
        )
    )

    write_csv(
        OUTPUT_GDL,
        gdl_rows
    )

    write_csv(
        OUTPUT_JDG,
        jdg_rows
    )

    write_csv(
        OUTPUT_ALL,
        all_rows
    )

    print()
    print("========================================")
    print("RISULTATO FINALE")
    print("========================================")

    print(
        f"Gazette de Lausanne: "
        f"{len(gdl_rows)}"
    )

    print(
        f"Journal de Genève: "
        f"{len(jdg_rows)}"
    )

    print(
        f"Totale: "
        f"{len(all_rows)}"
    )

    print()
    print(f"Output GDL: {OUTPUT_GDL}")
    print(f"Output JDG: {OUTPUT_JDG}")
    print(f"Output totale: {OUTPUT_ALL}")


if __name__ == "__main__":
    main()