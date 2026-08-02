function _1(md){return(
md`# Dorette Berthoud`
)}

function _2(md){return(
md`Affichage des dataset pour chaque journal:`
)}

function _berthoud_confedere(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_confedere.csv"),{from:{table:"berthoud_confedere"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _berthoud_essor(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_essor.csv"),{from:{table:"berthoud_essor"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _berthoud_l_express_firme(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_l_express_firme.csv"),{from:{table:"berthoud_l_express_firme"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _berthoud_l_impartial_firme(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_l_impartial_firme.csv"),{from:{table:"berthoud_l_impartial_firme"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _berthoud_la_liberte_firme(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_la_liberte_firme.csv"),{from:{table:"berthoud_la_liberte_firme"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _berthoud_le_confedere_firme(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_le_confedere_firme.csv"),{from:{table:"berthoud_le_confedere_firme"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _dorette_berthoud_gdl_clean(__query,FileAttachment,invalidation){return(
__query(FileAttachment("dorette_berthoud_GDL_clean.csv"),{from:{table:"dorette_berthoud_GDL_clean"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _dorette_berthoud_jdg_controle(__query,FileAttachment,invalidation){return(
__query(FileAttachment("dorette_berthoud_JDG_controle.csv"),{from:{table:"dorette_berthoud_JDG_controle"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _dorette_berthoud_gdl_nouvelles_signees(__query,FileAttachment,invalidation){return(
__query(FileAttachment("dorette_berthoud_GDL_nouvelles_signees.csv"),{from:{table:"dorette_berthoud_GDL_nouvelles_signees"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _berthoud_toutes_mentions(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_toutes_mentions.csv"),{from:{table:"berthoud_toutes_mentions"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _berthoud_gazettedelausanne_mentions(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_gazettedelausanne_mentions.csv"),{from:{table:"berthoud_gazettedelausanne_mentions"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _berthoud_journaldegeneve_mentions(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_journaldegeneve_mentions.csv"),{from:{table:"berthoud_journaldegeneve_mentions"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _berthoud_laliberte_mentions(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_laliberte_mentions.csv"),{from:{table:"berthoud_laliberte_mentions"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _berthoud_leconfedere_mentions(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_leconfedere_mentions.csv"),{from:{table:"berthoud_leconfedere_mentions"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _berthoud_lessor_mentions(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_lessor_mentions.csv"),{from:{table:"berthoud_lessor_mentions"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _berthoud_lexpress_mentions(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_lexpress_mentions.csv"),{from:{table:"berthoud_lexpress_mentions"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _berthoud_limpartial_mentions(__query,FileAttachment,invalidation){return(
__query(FileAttachment("berthoud_limpartial_mentions.csv"),{from:{table:"berthoud_limpartial_mentions"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _20(FileAttachment){return(
FileAttachment("berthoud_toutes_mentions.csv").csv({typed: true})
)}

function _21(FileAttachment){return(
FileAttachment("berthoud_l_impartial_firme.csv").csv({typed: true})
)}

function _22(FileAttachment){return(
FileAttachment("berthoud_la_liberte_firme.csv").csv({typed: true})
)}

function _23(FileAttachment){return(
FileAttachment("berthoud_le_confedere_firme.csv").csv({typed: true})
)}

function _24(FileAttachment){return(
FileAttachment("dorette_berthoud_GDL_clean@2.csv").csv({typed: true})
)}

function _25(FileAttachment){return(
FileAttachment("dorette_berthoud_JDG_controle.csv").csv({typed: true})
)}

function _26(FileAttachment){return(
FileAttachment("dorette_berthoud_GDL_nouvelles_signees.csv").csv({typed: true})
)}

function _27(md){return(
md`Nettoyage et mise en forme données:`
)}

async function _jdg_raw_text(FileAttachment){return(
await FileAttachment(
  "dorette_berthoud_JDG_controle.csv"
).text()
)}

function _jdg_clean(jdg_raw_text,d3)
{
  const lignes = jdg_raw_text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/);

  const texteNettoye = lignes
    .slice(1)
    .join("\n");

  return d3.csvParse(texteNettoye, d => ({
    data: new Date(d.data),
    data_originale: d.data_originale,
    giornale: d.giornale,
    firma_esatta: d.firma_esatta
  }));
}


async function _nouvelles_gdl_raw_text(FileAttachment){return(
await FileAttachment(
  "dorette_berthoud_GDL_nouvelles_signees.csv"
).text()
)}

function _nouvelles_gdl_clean(nouvelles_gdl_raw_text,d3)
{
  const lignes = nouvelles_gdl_raw_text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/);

  const texteNettoye = lignes
    .slice(1)
    .join("\n");

  return d3.csvParse(texteNettoye, d => ({
    data: new Date(d.data),
    giornale: d.giornale,
    type_presence: d.type_presence
  }));
}


function _32(jdg_clean){return(
jdg_clean
)}

function _33(nouvelles_gdl_clean){return(
nouvelles_gdl_clean
)}

function _normaliser_journal(){return(
journal => {
  const j = String(journal ?? "").trim();

  const correspondances = new Map([
    ["Gazette de Lausanne", "Gazette de Lausanne"],
    ["Journal de Genève", "Journal de Genève"],
    ["L'Express", "L’Express"],
    ["L’Express", "L’Express"],
    ["L'Impartial", "L’Impartial"],
    ["L’Impartial", "L’Impartial"],
    ["La Liberté", "La Liberté"],
    ["Le Confédéré", "Le Confédéré"],
    ["L'Essor", "L’Essor"],
    ["L’Essor", "L’Essor"]
  ]);

  return correspondances.get(j) ?? j;
}
)}

function _mentions_raw(FileAttachment){return(
FileAttachment(
  "berthoud_toutes_mentions.csv"
).csv({typed: true})
)}

function _berthoud_mentions(mentions_raw,normaliser_journal){return(
mentions_raw
  .map(d => ({
    date: new Date(d.data),
    journal: normaliser_journal(d["nom journal"]),
    texte: String(d.mentions ?? "").trim(),
    type_presence: "Mention"
  }))
  .filter(d =>
    d.date instanceof Date &&
    !Number.isNaN(+d.date) &&
    d.journal
  )
)}

function _37(berthoud_mentions){return(
berthoud_mentions.slice(0, 5)
)}

function _express_firme_raw(FileAttachment){return(
FileAttachment(
  "berthoud_l_express_firme.csv"
).csv({typed: true})
)}

function _impartial_firme_raw(FileAttachment){return(
FileAttachment(
  "berthoud_l_impartial_firme.csv"
).csv({typed: true})
)}

function _liberte_firme_raw(FileAttachment){return(
FileAttachment(
  "berthoud_la_liberte_firme.csv"
).csv({typed: true})
)}

function _confedere_firme_raw(FileAttachment){return(
FileAttachment(
  "berthoud_le_confedere_firme.csv"
).csv({typed: true})
)}

function _gdl_firme_raw(FileAttachment){return(
FileAttachment(
  "dorette_berthoud_GDL_clean@2.csv"
).csv({typed: true})
)}

function _43(gdl_firme_raw){return(
gdl_firme_raw[0]
)}

function _44(express_firme_raw){return(
express_firme_raw[0]
)}

function _berthoud_signatures(express_firme_raw,impartial_firme_raw,liberte_firme_raw,confedere_firme_raw,gdl_firme_raw,jdg_clean){return(
[
  ...express_firme_raw.map(d => ({
    date: d.data instanceof Date ? d.data : new Date(d.data),
    journal: "L’Express",
    texte: String(d.testo_50_parole ?? "").trim(),
    type_presence: "Signature d’article"
  })),

  ...impartial_firme_raw.map(d => ({
    date: d.data instanceof Date ? d.data : new Date(d.data),
    journal: "L’Impartial",
    texte: String(d.testo_50_parole ?? "").trim(),
    type_presence: "Signature d’article"
  })),

  ...liberte_firme_raw.map(d => ({
    date: d.data instanceof Date ? d.data : new Date(d.data),
    journal: "La Liberté",
    texte: String(d.testo_50_parole ?? "").trim(),
    type_presence: "Signature d’article"
  })),

  ...confedere_firme_raw.map(d => ({
    date: d.data instanceof Date ? d.data : new Date(d.data),
    journal: "Le Confédéré",
    texte: String(d.testo_50_parole ?? "").trim(),
    type_presence: "Signature d’article"
  })),

  ...gdl_firme_raw.map(d => ({
    date: d.data instanceof Date ? d.data : new Date(d.data),
    journal: "Gazette de Lausanne",
    texte: String(
      d.nota ??
      d.testo_50_parole ??
      d.type_presence ??
      ""
    ).trim(),
    type_presence: "Signature d’article"
  })),

  ...jdg_clean.map(d => ({
    date: d.data,
    journal: "Journal de Genève",
    texte: String(
      d.firma_esatta ??
      d.data_originale ??
      ""
    ).trim(),
    type_presence: "Signature d’article"
  }))
].filter(d =>
  d.date instanceof Date &&
  !Number.isNaN(+d.date)
)
)}

function _berthoud_nouvelles(nouvelles_gdl_clean){return(
nouvelles_gdl_clean
  .map(d => ({
    date: d.data,
    journal: "Gazette de Lausanne",
    texte: String(d.type_presence ?? "").trim(),
    type_presence: "Nouvelle signée dans la GDL"
  }))
  .filter(d =>
    d.date instanceof Date &&
    !Number.isNaN(+d.date)
  )
)}

function _berthoud_presences(berthoud_mentions,berthoud_signatures,berthoud_nouvelles){return(
[
  ...berthoud_mentions,
  ...berthoud_signatures,
  ...berthoud_nouvelles
]
)}

function _48(d3,berthoud_presences){return(
d3.rollups( //controle finale
  berthoud_presences,
  v => v.length,
  d => d.journal,
  d => d.type_presence
)
)}

function _49(md){return(
md` par mois:`
)}

function _berthoud_par_mois(d3,berthoud_presences){return(
d3.rollups(
  berthoud_presences,

  lignes => ({
    nombre: lignes.length,
    textes: lignes
      .map(d => d.texte)
      .filter(Boolean)
  }),

  d => d3.utcMonth.floor(d.date),
  d => d.journal,
  d => d.type_presence
).flatMap(([date, journaux]) =>
  journaux.flatMap(([journal, types]) =>
    types.map(([type_presence, valeurs]) => ({
      date,
      journal,
      type_presence,
      nombre: valeurs.nombre,
      textes: valeurs.textes
    }))
  )
)
)}

function _berthoud_par_mois_affichage(berthoud_par_mois){return(
berthoud_par_mois.map(d => ({
  ...d,
  journal_affiche:
    d.journal === "L’Express"
      ? "Feuille d’Avis de Neuchâtel"
      : d.journal
}))
)}

function _ordre_journaux_berthoud(berthoud_par_mois){return(
[
  "Gazette de Lausanne",
  "Journal de Genève",
  "L’Express",
  "L’Impartial",
  "La Liberté",
  "Le Confédéré",
  "L’Essor"
].filter(journal =>
  berthoud_par_mois.some(d => d.journal === journal)
)
)}

function _ordre_journaux_berthoud_affichage(berthoud_par_mois_affichage){return(
[
  "Gazette de Lausanne",
  "Journal de Genève",
  "Feuille d’Avis de Neuchâtel",
  "L’Impartial",
  "La Liberté",
  "Le Confédéré",
  "L’Essor"
].filter(journal =>
  berthoud_par_mois_affichage.some(
    d => d.journal_affiche === journal
  )
)
)}

function _max_berthoud_mois(d3,berthoud_par_mois){return(
d3.max(
  berthoud_par_mois,
  d => d.nombre
) ?? 1
)}

function _55(md){return(
md`Graphiques:`
)}

function _56(berthoud_par_mois,Plot,d3,max_berthoud_mois)
{
  const data = berthoud_par_mois.map(d => ({
    ...d,
    journal_affiche:
      d.journal === "L’Express"
        ? "Feuille d’Avis de Neuchâtel"
        : d.journal
  }));

  const ordre = [
    "Gazette de Lausanne",
    "Journal de Genève",
    "Feuille d’Avis de Neuchâtel",
    "L’Impartial",
    "La Liberté",
    "Le Confédéré",
    "L’Essor"
  ].filter(journal =>
    data.some(d => d.journal_affiche === journal)
  );

  return Plot.plot({
    width: 900,
    height: 180 + ordre.length * 65,

    marginLeft: 140,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 45,

    x: {
      type: "utc",
      domain: [
        new Date("1927-01-01"),
        new Date("1975-12-31")
      ],
      label: "Années",
      grid: true,
      ticks: d3.utcYear.every(1),
      tickFormat: d3.utcFormat("%Y"),
      tickRotate: -45
    },

    y: {
      domain: ordre,
      label: null,
      tickSize: 0,
      padding: 0.35
    },

    r: {
      type: "sqrt",
      domain: [1, max_berthoud_mois],
      range: [3, 10]
    },

    marks: [
      Plot.ruleY(ordre, {
        stroke: "#bdbdbd",
        strokeWidth: 0.7
      }),

      Plot.ruleY(ordre, {
        dy: -10,
        stroke: "#e6550d",
        strokeOpacity: 0.35,
        strokeWidth: 0.8
      }),

      Plot.ruleY(ordre, {
        dy: 10,
        stroke: "#3182bd",
        strokeOpacity: 0.35,
        strokeWidth: 0.8
      }),

      Plot.dot(
        data.filter(
          d => d.type_presence === "Mention"
        ),
        {
          x: "date",
          y: "journal_affiche",
          dy: -10,
          r: "nombre",

          symbol: "circle",
          fill: "#e6550d",
          stroke: "#a63603",
          strokeWidth: 0.8,
          opacity: 0.75,

          tip: true,

          title: d => {
            const textes = d.textes.length
              ? `\n\n${d.textes.join("\n\n")}`
              : "";

            return `${d3.utcFormat("%m.%Y")(d.date)}
${d.journal_affiche}
Mention
${d.nombre} occurrence${d.nombre > 1 ? "s" : ""}${textes}`;
          }
        }
      ),

      Plot.dot(
        data.filter(
          d => d.type_presence === "Signature d’article"
        ),
        {
          x: "date",
          y: "journal_affiche",
          dy: 10,
          r: "nombre",

          symbol: "circle",
          fill: "#3182bd",
          stroke: "#08519c",
          strokeWidth: 0.8,
          opacity: 0.9,

          tip: true,

          title: d => {
            const textes = d.textes.length
              ? `\n\n${d.textes.join("\n\n")}`
              : "";

            return `${d3.utcFormat("%m.%Y")(d.date)}
${d.journal_affiche}
Signature d’article
${d.nombre} occurrence${d.nombre > 1 ? "s" : ""}${textes}`;
          }
        }
      ),

      Plot.dot(
        data.filter(
          d =>
            d.type_presence ===
            "Nouvelle signée dans la GDL"
        ),
        {
          x: "date",
          y: "journal_affiche",
          dy: 0,
          r: "nombre",

          symbol: "diamond",
          fill: "#984ea3",
          stroke: "black",
          strokeWidth: 1,
          opacity: 0.95,

          tip: true,

          title: d => {
            const textes = d.textes.length
              ? `\n\n${d.textes.join("\n\n")}`
              : "";

            return `${d3.utcFormat("%m.%Y")(d.date)}
${d.journal_affiche}
Nouvelle signée dans la Gazette de Lausanne
${d.nombre} occurrence${d.nombre > 1 ? "s" : ""}${textes}`;
          }
        }
      )
    ]
  });
}


function _valeurs_legenda_berthoud(d3,max_berthoud_mois){return(
d3.range(
  1,
  max_berthoud_mois + 1
)
)}

function _58(valeurs_legenda_berthoud,Plot,max_berthoud_mois)
{
  const tipi = [
    {
      position: 1.2,
      label: "Mention",
      couleur: "#e6550d",
      contour: "#a63603",
      symbole: "circle"
    },
    {
      position: 3.8,
      label: "Signature d’article",
      couleur: "#3182bd",
      contour: "#08519c",
      symbole: "circle"
    },
    {
      position: 6.6,
      label: "Nouvelle signée dans la Gazette de Lausanne",
      couleur: "#984ea3",
      contour: "black",
      symbole: "diamond"
    }
  ];

  const tailles = valeurs_legenda_berthoud.map((nombre, i) => ({
    position: i + 1,
    nombre,
    label: String(nombre)
  }));

  const maxPosition = Math.max(
    7.5,
    valeurs_legenda_berthoud.length + 0.5
  );

  return Plot.plot({
    width: Math.max(
      820,
      valeurs_legenda_berthoud.length * 75
    ),

    height: 190,

    marginTop: 10,
    marginRight: 10,
    marginBottom: 25,
    marginLeft: 10,

    x: {
      axis: null,
      domain: [0.3, maxPosition]
    },

    y: {
      axis: null,
      domain: [-1.25, 1.25]
    },

    r: {
      type: "sqrt",
      domain: [1, max_berthoud_mois],
      range: [3, 10]
    },

    marks: [
      // Mention
      Plot.dot(
        tipi.filter(d => d.label === "Mention"),
        {
          x: "position",
          y: 0.72,
          r: 7,
          symbol: "circle",
          fill: d => d.couleur,
          stroke: d => d.contour,
          strokeWidth: 1
        }
      ),

      // Signature
      Plot.dot(
        tipi.filter(d => d.label === "Signature d’article"),
        {
          x: "position",
          y: 0.72,
          r: 7,
          symbol: "circle",
          fill: d => d.couleur,
          stroke: d => d.contour,
          strokeWidth: 1
        }
      ),

      // Nouvelle GDL
      Plot.dot(
        tipi.filter(
          d =>
            d.label ===
            "Nouvelle signée dans la Gazette de Lausanne"
        ),
        {
          x: "position",
          y: 0.72,
          r: 7,
          symbol: "diamond",
          fill: d => d.couleur,
          stroke: d => d.contour,
          strokeWidth: 1
        }
      ),

      Plot.text(tipi, {
        x: "position",
        y: 0.72,
        text: "label",
        dy: 25,
        fontSize: 11
      }),

      // Titolo scala
      Plot.text(
        [{
          position: 0.5,
          label: "Nombre d’occurrences par mois"
        }],
        {
          x: "position",
          y: -0.28,
          text: "label",
          textAnchor: "start",
          fontSize: 12,
          fontWeight: "bold"
        }
      ),

      // Dimensioni
      Plot.dot(tailles, {
        x: "position",
        y: -0.72,
        r: "nombre",
        fill: "#9ecae1",
        stroke: "#08519c",
        strokeWidth: 0.8,
        opacity: 0.9
      }),

      Plot.text(tailles, {
        x: "position",
        y: -0.72,
        text: "label",
        dy: 24,
        fontSize: 11
      })
    ]
  });
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["berthoud_l_express_firme.csv", {url: new URL("./files/fb0bf00f998a9d6f7b0e84c07d5cc6ed8f35c7cda15a74c8cea1713f3f3de126ec11ff99f83680f7501091336bc8410a68deb08361f4edfc360e3615ce98a8e7.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["berthoud_la_liberte_firme.csv", {url: new URL("./files/4029685fde25b146464c2d0281284ed6d7d2007a442e82a0b165a32d5242d0a789c83ef94e50cd5c51652975f7a67c96f53e13a68d85cec806d7ffa7a1c76bca.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["berthoud_le_confedere_firme.csv", {url: new URL("./files/84ae7d1ec281eeefe8ee5740ccb15b9e61e166100cf99d9c607660a04f6be80642d146ebe2adc4e48a908bfd8e3c8510049f73a792aee20f105bee4d8c2498ed.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["dorette_berthoud_GDL_clean.csv", {url: new URL("./files/fea9c989313412c5511e0191bdde85495d7cb47b851bc658f75f3270027f1ab209694d78f7dc1458418a884000cd321fd2fcab70efc32181326f653103bfc023.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["dorette_berthoud_GDL_nouvelles_signees.csv", {url: new URL("./files/7c6080079df2b6fb1f7aab85005d14413426474b5c332912cdee8258f8d461f0d30c3ce1d5f022496f545f87a78b7599effd8d94c8f4fde14be25d12ed768352.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["berthoud_gazettedelausanne_mentions.csv", {url: new URL("./files/cd2cf2d59f5115c1f08db9a24779c8a2535e27eb9f8e25f92268c6f048eb451c3f5327ccd316eb4566ed8d004d3fd5c91fab9cdbbb7babc7e6644030a3297020.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["berthoud_lexpress_mentions.csv", {url: new URL("./files/62fbe9f9782220214e32ec4e362aa76386d1ec8c4a7748a2dd5f694b5ecf14977bcff091a15b1699d8aa1c2188a7adfcefd764f619211fcb87b2ec34b5beb314.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["dorette_berthoud_JDG_controle.csv", {url: new URL("./files/b3d8ca64409903a6dcc5c3b8fa6d2eddc5bfd605f83dbcc43bbfa64d80ecf8c5f3e8edfa732cbc160b353e5ab557eb310a852ef5bc978f66c952741f8fc33906.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["berthoud_laliberte_mentions.csv", {url: new URL("./files/8dfb84a348b3b6ec1e0cacea8b7be65aeb3d0f1f376ad41ab1de334ec8666d2a5cd31ed0fb164b8598839db6105cbafab0ab255b670b016f123a1f7aa94af35d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["berthoud_lessor_mentions.csv", {url: new URL("./files/03ff2bada031dbe83d71dc975447f2f14fbaf3797dbfc13967ac689299e941f35e284f7b55f6e2ccb6a35bd292235caac9305b1cc35192c5b617e0ea7e394d9a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["berthoud_leconfedere_mentions.csv", {url: new URL("./files/422f7d74b5a77ef025b3d660c1b1ce615b819e33d940b0712818fb1710aa4381f267d2f1715973bebf3370286b7dd1b5ee27544d7325530c805bf33b7d950ffa.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["berthoud_toutes_mentions.csv", {url: new URL("./files/5b2895187e8be8d7ba14fab99f5d124c87ad16958cc4566ce114cc696b940b6dbc7d2bd8aa71f8cb108e3f618a2e79ea9a351d5d95b036bfc6c57db09a06ff19.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["berthoud_essor.csv", {url: new URL("./files/5b80342281cb9b11ee5a15df17e20201d3aab576bb3d2308f07e4bade4fd56f1cf8230fd93b5cbc293b0a02a14cffb9bf48098bbbcbac1cc2421f09b81669a9d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["berthoud_journaldegeneve_mentions.csv", {url: new URL("./files/218f124fd22d84db401cecaafaf1ce75ecc3f77240bdf8cbe6957e0d894492919935c27bdd74707bb2f5197e845f2d5c6940bab409c1c6674696bd2ff680cb39.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["berthoud_l_impartial_firme.csv", {url: new URL("./files/94754951dca56f002ae4d6adabb2396f0e2f2674b7509a85d9c96a0d2ba3a87546348cc0e1ca06f733b72fa9a3fbc13c77c1456c57706b132b1220fd8a9a91c8.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["berthoud_confedere.csv", {url: new URL("./files/900bbd9d9ed9f47f777a52851a9653480b26530f4e6a0a3d3f560cc60c62b35410ee35fcb45ab329ed307acbc91cc11b711315a29f9e2e90d69cdd885a5f3d3b.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["berthoud_limpartial_mentions.csv", {url: new URL("./files/571fb6f6fb39e2b0d351c849c7f50e3196c492e883d15e44e2df36f8a8c3a79af565359d1e3ce471316b3f63c774b64694bba5a6ba6b1eaa89601b7b283ae015.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["dorette_berthoud_GDL_clean@2.csv", {url: new URL("./files/fea9c989313412c5511e0191bdde85495d7cb47b851bc658f75f3270027f1ab209694d78f7dc1458418a884000cd321fd2fcab70efc32181326f653103bfc023.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("berthoud_confedere")).define("berthoud_confedere", ["__query","FileAttachment","invalidation"], _berthoud_confedere);
  main.variable(observer("berthoud_essor")).define("berthoud_essor", ["__query","FileAttachment","invalidation"], _berthoud_essor);
  main.variable(observer("berthoud_l_express_firme")).define("berthoud_l_express_firme", ["__query","FileAttachment","invalidation"], _berthoud_l_express_firme);
  main.variable(observer("berthoud_l_impartial_firme")).define("berthoud_l_impartial_firme", ["__query","FileAttachment","invalidation"], _berthoud_l_impartial_firme);
  main.variable(observer("berthoud_la_liberte_firme")).define("berthoud_la_liberte_firme", ["__query","FileAttachment","invalidation"], _berthoud_la_liberte_firme);
  main.variable(observer("berthoud_le_confedere_firme")).define("berthoud_le_confedere_firme", ["__query","FileAttachment","invalidation"], _berthoud_le_confedere_firme);
  main.variable(observer("dorette_berthoud_gdl_clean")).define("dorette_berthoud_gdl_clean", ["__query","FileAttachment","invalidation"], _dorette_berthoud_gdl_clean);
  main.variable(observer("dorette_berthoud_jdg_controle")).define("dorette_berthoud_jdg_controle", ["__query","FileAttachment","invalidation"], _dorette_berthoud_jdg_controle);
  main.variable(observer("dorette_berthoud_gdl_nouvelles_signees")).define("dorette_berthoud_gdl_nouvelles_signees", ["__query","FileAttachment","invalidation"], _dorette_berthoud_gdl_nouvelles_signees);
  main.variable(observer("berthoud_toutes_mentions")).define("berthoud_toutes_mentions", ["__query","FileAttachment","invalidation"], _berthoud_toutes_mentions);
  main.variable(observer("berthoud_gazettedelausanne_mentions")).define("berthoud_gazettedelausanne_mentions", ["__query","FileAttachment","invalidation"], _berthoud_gazettedelausanne_mentions);
  main.variable(observer("berthoud_journaldegeneve_mentions")).define("berthoud_journaldegeneve_mentions", ["__query","FileAttachment","invalidation"], _berthoud_journaldegeneve_mentions);
  main.variable(observer("berthoud_laliberte_mentions")).define("berthoud_laliberte_mentions", ["__query","FileAttachment","invalidation"], _berthoud_laliberte_mentions);
  main.variable(observer("berthoud_leconfedere_mentions")).define("berthoud_leconfedere_mentions", ["__query","FileAttachment","invalidation"], _berthoud_leconfedere_mentions);
  main.variable(observer("berthoud_lessor_mentions")).define("berthoud_lessor_mentions", ["__query","FileAttachment","invalidation"], _berthoud_lessor_mentions);
  main.variable(observer("berthoud_lexpress_mentions")).define("berthoud_lexpress_mentions", ["__query","FileAttachment","invalidation"], _berthoud_lexpress_mentions);
  main.variable(observer("berthoud_limpartial_mentions")).define("berthoud_limpartial_mentions", ["__query","FileAttachment","invalidation"], _berthoud_limpartial_mentions);
  main.variable(observer()).define(["FileAttachment"], _20);
  main.variable(observer()).define(["FileAttachment"], _21);
  main.variable(observer()).define(["FileAttachment"], _22);
  main.variable(observer()).define(["FileAttachment"], _23);
  main.variable(observer()).define(["FileAttachment"], _24);
  main.variable(observer()).define(["FileAttachment"], _25);
  main.variable(observer()).define(["FileAttachment"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("jdg_raw_text")).define("jdg_raw_text", ["FileAttachment"], _jdg_raw_text);
  main.variable(observer("jdg_clean")).define("jdg_clean", ["jdg_raw_text","d3"], _jdg_clean);
  main.variable(observer("nouvelles_gdl_raw_text")).define("nouvelles_gdl_raw_text", ["FileAttachment"], _nouvelles_gdl_raw_text);
  main.variable(observer("nouvelles_gdl_clean")).define("nouvelles_gdl_clean", ["nouvelles_gdl_raw_text","d3"], _nouvelles_gdl_clean);
  main.variable(observer()).define(["jdg_clean"], _32);
  main.variable(observer()).define(["nouvelles_gdl_clean"], _33);
  main.variable(observer("normaliser_journal")).define("normaliser_journal", _normaliser_journal);
  main.variable(observer("mentions_raw")).define("mentions_raw", ["FileAttachment"], _mentions_raw);
  main.variable(observer("berthoud_mentions")).define("berthoud_mentions", ["mentions_raw","normaliser_journal"], _berthoud_mentions);
  main.variable(observer()).define(["berthoud_mentions"], _37);
  main.variable(observer("express_firme_raw")).define("express_firme_raw", ["FileAttachment"], _express_firme_raw);
  main.variable(observer("impartial_firme_raw")).define("impartial_firme_raw", ["FileAttachment"], _impartial_firme_raw);
  main.variable(observer("liberte_firme_raw")).define("liberte_firme_raw", ["FileAttachment"], _liberte_firme_raw);
  main.variable(observer("confedere_firme_raw")).define("confedere_firme_raw", ["FileAttachment"], _confedere_firme_raw);
  main.variable(observer("gdl_firme_raw")).define("gdl_firme_raw", ["FileAttachment"], _gdl_firme_raw);
  main.variable(observer()).define(["gdl_firme_raw"], _43);
  main.variable(observer()).define(["express_firme_raw"], _44);
  main.variable(observer("berthoud_signatures")).define("berthoud_signatures", ["express_firme_raw","impartial_firme_raw","liberte_firme_raw","confedere_firme_raw","gdl_firme_raw","jdg_clean"], _berthoud_signatures);
  main.variable(observer("berthoud_nouvelles")).define("berthoud_nouvelles", ["nouvelles_gdl_clean"], _berthoud_nouvelles);
  main.variable(observer("berthoud_presences")).define("berthoud_presences", ["berthoud_mentions","berthoud_signatures","berthoud_nouvelles"], _berthoud_presences);
  main.variable(observer()).define(["d3","berthoud_presences"], _48);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("berthoud_par_mois")).define("berthoud_par_mois", ["d3","berthoud_presences"], _berthoud_par_mois);
  main.variable(observer("berthoud_par_mois_affichage")).define("berthoud_par_mois_affichage", ["berthoud_par_mois"], _berthoud_par_mois_affichage);
  main.variable(observer("ordre_journaux_berthoud")).define("ordre_journaux_berthoud", ["berthoud_par_mois"], _ordre_journaux_berthoud);
  main.variable(observer("ordre_journaux_berthoud_affichage")).define("ordre_journaux_berthoud_affichage", ["berthoud_par_mois_affichage"], _ordre_journaux_berthoud_affichage);
  main.variable(observer("max_berthoud_mois")).define("max_berthoud_mois", ["d3","berthoud_par_mois"], _max_berthoud_mois);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer()).define(["berthoud_par_mois","Plot","d3","max_berthoud_mois"], _56);
  main.variable(observer("valeurs_legenda_berthoud")).define("valeurs_legenda_berthoud", ["d3","max_berthoud_mois"], _valeurs_legenda_berthoud);
  main.variable(observer()).define(["valeurs_legenda_berthoud","Plot","max_berthoud_mois"], _58);
  return main;
}
