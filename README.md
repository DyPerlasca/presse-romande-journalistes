# Scripts et codes de visualisation développés dans le cadre du mémoire de master de Dylan Perlasca, UNIL, semestre de printemps 2026 : "Reconstruire le journaliste à travers ses traces dans la presse romande (1870-1980)".

Ce dépôt rassemble les codes utilisés pour produire les graphiques du mémoire "Reconstruire le journaliste à travers ses traces dans la presse romande (1870-1980). Fréquences lexicales, signatures et trajectoires professionnelles". Les données mobilisés proviennent d’Impresso (https://impresso-project.ch/) ou de relevés manuels. Les données Impresso, soumises au droit d’auteur, ne sont pas incluses. Codes réalisés par l'auteur avec le support d'un modèle de langage LLM (ChatGPT) avec l'outil de visualisation "Observable Notebooks" (https://observablehq.com/).

## Contenu du dépôt

Le dépôt comprend :

- des scripts Python utilisés pour nettoyer, filtrer, dédupliquer et créer les dataset utilisés
- des codes sur Observable employés pour produire les graphiques figurant dans ce travail
- des jeux de données dérivés et nettoyés, lorsque leur diffusion est possible 
- les fichiers techniques nécessaires à l’exécution locale de certains notebooks Observable exportés

## Étapes de construction des visualisations

La construction des visualisations repose sur plusieurs types de données et sur des procédures adaptées à chaque partie du mémoire.

### 1. Constitution des corpus

Une première série de données a été obtenue à partir de la plateforme Impresso (https://impresso-project.ch/) sur des corpus choisis.

Pour l’étude lexicale (chapitre 1) présentée dans la section consacrée aux n-grammes, les fichiers CSV correspondent aux occurrences des termes étudiés dans les journaux et bornes chronologiques sélectionnés.

Pour les études de cas du chapitre 3, d’autres fichiers CSV ont été constitués à partir de collections contenant différents mots clés de recherche dans les journaux choisis, notamment :

- « Dorette Berthoud »
- « Benjamin Viret » et ses autres formes de signature
- « Lieut.-col. R. F. » et « Robert Fazy »

Dans le cas de Maurice Aeschimann, le présençogramme est de nature qualitative. Il ne repose donc pas sur un relevé exhaustif des occurrences, mais uniquement sur les articles mobilisés et cités dans le chapitre.

Les données utilisées pour étudier l’évolution des signatures dans le chapitre 2 ont, quant à elles, été relevées manuellement. Les jeux de données correspondants sont disponibles dans ce dépôt sous forme de fichiers CSV.

### 2. Nettoyage et préparation des données

Les fichiers ont ensuite été nettoyés, filtrés et, lorsque cela était nécessaire, dédupliqués à l’aide de scripts Python.

Les principales opérations comprennent :

- la suppression des doublons
- la normalisation des dates et des noms de journaux
- le regroupement de variantes de signature
- l’exclusion de certains faux positifs
- la sélection des colonnes utiles à l’analyse
- l’agrégation des occurrences par semaine, mois ou année

Les rapprochements entre une forme abrégée et un nom développé ont été effectués avec prudence et sont signalés lorsqu’ils demeurent incertains

### 3. Construction des visualisations

Les figures ont été conçues dans des notebooks Observable à l’aide d’Observable Plot et, pour certains graphiques, de composants D3 adaptés aux besoins de l’étude.

Les notebooks ont servi à :

- importer les fichiers CSV nettoyés
- transformer et agréger les données
- produire les graphiques
- ajuster les axes, les légendes et les échelles
- exporter les figures utilisées dans le mémoire

Les fichiers JavaScript présents dans ce dépôt correspondent aux notebooks Observable exportés ainsi qu’aux modules nécessaires à leur exécution locale.
