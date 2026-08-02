import csv
import re
from pathlib import Path


# debut recherche file

BASE_DIR = Path("/Users/dylanperlasca/Desktop/berthoud_correct")
SIGNATURE_OUTPUT_DIR = BASE_DIR / "output_berthoud"

MENTION_OUTPUT_DIR = BASE_DIR / "output_berthoud_menzioni"
MENTION_OUTPUT_DIR.mkdir(exist_ok=True)

COMBINED_OUTPUT = MENTION_OUTPUT_DIR / "berthoud_toutes_mentions.csv"


# colonnes
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


# normalisation noms journaux

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


# REGEX


NAME_REGEX = re.compile(
    r"\bDorette\s+Berthoud\b",
    flags=re.IGNORECASE,
)

SIGNATURE_NAME_REGEX = re.compile(
    r"\bDorette\s+Berthoud\b",
    flags=re.IGNORECASE,
)

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

TRAILING_JUNK_REGEX = re.compile(
    r"""
    ^
    \s*
    [.,;:!?\)\]\}†*"'’»«—–\-_0-9\s]*
    $
    """,
    flags=re.VERBOSE,
)


# lire le file

def detect_encoding(file_path):
    for encoding in ["utf-8-sig", "utf-8", "cp1252", "latin-1"]:
        try:
            with file_path.open("r", encoding=encoding, newline="") as file:
                file.read(20000)
            return encoding
        except UnicodeDecodeError:
            continue

    return "latin-1"


def detect_dialect(file_path, encoding):
    with file_path.open("r", encoding=encoding, newline="") as file:
        sample = file.read(20000)

    try:
        return csv.Sniffer().sniff(sample, delimiters=",;\t|")
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


# TEXTE

def normalize_text(value):
    if value is None:
        return ""

    text = str(value)
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n+", " ", text)

    return text.strip()


def extract_context(text, start, end, words_before=40, words_after=40):
    before = re.findall(r"\S+", text[:start])
    name = text[start:end]
    after = re.findall(r"\S+", text[end:])

    return " ".join(
        before[-words_before:]
        + [name]
        + after[:words_after]
    )


def extract_last_words(text, total_words=50):
    words = re.findall(r"\S+", text)
    return " ".join(words[-total_words:])



def normalize_filename(value):
    value = value.lower()

    replacements = {
        "à": "a", "â": "a", "ä": "a",
        "é": "e", "è": "e", "ê": "e", "ë": "e",
        "î": "i", "ï": "i",
        "ô": "o", "ö": "o",
        "ù": "u", "û": "u", "ü": "u",
        "ç": "c",
        "’": "_", "'": "_", " ": "_", "-": "_",
    }

    for old, new in replacements.items():
        value = value.replace(old, new)

    return value


def newspaper_from_filename(file_path):
    full_path = normalize_filename(str(file_path))

    for keyword, newspaper in NEWSPAPER_NAMES.items():
        if normalize_filename(keyword) in full_path:
            return newspaper

    return file_path.stem


def canonicalize_newspaper(value, file_path):
    newspaper = str(value or "").strip()

    if not newspaper:
        return newspaper_from_filename(file_path)

    normalized = normalize_filename(newspaper)

    for keyword, canonical_name in NEWSPAPER_NAMES.items():
        if normalize_filename(keyword) in normalized:
            return canonical_name

    return newspaper


def safe_filename(value):
    """
    Creer nom plus compacte pour le journal:
    L’Essor -> lessor
    L’Express -> lexpress
    L’Impartial -> limpartial
    Gazette de Lausanne -> gazettedelausanne
    """
    value = normalize_filename(value)
    value = re.sub(r"[^a-z0-9]+", "", value)
    return value


# classification

def classify_name_occurrence(text):
    """
Renvoie :
    - (« signature », motif, correspondance) si la ligne est une signature finale ;
    - (« mention », motif, correspondance) dans les autres cas.

    La logique de la signature est identique à celle de main1.py.
    """

    matches = list(SIGNATURE_NAME_REGEX.finditer(text))

    if not matches:
        return None

    match = matches[-1]
    start = match.start()
    end = match.end()

    context_before = text[max(0, start - 180):start]
    context_full = text[max(0, start - 220):end]
    text_after = text[end:]

    if start < len(text) - 800:
        return "menzione", "nome_non_nella_parte_finale", match

    if FALSE_PREFIX_REGEX.search(context_full):
        return "menzione", "titolo_o_formula_nominale", match

    if SUMMARY_CONTEXT_REGEX.search(context_before):
        return "menzione", "sommario_o_elenco_collaboratori", match

    if not TRAILING_JUNK_REGEX.fullmatch(text_after):
        return "menzione", "contenuto_significativo_dopo_il_nome", match

    return "firma", "firma_finale", match


# filtres file

def should_skip_file(file_path):
    # Pas lecture output file 1
    if SIGNATURE_OUTPUT_DIR in file_path.parents:
        return True

    if MENTION_OUTPUT_DIR in file_path.parents:
        return True

    filename = file_path.name.lower()

    excluded_endings = [
        "_firme.csv",
        "_firmati.csv",
        "_firme_finali.csv",
        "_classificato.csv",
        "_classificati.csv",
        "_tous_journaux.csv",
        "_toutes_mentions.csv",
        "_mentions.csv",
        "_menzioni.csv",
    ]

    return any(filename.endswith(ending) for ending in excluded_endings)


# lecture et classification CSV

def read_and_extract_mentions(file_path):
    encoding = detect_encoding(file_path)
    dialect = detect_dialect(file_path, encoding)

    output_rows = []
    total_name_rows = 0
    signature_rows = 0

    with file_path.open("r", encoding=encoding, newline="") as file:
        reader = csv.DictReader(file, dialect=dialect)
        fieldnames = reader.fieldnames or []

        text_column = find_column(fieldnames, TEXT_COLUMNS)
        date_column = find_column(fieldnames, DATE_COLUMNS)
        newspaper_column = find_column(fieldnames, NEWSPAPER_COLUMNS)

        print()
        print(f"Analyse de: {file_path}")
        print(f"Colonne texte: {text_column}")
        print(f"Colonne data: {date_column}")
        print(f"Colonne journal: {newspaper_column}")

        if text_column is None:
            print(f"Sauté {file_path.name}: colonne pas trouvé.")
            print(f"Colonnes dispo: {fieldnames}")
            return []

        for row_number, row in enumerate(reader, start=2):
            text = normalize_text(row.get(text_column, ""))

            if not text or not NAME_REGEX.search(text):
                continue

            total_name_rows += 1

            classification = classify_name_occurrence(text)

            if classification is None:
                continue

            category, reason, match = classification

            # conserver ce qui n'est pas signature
            if category == "firma":
                signature_rows += 1
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
                "nom journal": newspaper,
                "mentions": extract_context(
                    text,
                    match.start(),
                    match.end(),
                    words_before=40,
                    words_after=40,
                ),
            })

    print(f"Lignes avec Dorette Berthoud: {total_name_rows}")
    print(f"Lignes classifiées avec signature: {signature_rows}")
    print(f"Lignes conservés comme mention: {len(output_rows)}")

    return output_rows


# OUTPUT

FIELDNAMES = [
    "data",
    "nom journal",
    "mentions",
]


def write_csv(output_path, rows):
    with output_path.open(
        "w",
        encoding="utf-8-sig",
        newline=""
    ) as file:
        writer = csv.DictWriter(
            file,
            fieldnames=FIELDNAMES,
        )
        writer.writeheader()
        writer.writerows(rows)


def remove_duplicates(rows):
    unique_rows = []
    seen = set()

    for row in rows:
        key = (
            row["data"],
            row["nom journal"],
            row["mentions"],
        )

        if key in seen:
            continue

        seen.add(key)
        unique_rows.append(row)

    return unique_rows


# EXECUTION
def main():
    all_rows = []

    csv_files = sorted(BASE_DIR.rglob("*.csv"))

    if not csv_files:
        raise FileNotFoundError(
            f"Nessun file CSV trovato nella cartella:\n{BASE_DIR}"
        )

    for csv_file in csv_files:
        if should_skip_file(csv_file):
            print(f"Ignorato file di output: {csv_file.name}")
            continue

        mention_rows = read_and_extract_mentions(csv_file)

        if not mention_rows:
            print("  Nessuna menzione non classificata come firma.")
            continue

        newspaper = mention_rows[0]["nom journal"]

        output_name = (
            f"berthoud_{safe_filename(newspaper)}_mentions.csv"
        )

        individual_output = MENTION_OUTPUT_DIR / output_name

        write_csv(individual_output, mention_rows)
        all_rows.extend(mention_rows)

        print(f"  Menzioni trovate: {len(mention_rows)}")
        print(f"  File creato: {individual_output.name}")

    unique_rows = remove_duplicates(all_rows)

    unique_rows.sort(
        key=lambda row: (
            row["data"],
            row["nom journal"],
        )
    )

    write_csv(COMBINED_OUTPUT, unique_rows)

    print()
    print("========================================")
    print("Completé")
    print("========================================")
    print(f"Tot mentions: {len(unique_rows)}")
    print(f"Fichier output: {MENTION_OUTPUT_DIR}")
    print(f"File : {COMBINED_OUTPUT.name}")


if __name__ == "__main__":
    main()