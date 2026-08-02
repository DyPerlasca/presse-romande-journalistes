import pandas as pd
import re

FILES = [
    (
        "corr_op_1886-88.csv",
        "corr_op_1886-88_DEDUP.csv",
        "validazione_corr_op_300_1886-88.csv",
    ),
    (
        "corr_op_1916-18.csv",
        "corr_op_1916-18_DEDUP.csv",
        "validazione_corr_op_300_1916-18.csv",
    ),
    (
        "corr_op_1925-27.csv",
        "corr_op_1925-27_DEDUP.csv",
        "validazione_corr_op_300_1925-27.csv",
    ),
    (
        "corr_op_1940-42.csv",
        "corr_op_1940-42_DEDUP.csv",
        "validazione_corr_op_300_1940-42.csv",
    ),
    (
        "corr_op_1953-55.csv",
        "corr_op_1953-55_DEDUP.csv",
        "validazione_corr_op_300_1953-55.csv",
    ),
    (
        "corr_op_1963-65.csv",
        "corr_op_1963-65_DEDUP.csv",
        "validazione_corr_op_300_1963-65.csv",
    ),
    (
        "corr_op_1973-75.csv",
        "corr_op_1973-75_DEDUP.csv",
        "validazione_corr_op_300_1973-75.csv",
    ),
]

SAMPLE_N = 300
SEED = 42

ID_COL = "id"
TEXT_COL = "text.content"
ROOT = "correspond"


def find_text_column(df):
    if TEXT_COL is not None:
        return TEXT_COL

    for c in [
        "text",
        "content",
        "ocr",
        "body",
        "article",
        "fulltext",
        "text_content",
    ]:
        if c in df.columns:
            return c

    lengths = df.astype(str).apply(lambda col: col.str.len().mean())
    return lengths.idxmax()


def get_clean_snippet(text, root=ROOT, window=10):
    words = str(text).split()

    for i, word in enumerate(words):
        if root in word.lower():
            start = max(0, i - window)
            end = min(len(words), i + window + 1)
            return " ".join(words[start:end])

    return "KEYWORD_NON_TROVATA"


for input_csv, dedup_csv, output_csv in FILES:
    df = pd.read_csv(
        input_csv,
        encoding="utf-8",
        engine="python",
        dtype=str,
    )

    df_clean = df.drop_duplicates(
        subset=[ID_COL],
        keep="first",
    )

    df_clean.to_csv(
        dedup_csv,
        index=False,
        encoding="utf-8-sig",
    )

    text_col = find_text_column(df_clean)

    hits = df_clean[
        df_clean[text_col].str.contains(
            ROOT,
            case=False,
            na=False,
        )
    ].copy()

    sample = hits.sample(
        n=min(SAMPLE_N, len(hits)),
        random_state=SEED,
    )

    out = pd.DataFrame()
    out["uid"] = sample[ID_COL]
    out["CONTEXT_SNIPPET"] = sample[text_col].apply(
        get_clean_snippet
    )
    out["VALUTAZIONE"] = ""

    out.to_csv(
        output_csv,
        index=False,
        encoding="utf-8-sig",
    )

    print(
        f"Creato {dedup_csv} con {len(df_clean)} righe."
    )
    print(
        f"Creato {output_csv} con {len(out)} righe."
    )