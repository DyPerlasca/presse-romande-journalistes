import pandas as pd

# ===== CONFIGURAZIONE =====
file_path = "reporter_1941_1950.csv"
id_column = "uid"
separator = ","

output_file = "reporter_1941_1950_DEDUP.csv"

# ===== CARICAMENTO =====
df = pd.read_csv(file_path, sep=separator, dtype=str)

# ===== STATISTICHE PRIMA =====
total_before = len(df)
unique_before = df[id_column].nunique()

print("\n===== PRIMA =====")
print("Righe totali:", total_before)
print("UID unici:", unique_before)

# ===== RIMOZIONE DUPLICATI =====
df_clean = df.drop_duplicates(subset=[id_column], keep="first")

# ===== STATISTICHE DOPO =====
total_after = len(df_clean)

print("\n===== DOPO =====")
print("Righe dopo deduplicazione:", total_after)
print("Duplicati rimossi:", total_before - total_after)

# ===== SALVATAGGIO =====
df_clean.to_csv(output_file, index=False)

print("\nFile salvato come:", output_file)