import csv
import re
from pathlib import Path


# =========================================================
# CARTELLE
# =========================================================

BASE_DIR = Path(__file__).resolve().parent

OUTPUT_DIR = BASE_DIR / "output_viret"
OUTPUT_DIR.mkdir(exist_ok=True)

COMBINED_OUTPUT = OUTPUT_DIR / "viret_gdl_firme.csv"


# =========================================================
# COLONNE POSSIBILI
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

NEWSPAPER_COLUMNS = [
    "meta.mediaTitle",
    "mediaTitle",
    "newspaper",
    "journal",
    "giornale",
    "title",
]


# =========================================================
# NOMI NORMALIZZATI DEI GIORNALI
# =========================================================

NEWSPAPER_NAMES = {
    "gdl": "Gazette de Lausanne",
    "gazette": "Gazette de Lausanne",
    "gazette_de_lausanne": "Gazette de Lausanne",
}


# =========================================================
# REGEX DELLE FORME CERCATE
# =========================================================

# Le forme sono ordinate dalla più sviluppata alla più breve.
SIGNATURE_PATTERNS = [
    (
        "Benjamin Viret",
        re.compile(
            r"\bBenjamin\s+Viret\b",
            flags=re.IGNORECASE,
        ),
    ),
    (
        "B. Viret",
        re.compile(
            r"\bB\s*\.\s*Viret\b",
            flags=re.IGNORECASE,
        ),
    ),
    (
        "B. V.",
        re.compile(
            r"\bB\s*\.\s*V\s*\.",
            flags=re.IGNORECASE,
        ),
    ),
    (
        "Benj.",
        re.compile(
            r"\bBenj\s*\.",
            flags=re.IGNORECASE,
        ),
    ),
]


# Conta qualsiasi occorrenza delle forme cercate.
NAME_REGEX = re.compile(
    r"""
    (
        \bBenjamin\s+Viret\b
        |
        \bB\s*\.\s*Viret\b
        |
        \bB\s*\.\s*V\s*\.
        |
        \bBenj\s*\.
    )
    """,
    flags=re.IGNORECASE | re.VERBOSE,
)


# =========================================================
# CONTESTI DA ESCLUDERE
# =========================================================

# Esclude menzioni introdotte da titoli o formule nominative.
FALSE_PREFIX_REGEX = re.compile(
    r"""
    (
        M\.
        |
        Monsieur
        |
        notre\s+collaborateur
        |
        notre\s+confrère
        |
        notre\s+chroniqueur
        |
        signé
        |
        par
    )
    \s+
    Benjamin
    \s+
    Viret
    """,
    flags=re.IGNORECASE | re.VERBOSE,
)


# Esclude sommari, pubblicità e presentazioni redazionali.
SUMMARY_CONTEXT_REGEX = re.compile(
    r"""
    (
        articles?\s+de
        |
        chronique\s+de
        |
        avec\s+des\s+articles?\s+de
        |
        ont\s+collaboré
        |
        collaborateurs?
        |
        rédaction
        |
        sommaire
        |
        voici\s+ceux
        |
        confectionnent\s+votre\s+journal
        |
        rubrique\s+sportive
    )
    """,
    flags=re.IGNORECASE | re.VERBOSE,
)


# Dopo la firma accetta soltanto punteggiatura,
# spazi e piccoli residui OCR.
TRAILING_JUNK_REGEX = re.compile(
    r"""
    ^
    \s*
    [.,;:!?\)\]\}†*"'’»«—–\-_0-9\s]*
    $
    """,
    flags=re.VERBOSE,
)


# Separatore che può indicare l’inizio di una nuova notizia
# all’interno dello stesso blocco OCR.
ARTICLE_SEPARATOR_REGEX = re.compile(
    r"""
    ^
    \s*
    (
        O{2,5}
        |
        0{2,5}
        |
        \*{2,5}
        |
        —{2,5}
        |
        -{2,5}
        |
        \.{3,}
    )
    \s*
    """,
    flags=re.IGNORECASE | re.VERBOSE,
)


# =========================================================
# LETTURA FILE
# =========================================================

def detect_encoding(file_path):
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


def detect_dialect(file_path, encoding):
    with file_path.open(
        "r",
        encoding=encoding,
        newline=""
    ) as file:
        sample = file.read(20000)

    try:
        return csv.Sniffer().sniff(
            sample,
            delimiters=",;\t|"
        )

    except csv.Error:
        return csv.excel


def find_column(fieldnames, candidates):
    if not fieldnames:
        return None

    for candidate in candidates:
        if candidate in fieldnames:
            return candidate

    normalized_fields = {
        field.strip().lower(): field
        for field in fieldnames
        if field is not None
    }

    for candidate in candidates:
        normalized_candidate = candidate.strip().lower()

        if normalized_candidate in normalized_fields:
            return normalized_fields[normalized_candidate]

    return None


# =========================================================
# TESTO
# =========================================================

def normalize_text(value):
    if value is None:
        return ""

    text = str(value)

    text = text.replace("\r\n", "\n")
    text = text.replace("\r", "\n")
    text = text.replace("\u00a0", " ")

    # Uniforma gli spazi orizzontali.
    text = re.sub(r"[ \t]+", " ", text)

    # Trasforma gli a capo in spazi.
    text = re.sub(r"\n+", " ", text)

    return text.strip()


def extract_last_words(text, total_words=60):
    words = re.findall(r"\S+", text)

    return " ".join(words[-total_words:])


# =========================================================
# GIORNALE
# =========================================================

def normalize_filename(value):
    value = value.lower()

    replacements = {
        "à": "a",
        "â": "a",
        "ä": "a",
        "é": "e",
        "è": "e",
        "ê": "e",
        "ë": "e",
        "î": "i",
        "ï": "i",
        "ô": "o",
        "ö": "o",
        "ù": "u",
        "û": "u",
        "ü": "u",
        "ç": "c",
        "’": "_",
        "'": "_",
        " ": "_",
        "-": "_",
    }

    for old, new in replacements.items():
        value = value.replace(old, new)

    return value


def newspaper_from_filename(file_path):
    full_path = normalize_filename(str(file_path))

    for keyword, newspaper in NEWSPAPER_NAMES.items():
        normalized_keyword = normalize_filename(keyword)

        if normalized_keyword in full_path:
            return newspaper

    return file_path.stem


def canonicalize_newspaper(value, file_path):
    newspaper = str(value or "").strip()

    if not newspaper:
        return newspaper_from_filename(file_path)

    normalized = normalize_filename(newspaper)

    for keyword, canonical_name in NEWSPAPER_NAMES.items():
        normalized_keyword = normalize_filename(keyword)

        if normalized_keyword in normalized:
            return canonical_name

    return newspaper


def safe_filename(value):
    value = normalize_filename(value)

    value = re.sub(
        r"[^a-z0-9]+",
        "_",
        value
    )

    return value.strip("_")


# =========================================================
# FILTRI FILE
# =========================================================

def should_skip_file(file_path):
    filename = file_path.name.lower()

    excluded_endings = [
        "_firme.csv",
        "_firmati.csv",
        "_firme_finali.csv",
        "_classificato.csv",
        "_classificati.csv",
        "_a_verifier.csv",
        "_tous_journaux.csv",
    ]

    return any(
        filename.endswith(ending)
        for ending in excluded_endings
    )


# =========================================================
# CONTROLLO DEL TESTO DOPO LA FIRMA
# =========================================================

def valid_text_after_signature(text_after):
    """
    Accetta la firma quando dopo di essa compare:

    1. soltanto punteggiatura o residuo OCR;
    2. un separatore tipografico seguito dall’inizio
       di una nuova notizia nello stesso blocco OCR.
    """

    if TRAILING_JUNK_REGEX.fullmatch(text_after):
        return True

    separator_match = ARTICLE_SEPARATOR_REGEX.match(text_after)

    if separator_match:
        return True

    return False


# =========================================================
# RICERCA DELLA FIRMA
# =========================================================

def find_signature(text):
    """
    Cerca le forme attribuibili a Benjamin Viret come firma.

    Regole:
    - considera tutte le forme previste;
    - prende l’ultima occorrenza utile;
    - richiede che sia nella parte finale dell’articolo;
    - esclude sommari, presentazioni e menzioni nominative;
    - accetta un separatore dopo la firma quando l’OCR
      ha incorporato l’inizio dell’articolo successivo.
    """

    if not text:
        return None

    candidates = []

    for normalized_form, regex in SIGNATURE_PATTERNS:
        for match in regex.finditer(text):
            candidates.append({
                "forma_normalizzata": normalized_form,
                "match": match,
            })

    if not candidates:
        return None

    # Controlla prima le occorrenze più vicine alla fine.
    candidates.sort(
        key=lambda item: item["match"].start(),
        reverse=True
    )

    for candidate in candidates:
        match = candidate["match"]

        start = match.start()
        end = match.end()

        # La firma deve trovarsi negli ultimi 1.000 caratteri.
        # La soglia è un po’ più larga rispetto a Dorette,
        # perché gli articoli sportivi possono contenere
        # una breve notizia successiva nello stesso blocco OCR.
        if start < len(text) - 1000:
            continue

        context_before = text[max(0, start - 220):start]
        context_full = text[max(0, start - 250):end]
        text_after = text[end:]

        # Esclude M. Benjamin Viret, Monsieur Benjamin Viret, ecc.
        if FALSE_PREFIX_REGEX.search(context_full):
            continue

        # Esclude sommari, ours, annunci redazionali.
        if SUMMARY_CONTEXT_REGEX.search(context_before):
            continue

        if not valid_text_after_signature(text_after):
            continue

        return {
            "firma_esatta": match.group().strip(),
            "firma_normalizzata": candidate["forma_normalizzata"],
            "start": start,
            "end": end,
        }

    return None


# =========================================================
# LETTURA E FILTRAGGIO CSV
# =========================================================

def read_and_filter_csv(file_path):
    encoding = detect_encoding(file_path)
    dialect = detect_dialect(file_path, encoding)

    output_rows = []
    rows_with_form = 0

    with file_path.open(
        "r",
        encoding=encoding,
        newline=""
    ) as file:

        reader = csv.DictReader(
            file,
            dialect=dialect
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

        newspaper_column = find_column(
            fieldnames,
            NEWSPAPER_COLUMNS
        )

        print()
        print(f"Analisi di: {file_path}")
        print(f"Colonna testo: {text_column}")
        print(f"Colonna data: {date_column}")
        print(f"Colonna giornale: {newspaper_column}")

        if text_column is None:
            print(
                f"Saltato {file_path.name}: "
                "colonna del testo non trovata."
            )
            print(f"Colonne disponibili: {fieldnames}")
            return []

        for row in reader:
            text = normalize_text(
                row.get(text_column, "")
            )

            if not text:
                continue

            if NAME_REGEX.search(text):
                rows_with_form += 1

            signature = find_signature(text)

            if signature is None:
                continue

            date = (
                str(row.get(date_column, "")).strip()
                if date_column
                else ""
            )

            newspaper_raw = (
                row.get(newspaper_column, "")
                if newspaper_column
                else ""
            )

            newspaper = canonicalize_newspaper(
                newspaper_raw,
                file_path
            )

            output_rows.append({
                "data": date,
                "testo_60_parole": extract_last_words(
                    text,
                    total_words=60
                ),
                "giornale": newspaper,
                "firma_esatta": signature["firma_esatta"],
                "firma_normalizzata": (
                    signature["firma_normalizzata"]
                ),
                "file_origine": file_path.name,
            })

    print(
        "Righe contenenti almeno una forma cercata: "
        f"{rows_with_form}"
    )
    print(
        f"Firme finali riconosciute: {len(output_rows)}"
    )

    return output_rows


# =========================================================
# OUTPUT
# =========================================================

def write_csv(output_path, rows):
    with output_path.open(
        "w",
        encoding="utf-8-sig",
        newline=""
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=[
                "data",
                "testo_60_parole",
                "giornale",
                "firma_esatta",
                "firma_normalizzata",
                "file_origine",
            ]
        )

        writer.writeheader()
        writer.writerows(rows)


def remove_duplicates(rows):
    unique_rows = []
    seen = set()

    for row in rows:
        key = (
            row["data"],
            row["testo_60_parole"],
            row["giornale"],
            row["firma_normalizzata"],
        )

        if key in seen:
            continue

        seen.add(key)
        unique_rows.append(row)

    return unique_rows


# =========================================================
# ESECUZIONE
# =========================================================

def main():
    all_rows = []

    csv_files = sorted(
        BASE_DIR.rglob("*.csv")
    )

    if not csv_files:
        raise FileNotFoundError(
            f"Nessun file CSV trovato nella cartella:\n{BASE_DIR}"
        )

    for csv_file in csv_files:
        if OUTPUT_DIR in csv_file.parents:
            continue

        if should_skip_file(csv_file):
            print(
                f"Ignorato file di output: {csv_file.name}"
            )
            continue

        filtered_rows = read_and_filter_csv(csv_file)

        if not filtered_rows:
            print("  Nessun articolo firmato trovato.")
            continue

        newspaper = filtered_rows[0]["giornale"]

        output_name = (
            f"viret_{safe_filename(newspaper)}_"
            f"{safe_filename(csv_file.stem)}_firme.csv"
        )

        individual_output = OUTPUT_DIR / output_name

        write_csv(
            individual_output,
            filtered_rows
        )

        all_rows.extend(filtered_rows)

        print(
            f"  Articoli trovati: {len(filtered_rows)}"
        )

        print(
            f"  File creato: {individual_output.name}"
        )

    unique_rows = remove_duplicates(all_rows)

    unique_rows.sort(
        key=lambda row: (
            row["data"],
            row["firma_normalizzata"],
        )
    )

    write_csv(
        COMBINED_OUTPUT,
        unique_rows
    )

    print()
    print("========================================")
    print("ELABORAZIONE COMPLETATA")
    print("========================================")
    print(f"Totale articoli firmati: {len(unique_rows)}")
    print(f"Cartella output: {OUTPUT_DIR}")
    print(f"File complessivo: {COMBINED_OUTPUT.name}")


if __name__ == "__main__":
    main()