import pandas as pd

# ====== CONFIGURAZIONE ======
file_path = "reporter 1901-1920.csv"
id_column = "uid"
separator = ","

# ====== CARICAMENTO FILE ======
df = pd.read_csv(file_path, sep=separator, dtype=str)

# ====== STATISTICHE BASE ======
total_rows = len(df)
counts = df[id_column].value_counts()
unique_ids = len(counts)
duplicate_rows = total_rows - unique_ids

print("\n===== STATISTICHE GENERALI =====")
print("Righe totali:", total_rows)
print("ID unici:", unique_ids)
print("Righe duplicate extra:", duplicate_rows)

# ====== DISTRIBUZIONE OCCORRENZE ======
freq_dist = counts.value_counts().sort_index()

print("\n===== DISTRIBUZIONE FREQUENZE UID =====")
for occ, n_ids in freq_dist.items():
    print(f"UID che compaiono {occ} volte:", n_ids)

# ====== CLASSI ======
dupes = counts[counts == 2]
triples = counts[counts == 3]
quadruples = counts[counts == 4]
more = counts[counts >= 5]

print("\n===== CLASSI DI DUPLICAZIONE =====")
print("Duplicati (2x):", len(dupes))
print("Triplicati (3x):", len(triples))
print("Quadruplicati (4x):", len(quadruples))
print("≥5 occorrenze:", len(more))

# ====== RIGHE EXTRA PER CLASSE ======
extra_dupes = (2-1) * len(dupes)
extra_triples = (3-1) * len(triples)
extra_quads = (4-1) * len(quadruples)
extra_more = sum(counts[counts>=5] - 1)

print("\n===== RIGHE EXTRA GENERATE =====")
print("Da duplicati:", extra_dupes)
print("Da triplicati:", extra_triples)
print("Da quadruplicati:", extra_quads)
print("Da ≥5:", extra_more)

# ====== LISTE UID ======
dupes.to_csv("uid_duplicati.csv")
triples.to_csv("uid_triplicati.csv")
quadruples.to_csv("uid_quadruplicati.csv")
more.to_csv("uid_superduplicati.csv")

# ====== ESTRAZIONE RIGHE COMPLETE ======
df[df[id_column].isin(dupes.index)].to_csv("righe_duplicati.csv", index=False)
df[df[id_column].isin(triples.index)].to_csv("righe_triplicati.csv", index=False)
df[df[id_column].isin(quadruples.index)].to_csv("righe_quadruplicati.csv", index=False)
df[df[id_column].isin(more.index)].to_csv("righe_superduplicati.csv", index=False)

# ====== CHECK DI COERENZA ======
reconstructed_total = int((counts * 1).sum())
reconstructed_extra = int((counts - 1).sum())

print("\n===== CHECK =====")
print("Totale ricostruito da counts:", reconstructed_total)
print("Extra ricostruite da counts:", reconstructed_extra)

assert reconstructed_total == total_rows, "Errore: total_rows non coincide con la somma delle occorrenze!"
assert reconstructed_extra == duplicate_rows, "Errore: duplicate_rows non coincide con la somma delle extra!"
print("Check OK ✅")

print("\nFile esportati con successo.")