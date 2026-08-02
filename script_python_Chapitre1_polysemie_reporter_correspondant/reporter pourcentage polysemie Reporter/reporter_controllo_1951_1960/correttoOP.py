import pandas as pd

# ===== CONFIGURAZIONE =====
file_path = "reporter_1951_1960.csv"
id_column = "uid"
newspaper_column = "mediaUid"
separator = ","

# giornali da mantenere
allowed_newspapers = ["JDG", "GDL"]

output_file = "reporter_1951_1960_JDG_GDL_DEDUP.csv"

# ===== CARICAMENTO =====
df = pd.read_csv(file_path, sep=separator, dtype=str)

print("\n===== DATASET ORIGINALE =====")
print("Righe totali:", len(df))

# ===== FILTRO GIORNALI =====
df = df[df[newspaper_column].isin(allowed_newspapers)]

print("\n===== DOPO FILTRO JDG + GDL =====")
print("Righe rimaste:", len(df))

# ===== STATISTICHE PRIMA =====
total_before = len(df)
unique_before = df[id_column].nunique()

print("\n===== PRIMA DELLA DEDUP =====")
print("Righe totali:", total_before)
print("UID unici:", unique_before)

# ===== RIMOZIONE DUPLICATI =====
df_clean = df.drop_duplicates(subset=[id_column], keep="first")

# ===== STATISTICHE DOPO =====
total_after = len(df_clean)

print("\n===== DOPO DEDUP =====")
print("Righe dopo deduplicazione:", total_after)
print("Duplicati rimossi:", total_before - total_after)

# ===== SALVATAGGIO =====
df_clean.to_csv(output_file, index=False)

print("\nFile salvato come:", output_file)