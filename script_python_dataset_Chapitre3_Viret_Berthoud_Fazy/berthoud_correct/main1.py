import csv
import re
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent

OUTPUT_DIR = BASE_DIR / "output_berthoud"
OUTPUT_DIR.mkdir(exist_ok=True)

COMBINED_OUTPUT = OUTPUT_DIR / "berthoud_tous_journaux.csv"


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


#noms journaux
NEWSPAPER_NAMES = {
    "gdl": "Gazette de Lausanne",
    "gazette": "Gazette de Lausanne",
    "gazette_de_lausanne": "Gazette de Lausanne",

    "jdg": "Journal de Genève",
    "journal_de_geneve": "Journal de Genève",
    "journal-geneve": "Journal de Genève",
    "geneve": "Journal de Genève",

    "express": "L’Express",
    "impartial": "L’Impartial",
    "liberte": "La Liberté",
    "confedere": "Le Confédéré",
    "essor": "L’Essor",
}


#REGEX
# compte chaque occurence
NAME_REGEX = re.compile(
    r"\bDorette\s+Berthoud\b",
    flags=re.IGNORECASE,
)

# cherche nom signature
SIGNATURE_NAME_REGEX = re.compile(
    r"\bDorette\s+Berthoud\b",
    flags=re.IGNORECASE,
)

# mention et pas signature
FALSE_PREFIX_REGEX = re.compile(
    r"""
    (
        Mme
        |
        Mlle
        |
        Madame
        |
        Mademoiselle
        |
        Monsieur
        |
        M\.
    )
    \s+
    Dorette
    \s+
    Berthoud
    """,
    flags=re.IGNORECASE | re.VERBOSE,
)

# capturer listes-sommaires ou annonces
SUMMARY_CONTEXT_REGEX = re.compile(
    r"""
    (
        articles?\s+de
        |
        avec\s+des\s+articles?\s+de
        |
        ont\s+collaboré
        |
        collaborateurs?
        |
        sommaire
    )
    """,
    flags=re.IGNORECASE | re.VERBOSE,
)

# ce qui est accepté après le nom (simboles OCR, ponctuation, etc. ) NO mots
TRAILING_JUNK_REGEX = re.compile(
    r"""
    ^
    \s*
    [.,;:!?\)\]\}†*"'’»«—–\-_0-9\s]*
    $
    """,
    flags=re.VERBOSE,
)


#lire le file

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


# extraire texte 50 mots

def normalize_text(value):
    if value is None:
        return ""

    text = str(value)

    text = text.replace("\r\n", "\n")
    text = text.replace("\r", "\n")


    text = re.sub(r"[ \t]+", " ", text)


    text = re.sub(r"\n+", " ", text)

    return text.strip()


def extract_last_words(text, total_words=50):
    words = re.findall(r"\S+", text)

    return " ".join(words[-total_words:])

#journal

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

    value = value.strip("_")

    return value


#filtres

def should_skip_file(file_path):
    filename = file_path.name.lower()

    excluded_endings = [
        "_firme.csv",
        "_firmati.csv",
        "_firme_finali.csv",
        "_classificato.csv",
        "_classificati.csv",
        "_tous_journaux.csv",
    ]

    return any(
        filename.endswith(ending)
        for ending in excluded_endings
    )


def find_signature(text):
    """
Recherche « Dorette Berthoud » comme signature finale.

    Règle :
    - prend la dernière occurrence du nom ;
    - ne l'accepte que si elle se trouve à la fin de l'article ;
    - elle ne doit être suivie que de signes de ponctuation, d'espaces ou de résidus OCR ;
    - exclut « Mme Dorette Berthoud » et les résumés « Articles de ».
    """

    if not text:
        return None

    matches = list(SIGNATURE_NAME_REGEX.finditer(text))

    if not matches:
        return None

    match = matches[-1]

    start = match.start()
    end = match.end()

    # singature que dans la partie final de l'article. Eviter mentions internes

    if start < len(text) - 800:
        return None

    context_before = text[max(0, start - 180):start]
    context_full = text[max(0, start - 220):end]
    text_after = text[end:]

    # Exclusion Mme Dorette Berthoud, Mlle, Madame, ecc.
    if FALSE_PREFIX_REGEX.search(context_full):
        return None

    # Exclusion sommaires
    if SUMMARY_CONTEXT_REGEX.search(context_before):
        return None

    # Pas de contenu apres signature
    if not TRAILING_JUNK_REGEX.fullmatch(text_after):
        return None

    return {
        "firma_esatta": match.group().strip(),
        "start": start,
        "end": end,
    }


#lire csv

def read_and_filter_csv(file_path):
    encoding = detect_encoding(file_path)
    dialect = detect_dialect(file_path, encoding)

    output_rows = []
    rows_with_name = 0

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
                rows_with_name += 1

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
                "testo_50_parole": extract_last_words(
                    text,
                    total_words=50
                ),
                "giornale": newspaper,
                "firma_esatta": signature["firma_esatta"],
                "file_origine": file_path.name,
            })

    print(f"Righe contenenti Dorette Berthoud: {rows_with_name}")
    print(f"Firme finali riconosciute: {len(output_rows)}")

    return output_rows


# OUTPUT:

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
                "testo_50_parole",
                "giornale",
                "firma_esatta",
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
            row["testo_50_parole"],
            row["giornale"],
            row["firma_esatta"],
        )

        if key in seen:
            continue

        seen.add(key)
        unique_rows.append(row)

    return unique_rows


# Executer

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
            print(f"Ignorato file di output: {csv_file.name}")
            continue

        filtered_rows = read_and_filter_csv(csv_file)

        if not filtered_rows:
            print("  Nessun articolo firmato trovato.")
            continue

        newspaper = filtered_rows[0]["giornale"]

        output_name = (
            f"berthoud_{safe_filename(newspaper)}_firme.csv"
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
            row["giornale"],
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
    print(f"Totale articoli: {len(unique_rows)}")
    print(f"Cartella output: {OUTPUT_DIR}")
    print(f"File complessivo: {COMBINED_OUTPUT.name}")


if __name__ == "__main__":
    main()