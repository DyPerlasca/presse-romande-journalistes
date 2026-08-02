import pandas as pd
import re

INPUT_CSV = "reporter_1921_1940_JDG_GDL_DEDUP.csv"
OUTPUT_CSV = "validazione_reporter_JDG_GDL_300_1921_1940.csv"
SAMPLE_N = 300
SEED = 42

ID_COL = "uid"
TEXT_COL = None
ROOT = "report"

def find_text_column(df):
    if TEXT_COL is not None:
        return TEXT_COL
    for c in ["text", "content", "ocr", "body", "article", "fulltext", "text_content"]:
        if c in df.columns:
            return c
    lengths = df.astype(str).apply(lambda col: col.str.len().mean())
    return lengths.idxmax()

def get_clean_snippet(text, root=ROOT, window=10):
    words = str(text).split()
    for i, w in enumerate(words):
        if root in w.lower():
            start = max(0, i - window)
            end = min(len(words), i + window + 1)
            return " ".join(words[start:end])
    return "KEYWORD_NON_TROVATA"

df = pd.read_csv(INPUT_CSV, encoding="utf-8", engine="python", dtype=str)

text_col = find_text_column(df)

hits = df[df[text_col].str.contains(ROOT, case=False, na=False)].copy()

sample = hits.sample(n=min(SAMPLE_N, len(hits)), random_state=SEED)

out = pd.DataFrame()
out["uid"] = sample[ID_COL]
out["CONTEXT_SNIPPET"] = sample[text_col].apply(get_clean_snippet)
out["VALUTAZIONE"] = ""

out.to_csv(OUTPUT_CSV, index=False, encoding="utf-8-sig")

print(f"Creato {OUTPUT_CSV} con {len(out)} righe.")