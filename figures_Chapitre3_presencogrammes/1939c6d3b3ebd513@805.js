import define1 from "./64e74b1cb96692d4@387.js";

function _1(md){return(
md`# Figures CHAPITRE 3`
)}

function _3(md){return(
md`## Relevé septembre 1940 Gazette de Lausanne:`
)}

function _4(md){return(
md`Adapté du composant BubbleChart de D3 sur Observable: https://observablehq.com/@d3/bubble-chart-component`
)}

function _firme_septembre_1940_corr(__query,FileAttachment,invalidation){return(
__query(FileAttachment("firme_septembre_1940_corr.csv"),{from:{table:"firme_septembre_1940_corr"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _firme_septembre_1940(__query,FileAttachment,invalidation){return(
__query(FileAttachment("firme_septembre_1940.csv"),{from:{table:"firme_septembre_1940"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

async function _data_GDL(d3,FileAttachment){return(
d3.csvParse(
  await FileAttachment("firme_septembre_1940_corr.csv").text()
)
)}

function _9(__query,data_GDL,invalidation){return(
__query(data_GDL,{from:{table:"data_GDL"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"data_GDL")
)}

function _data_GDL_corr(data_GDL){return(
data_GDL.map(d => {
  const dates_list = String(d.dates || "")
    .split(";")
    .map(date => date.trim())
    .filter(Boolean);

  return {
    ...d,
    apparitions_originales: +d.apparitions,
    apparitions: dates_list.length,
    dates_list
  };
})
)}

function _data_GDL_clean(data_GDL_corr){return(
data_GDL_corr
  .filter(d => d.nom !== "P. S. M.")
  .map(d => ({
    ...d,
    apparitions: +d.apparitions
  }))
)}

function _top10_GDL(data_GDL_clean,d3){return(
data_GDL_clean
  .map(d => ({
    nom: d.nom,
    apparitions: +d.apparitions
  }))
  .filter(d => d.nom && Number.isFinite(d.apparitions))
  .sort((a, b) =>
    d3.descending(a.apparitions, b.apparitions) ||
    d3.ascending(a.nom, b.nom)
  )
)}

function _13(Plot,top10_GDL,d3){return(
Plot.plot({
  width: 900,
  height: Math.max(500, top10_GDL.length * 28),
  marginLeft: 180,
  marginRight: 50,

  x: {
    label: "Nombre de jours de présence",
    grid: true,
    tickFormat: d3.format("d")
  },

  y: {
    label: null,
    domain: top10_GDL.map(d => d.nom),
    tickSize: 0
  },

  marks: [
    Plot.barX(top10_GDL, {
      x: "apparitions",
      y: "nom",
      tip: true
    }),

    Plot.text(top10_GDL, {
      x: "apparitions",
      y: "nom",
      text: "apparitions",
      dx: 7,
      textAnchor: "start"
    }),

    Plot.ruleX([0])
  ]
})
)}

function _14(Inputs,top10_GDL){return(
Inputs.table(top10_GDL)
)}

function _15(top10_GDL){return(
Object.keys(top10_GDL[2])
)}

function _dataBubbleGDL(data_GDL_clean){return(
data_GDL_clean.map(d => {
  const nom = d.nom.trim();

  const mots = nom
    .split(/\s+/)
    .filter(mot =>
      !["de", "du", "des", "et", "d’", "d'"].includes(
        mot.toLowerCase()
      )
    );

  const contientNomDeveloppe = mots.some(mot => {
    const nettoye = mot
      .replace(/[.,]/g, "")
      .replace(/^(Dr|Lieut-col)$/i, "");

    return /^[A-Za-zÀ-ÖØ-öø-ÿ-]{4,}$/.test(nettoye);
  });

  return {
    ...d,
    apparitions: +d.apparitions,
    typeSignature: contientNomDeveloppe
      ? "Nom complet ou semi-développé"
      : "Initiales ou forme abrégée"
  };
})
)}

function _bubble_GDL_corrige(data_GDL_clean,d3)
{
  const width = 1000;
  const height = 760;
  const padding = 9;

  function classerSignature(nomOriginal) {
    const nom = String(nomOriginal).trim();

    const particules = new Set([
      "de",
      "du",
      "des",
      "d’",
      "d'",
      "et"
    ]);

    const titres = new Set([
      "dr",
      "dr.",
      "lieut-col",
      "lieut-col.",
      "lieutenant-colonel"
    ]);

    const elements = nom
      .split(/\s+/)
      .filter(Boolean)
      .filter(element => {
        const minuscule = element.toLowerCase();
        return (
          !particules.has(minuscule) &&
          !titres.has(minuscule)
        );
      });

    const contientElementDeveloppe = elements.some(element => {
      const nettoye = element
        .replace(/^[^A-Za-zÀ-ÖØ-öø-ÿ]+/, "")
        .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ-]+$/, "");

      return nettoye.replace(/-/g, "").length >= 4;
    });

    return contientElementDeveloppe
      ? "Nom complet ou semi-développé"
      : "Initiales ou forme abrégée";
  }

  const dataBubbleCorrige = data_GDL_clean.map(d => ({
    ...d,
    nom: String(d.nom).trim(),
    apparitions: +d.apparitions,
    typeSignatureCorrige: classerSignature(d.nom)
  }));

  const rootBubbleCorrige = d3
    .hierarchy({children: dataBubbleCorrige})
    .sum(d => d.apparitions || 0);

  d3.pack()
    .size([width, height])
    .padding(padding)(rootBubbleCorrige);

  const leavesBubbleCorrige = rootBubbleCorrige.leaves();

  const colorBubbleCorrige = d3.scaleOrdinal()
    .domain([
      "Nom complet",
      "Initiales ou forme abrégée"
    ])
    .range([
      "#4c78a8",
      "#f58518"
    ]);

  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr(
      "style",
      "max-width:100%;height:auto;font-family:sans-serif;"
    );

  // Bolle
  const nodesBubbleCorrige = svg.append("g")
    .selectAll("g")
    .data(leavesBubbleCorrige)
    .join("g")
    .attr(
      "transform",
      d => `translate(${d.x},${d.y})`
    );

  nodesBubbleCorrige.append("circle")
    .attr("r", d => d.r)
    .attr(
      "fill",
      d => colorBubbleCorrige(d.data.typeSignatureCorrige)
    )
    .attr("fill-opacity", 0.75)
    .attr("stroke", "white")
    .attr("stroke-width", 1.5);

  // Tooltip
  nodesBubbleCorrige.append("title")
    .text(d =>
      `${d.data.nom}\n` +
      `${d.data.apparitions} jour${
        d.data.apparitions > 1 ? "s" : ""
      } de présence\n` +
      `${d.data.typeSignatureCorrige}`
    );

  // Etichette
  const labelsBubbleCorrige = svg.append("g")
    .attr("pointer-events", "none")
    .selectAll("g")
    .data(leavesBubbleCorrige)
    .join("g")
    .attr(
      "transform",
      d => `translate(${d.x},${d.y})`
    );

  labelsBubbleCorrige.each(function(d) {
    const group = d3.select(this);
    const nom = d.data.nom.trim();

    const estAbreviation =
      /^(?:[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]?\.-?\s*){1,4}$/.test(nom) ||
      /^(?:[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]?\.\s*)+(?:de|du|des|d’|d')\s+[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]?\.$/i.test(nom);

    const mots = nom.split(/\s+/);

    let lignes;

    if (estAbreviation) {
      lignes = [nom];
    } else if (mots.length === 1) {
      lignes = [nom];
    } else if (mots.length === 2) {
      lignes = mots;
    } else {
      const milieu = Math.ceil(mots.length / 2);

      lignes = [
        mots.slice(0, milieu).join(" "),
        mots.slice(milieu).join(" ")
      ];
    }

    const fontSize = Math.max(
      7,
      Math.min(
        14,
        d.r / Math.max(1.8, lignes.length)
      )
    );

    const text = group.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", fontSize)
      .attr(
        "font-weight",
        d.data.apparitions >= 5 ? 600 : 400
      )
      .attr("fill", "#111");

    lignes.forEach((ligne, i) => {
      text.append("tspan")
        .attr("x", 0)
        .attr(
          "dy",
          i === 0
            ? `${-(lignes.length - 1) * 0.55}em`
            : "1.1em"
        )
        .text(ligne);
    });

    text.append("tspan")
      .attr("x", 0)
      .attr("dy", "1.15em")
      .attr(
        "font-size",
        Math.max(7, fontSize - 1)
      )
      .attr("font-weight", 400)
      .text(d.data.apparitions);
  });

  // Legenda
  const legendDataBubbleCorrige = [
    "Nom complet",
    "Forme abrégée"
  ];

  const legendBubbleCorrige = svg.append("g")
    .attr("transform", "translate(20,25)");

  const legendItemBubbleCorrige = legendBubbleCorrige
    .selectAll("g")
    .data(legendDataBubbleCorrige)
    .join("g")
    .attr(
      "transform",
      (d, i) => `translate(0,${i * 24})`
    );

  legendItemBubbleCorrige.append("circle")
    .attr("r", 7)
    .attr("fill", d => colorBubbleCorrige(d))
    .attr("fill-opacity", 0.75);

  legendItemBubbleCorrige.append("text")
    .attr("x", 12)
    .attr("y", 4)
    .attr("font-size", 12)
    .text(d => d);

  return svg.node();
}


function _rapprochements(){return(
[
  {
    groupe: "Aeschimann",
    formes: [
      {nom: "Ae.", apparitions: 7},
      {nom: "M. Aeschimann", apparitions: 3}
    ],
    certitude: "Identification probable"
  },
  {
    groupe: "Nicollier",
    formes: [
      {nom: "J. Nr.", apparitions: 3},
      {nom: "Jean Nicollier", apparitions: 5}
    ],
    certitude: "Identification certaine"
  },
  {
    groupe: "Rigassi",
    formes: [
      {nom: "G. R.", apparitions: 4},
      {nom: "Georges Rigassi", apparitions: 1}
    ],
    certitude: "Identification probable"
  },
  {
    groupe: "Jaloux",
    formes: [
      {nom: "E. J.", apparitions: 1},
      {nom: "Edmond Jaloux", apparitions: 2}
    ],
    certitude: "Identification possible"
  },
  {
    groupe: "Rolle / Rossier",
    formes: [
      {nom: "Edm. R.", apparitions: 9},
      {nom: "Edmond Rolle", apparitions: 1}
    ],
    certitude: "Identification incertaine"
  }, 
  {
  groupe: "Buenzod",
  formes: [
    {nom: "Bd.", apparitions: 2},
    {nom: "Emmanuel Buenzod", apparitions: 2}
  ],
  certitude: "Identification probable"
}
]
)}

function _groupes_rapprochements_GDL(){return(
new Map([
  ["Ae.", "Aeschimann"],
  ["M. Aeschimann", "Aeschimann"],

  ["J. Nr.", "Nicollier"],
  ["Jean Nicollier", "Nicollier"],

  ["G. R.", "Rigassi"],
  ["Georges Rigassi", "Rigassi"],

])
)}

function _data_GDL_rapprochements(data_GDL_clean,groupes_rapprochements_GDL){return(
data_GDL_clean.map(d => ({
  ...d,
  apparitions: +d.apparitions,
  groupe_rapprochement:
    groupes_rapprochements_GDL.get(d.nom) ?? "Autres signatures"
}))
)}

function _bubble_GDL_rapprochements(d3,data_GDL_rapprochements)
{
  const width = 1000;
  const height = 760;
  const padding = 9;

  const root = d3
    .hierarchy({children: data_GDL_rapprochements})
    .sum(d => d.apparitions || 0);

  d3.pack()
    .size([width, height])
    .padding(padding)(root);

  const leaves = root.leaves();

  const colorRapprochements = d3.scaleOrdinal()
    .domain([
      "Aeschimann",
      "Nicollier",
      "Rigassi",
      "Autres signatures"
    ])
    .range([
      "#4c78a8",
      "#f58518",
      "#54a24b",
      "#d9d9d9"
    ]);

  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr(
      "style",
      "max-width:100%;height:auto;font-family:sans-serif;"
    );

  const nodes = svg.append("g")
    .selectAll("g")
    .data(leaves)
    .join("g")
    .attr("transform", d => `translate(${d.x},${d.y})`);

  nodes.append("circle")
    .attr("r", d => d.r)
    .attr("fill", d =>
      colorRapprochements(d.data.groupe_rapprochement)
    )
    .attr("fill-opacity", d =>
      d.data.groupe_rapprochement === "Autres signatures"
        ? 0.55
        : 0.82
    )
    .attr("stroke", "white")
    .attr("stroke-width", 1.5);

  nodes.append("title")
    .text(d =>
      `${d.data.nom}\n${d.data.apparitions} jour${
        d.data.apparitions > 1 ? "s" : ""
      } de présence${
        d.data.groupe_rapprochement !== "Autres signatures"
          ? `\nRapprochement : ${d.data.groupe_rapprochement}`
          : ""
      }`
    );

  const labels = svg.append("g")
    .attr("pointer-events", "none")
    .selectAll("g")
    .data(leaves)
    .join("g")
    .attr("transform", d => `translate(${d.x},${d.y})`);

  labels.each(function(d) {
    const group = d3.select(this);
    const nom = d.data.nom.trim();

    const estAbreviation =
      /^(?:[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]?\.-?\s*){1,4}$/.test(nom) ||
      /^(?:[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]?\.\s*)+(?:de|du|des|d’|d')\s+[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]?\.$/i.test(nom);

    const mots = nom.split(/\s+/);

    let lignes;

    if (estAbreviation) {
      lignes = [nom];
    } else if (mots.length === 1) {
      lignes = [nom];
    } else if (mots.length === 2) {
      lignes = mots;
    } else {
      const milieu = Math.ceil(mots.length / 2);

      lignes = [
        mots.slice(0, milieu).join(" "),
        mots.slice(milieu).join(" ")
      ];
    }

    const fontSize = Math.max(
      7,
      Math.min(14, d.r / Math.max(1.8, lignes.length))
    );

    const text = group.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", fontSize)
      .attr(
        "font-weight",
        d.data.apparitions >= 5 ? 600 : 400
      )
      .attr("fill", "#111");

    lignes.forEach((ligne, i) => {
      text.append("tspan")
        .attr("x", 0)
        .attr(
          "dy",
          i === 0
            ? `${-(lignes.length - 1) * 0.55}em`
            : "1.1em"
        )
        .text(ligne);
    });

    text.append("tspan")
      .attr("x", 0)
      .attr("dy", "1.15em")
      .attr("font-size", Math.max(7, fontSize - 1))
      .attr("font-weight", 400)
      .text(d.data.apparitions);
  });

  const legendDataRapprochements = [
    "Aeschimann",
    "Nicollier",
    "Rigassi",
    "Autres signatures"
  ];

  const legend = svg.append("g")
    .attr("transform", "translate(20,25)");

  const legendItem = legend.selectAll("g")
    .data(legendDataRapprochements)
    .join("g")
    .attr("transform", (d, i) => `translate(0,${i * 24})`);

  legendItem.append("circle")
    .attr("r", 7)
    .attr("fill", d => colorRapprochements(d))
    .attr("fill-opacity", d =>
      d === "Autres signatures" ? 0.55 : 0.82
    );

  legendItem.append("text")
    .attr("x", 12)
    .attr("y", 4)
    .attr("font-size", 12)
    .text(d => d);

  return svg.node();
}


function _22(md){return(
md`-------------------
`
)}

function _23(md){return(
md`## LIEUT-COL R. F. `
)}

function _ch3_lieutcolrf(__query,FileAttachment,invalidation){return(
__query(FileAttachment("ch3_lieutcolrf.csv"),{from:{table:"ch3_lieutcolrf"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _data_lieutcolrf(FileAttachment){return(
FileAttachment("ch3_lieutcolrf.csv").csv()
)}

function _lieutcolrf(data_lieutcolrf,d3){return(
data_lieutcolrf
  .map(d => ({
    id: d.id,
    date: new Date(d["meta.date"]),
    journal: d["meta.mediaTitle"],
    titre: d["text.title"] || "Sans titre",
    contenu: d["text.content"],
    type_presence:
      d["meta.mediaTitle"] === "Gazette de Lausanne"
        ? "Signature dans la GDL"
        : "Mention dans un autre journal"
  }))
  .filter(d => !isNaN(d.date))
  .sort((a, b) => d3.ascending(a.date, b.date))
)}

function _ajouts_lieutcolrf(){return(
[
  {
    id: "ajout-001",
    date: new Date("1940-02-21"),
    journal: "Feuille d’avis de Lausanne",
    titre: "L’incident de l’Altmark",
    contenu: "Le journal cite un article de la Gazette de Lausanne...",
    type_presence: "Mention dans un autre journal",
    importance: 3,
    position_discursive: "Objet du discours",
    sous_type: "Reprise valorisante par un autre journal"
  }
]
)}

function _lieutcolrf_complet(lieutcolrf,ajouts_lieutcolrf,d3){return(
[
  ...lieutcolrf,
  ...ajouts_lieutcolrf,

  {
    date: new Date(Date.UTC(1940, 8, 17)),
    type_presence: "Signature dans la GDL",
    journal: "GDL",
    titre: "",
    firma_esatta: "Lieut.-col. R. F."
  }
].sort((a, b) => d3.ascending(a.date, b.date))
)}

function _lieutcolrf_par_semaine(d3,lieutcolrf_complet){return(
Array.from(
  d3.rollup(
    lieutcolrf_complet,

    valeurs => ({
      nombre: valeurs.length,
      titres: valeurs
        .map(d => d.titre)
        .filter(Boolean)
    }),

    d => d3.utcMonday.floor(d.date),
    d => d.type_presence
  ),

  ([semaine, types]) =>
    Array.from(
      types,
      ([type_presence, valeurs]) => ({
        date: semaine,
        type_presence,
        nombre: valeurs.nombre,
        titres: valeurs.titres
      })
    )
).flat()
)}

function _max_lieutcolrf_semaine(d3,lieutcolrf_par_semaine){return(
d3.max(
  lieutcolrf_par_semaine,
  d => d.nombre
)
)}

function _31(Plot,d3,max_lieutcolrf_semaine,lieutcolrf_par_semaine){return(
Plot.plot({
  width: 1000,
  height: 200,

  marginLeft: 55,
  marginRight: 30,
  marginTop: 20,
  marginBottom: 30,

  x: {
    type: "utc",
    label: "Mois",
    grid: true,
    ticks: d3.utcMonth.every(1),
    tickFormat: d3.utcFormat("%b %Y")
  },

  y: {
    domain: ["Articles"],
    label: null,
    tickSize: 0,
    tickPadding: 15
  },

  r: {
    type: "sqrt",
    domain: [1, max_lieutcolrf_semaine],
    range: [3, 11]
  },

  color: {
    type: "linear",
    domain: [1, max_lieutcolrf_semaine],
    range: ["#c6dbef", "#08519c"]
  },

  marks: [
    Plot.ruleY(["Articles"], {
      stroke: "#bdbdbd"
    }),

    Plot.dot(
      lieutcolrf_par_semaine.filter(
        d => d.type_presence === "Signature dans la GDL"
      ),
      {
        x: "date",
        y: () => "Articles",
        r: "nombre",
        fill: "nombre",
        symbol: "circle",
        stroke: "#08519c",
        strokeWidth: 0.7,
        opacity: 0.9,
        tip: true,

        title: d => {
          const semaine = d3.utcFormat("%d.%m.%Y")(d.date);

          const titres = d.titres.length
            ? `\n\n${d.titres.join("\n")}`
            : "";

          return `Semaine du ${semaine}
Signature dans la GDL
${d.nombre} occurrence${d.nombre > 1 ? "s" : ""}${titres}`;
        }
      }
    ),

    Plot.dot(
      lieutcolrf_par_semaine.filter(
        d => d.type_presence === "Mention dans un autre journal"
      ),
      {
        x: "date",
        y: () => "Articles",
        r: 5.5,
        fill: "#e6550d",
        symbol: "diamond",
        stroke: "black",
        strokeWidth: 1,
        opacity: 0.9,
        tip: true,

        title: d => {
          const semaine = d3.utcFormat("%d.%m.%Y")(d.date);

          const titres = d.titres.length
            ? `\n\n${d.titres.join("\n")}`
            : "";

          return `Semaine du ${semaine}
Mention dans un autre journal
${d.nombre} occurrence${d.nombre > 1 ? "s" : ""}${titres}`;
        }
      }
    )
  ]
})
)}

function _valori_legenda_lieutcolrf_(d3,max_lieutcolrf_semaine){return(
d3.range(
  1,
  max_lieutcolrf_semaine + 1
)
)}

function _33(Plot,valori_legenda_lieutcolrf_,max_lieutcolrf_semaine){return(
Plot.plot({
  width: Math.max(
    430,
    valori_legenda_lieutcolrf_.length * 60 + 180
  ),

  height: 100,

  marginTop: 10,
  marginRight: 130,
  marginBottom: 35,
  marginLeft: 20,

  x: {
    axis: null,
    domain: [
      0.5,
      valori_legenda_lieutcolrf_.length + 3.5
    ]
  },

  y: {
    axis: null,
    domain: [-0.7, 0.7]
  },

  r: {
    type: "sqrt",
    domain: [1, max_lieutcolrf_semaine],
    range: [3, 11]
  },

  color: {
    type: "linear",
    domain: [1, max_lieutcolrf_semaine],
    range: ["#c6dbef", "#08519c"]
  },

  marks: [
    // Cerchi blu: numero di firme nella settimana
    Plot.dot(
      valori_legenda_lieutcolrf_.map((nombre, i) => ({
        position: i + 1,
        nombre
      })),
      {
        x: "position",
        y: 0,
        r: "nombre",
        fill: "nombre",
        stroke: "#08519c",
        strokeWidth: 0.7,
        opacity: 0.9
      }
    ),

    Plot.text(
      valori_legenda_lieutcolrf_.map((nombre, i) => ({
        position: i + 1,
        label: String(nombre)
      })),
      {
        x: "position",
        y: 0,
        text: "label",
        dy: 23,
        fontSize: 11
      }
    ),

    // Rombo rosso: menzione in un altro giornale
    Plot.dot(
      [{
        position: valori_legenda_lieutcolrf_.length + 2,
        nombre: 1
      }],
      {
        x: "position",
        y: 0,
        r: 7,
        symbol: "diamond",
        fill: "#e6550d",
        stroke: "black",
        strokeWidth: 1,
        opacity: 0.9
      }
    ),

    Plot.text(
      [{
        position: valori_legenda_lieutcolrf_.length + 2,
        label: "Mention dans un autre journal"
      }],
      {
        x: "position",
        y: 0,
        text: "label",
        dx: 15,
        textAnchor: "start",
        fontSize: 11
      }
    )
  ]
})
)}

function _robert_fazy_tous_journaux(__query,FileAttachment,invalidation){return(
__query(FileAttachment("robert_fazy_tous_journaux.csv"),{from:{table:"robert_fazy_tous_journaux"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

async function _data_robert_fazy(FileAttachment){return(
await FileAttachment(
  "robert_fazy_tous_journaux.csv"
).csv({typed: true})
)}

function _robert_fazy_complet(data_robert_fazy,d3){return(
[
  ...data_robert_fazy.map(d => ({
    ...d,

    date: new Date(d.data),

    titre: d.testo_50_parole,

    type_presence:
      d.giornale === "Gazette de Lausanne"
        ? "Robert Fazy dans la GDL"
        : d.giornale === "Journal de Genève"
        ? "Robert Fazy dans le JDG"
        : "Robert Fazy dans un autre journal"
  })),

  {
    date: new Date(Date.UTC(1934, 11, 16)),
    data: "1934-12-16",
    giornale: "Gazette de Lausanne",
    titre: "",
    testo_50_parole: "",
    type_presence: "Robert Fazy dans la GDL"
  },

  {
    date: new Date(Date.UTC(1930, 2, 31)),
    data: "1930-03-31",
    giornale: "Gazette de Lausanne",
    titre: "",
    testo_50_parole: "",
    type_presence: "Robert Fazy dans la GDL"
  },

  {
    date: new Date(Date.UTC(1936, 6, 5)),
    data: "1936-07-05",
    giornale: "Gazette de Lausanne",
    titre: "",
    testo_50_parole: "",
    type_presence: "Robert Fazy dans la GDL"
  },

  {
    date: new Date(Date.UTC(1936, 6, 31)),
    data: "1936-07-31",
    giornale: "Gazette de Lausanne",
    titre: "",
    testo_50_parole: "",
    type_presence: "Robert Fazy dans la GDL"
  },

  {
    date: new Date(Date.UTC(1937, 6, 11)),
    data: "1937-07-11",
    giornale: "Gazette de Lausanne",
    titre: "",
    testo_50_parole: "",
    type_presence: "Robert Fazy dans la GDL"
  }
].sort((a, b) => d3.ascending(a.date, b.date))
)}

function _fazy_complet(lieutcolrf_complet,robert_fazy_complet){return(
[
  ...lieutcolrf_complet.map(d => {
    const journal = d.giornale ?? d.journal ?? "";

    return {
      ...d,

      date: d.date instanceof Date
        ? d.date
        : new Date(d.date),

      giornale: journal,

      ligne:
        d.type_presence === "Mention dans un autre journal"
          ? "Autres journaux"
          : "Gazette de Lausanne",

      type_presence:
        d.type_presence === "Mention dans un autre journal"
          ? "Mention de Lieut.-col. R. F."
          : "Signature Lieut.-col. R. F.",

      symbole:
        d.type_presence === "Mention dans un autre journal"
          ? "triangle"
          : "square"
    };
  }),

  ...robert_fazy_complet.map(d => {
    const journal = d.giornale ?? d.journal ?? "";

    return {
      ...d,

      date: d.date instanceof Date
        ? d.date
        : new Date(d.data),

      giornale: journal,

      ligne:
        journal === "Gazette de Lausanne"
          ? "Gazette de Lausanne"
          : "Journal de Genève",

      type_presence: "Signature Robert Fazy",

      symbole: "circle"
    };
  })
]
)}

function _fazy_avec_decalage(d3,fazy_complet)
{
  const groupes = d3.group(
    fazy_complet,
    d => `${d3.utcFormat("%Y-%m-%d")(d.date)}|${d.ligne}|${d.type_presence}`
  );

  const resultats = [];

  for (const groupe of groupes.values()) {
    const n = groupe.length;

    groupe.forEach((d, i) => {
      let decalage = 0;

      if (d.type_presence === "Signature Lieut.-col. R. F.") {
        decalage = (i - (n - 1) / 2) * 10;
      }

      resultats.push({
        ...d,
        decalage
      });
    });
  }

  return resultats;
}


function _lieutcolrf_fazy_par_semaine(d3,fazy_complet){return(
Array.from(
  d3.rollup(
    fazy_complet.filter(
      d =>
        d.type_presence === "Signature Lieut.-col. R. F." ||
        d.type_presence === "Mention de Lieut.-col. R. F."
    ),

    valeurs => ({
      nombre: valeurs.length,

      titres: valeurs
        .map(d => d.titre ?? d.testo_50_parole)
        .filter(Boolean),

      giornali: Array.from(
        new Set(
          valeurs
            .map(d => d.giornale)
            .filter(Boolean)
        )
      ),

      firme: Array.from(
        new Set(
          valeurs
            .map(d => d.firma_esatta)
            .filter(Boolean)
        )
      )
    }),

    d => d3.utcMonday.floor(d.date),
    d => d.ligne,
    d => d.type_presence
  ),

  ([semaine, lignes]) =>
    Array.from(
      lignes,
      ([ligne, types]) =>
        Array.from(
          types,
          ([type_presence, valeurs]) => ({
            date: semaine,
            ligne,
            type_presence,
            nombre: valeurs.nombre,
            titres: valeurs.titres,
            giornali: valeurs.giornali,
            firme: valeurs.firme
          })
        )
    ).flat()
).flat()
)}

function _max_lieutcolrf_fazy_semaine(d3,lieutcolrf_fazy_par_semaine){return(
d3.max(
  lieutcolrf_fazy_par_semaine,
  d => d.nombre
)
)}

function _lieutcolrf_par_mois_fazy(d3,fazy_complet){return(
Array.from(
  d3.rollup(
    fazy_complet.filter(
      d =>
        d.type_presence ===
        "Signature Lieut.-col. R. F."
    ),

    valeurs => ({
      nombre: valeurs.length,

      titres: valeurs
        .map(d => d.titre ?? d.testo_50_parole)
        .filter(Boolean),

      firme: Array.from(
        new Set(
          valeurs
            .map(d => d.firma_esatta)
            .filter(Boolean)
        )
      )
    }),

    d => d3.utcMonth.floor(d.date),
    d => d.ligne
  ),

  ([mois, lignes]) =>
    Array.from(
      lignes,
      ([ligne, valeurs]) => ({
        date: mois,
        ligne,
        nombre: valeurs.nombre,
        titres: valeurs.titres,
        firme: valeurs.firme
      })
    )
).flat()
)}

function _max_lieutcolrf_mois_fazy(d3,lieutcolrf_par_mois_fazy){return(
d3.max(
  lieutcolrf_par_mois_fazy,
  d => d.nombre
)
)}

function _lieutcolrf_par_annee_fazy(d3,fazy_complet){return(
Array.from(
  d3.rollup(
    fazy_complet.filter(
      d =>
        d.type_presence ===
        "Signature Lieut.-col. R. F."
    ),

    valeurs => ({
      nombre: valeurs.length,

      titres: valeurs
        .map(d => d.titre ?? d.testo_50_parole)
        .filter(Boolean),

      firme: Array.from(
        new Set(
          valeurs
            .map(d => d.firma_esatta)
            .filter(Boolean)
        )
      )
    }),

    d => d3.utcYear.floor(d.date),
    d => d.ligne
  ),

  ([annee, lignes]) =>
    Array.from(
      lignes,
      ([ligne, valeurs]) => ({
        date: annee,
        ligne,
        nombre: valeurs.nombre,
        titres: valeurs.titres,
        firme: valeurs.firme
      })
    )
).flat()
)}

function _max_lieutcolrf_annee_fazy(d3,lieutcolrf_par_annee_fazy){return(
d3.max(
  lieutcolrf_par_annee_fazy,
  d => d.nombre
)
)}

function _45(Plot,d3,max_lieutcolrf_annee_fazy,lieutcolrf_par_annee_fazy,fazy_complet){return(
Plot.plot({
  width: 1200,
  height: 400,

  marginLeft: 130,
  marginRight: 20,
  marginTop: 30,
  marginBottom: 50,

x: {
  type: "utc",
  label: "Année",
  grid: true,
  ticks: d3.utcYear.every(1),
  tickFormat: d3.utcFormat("%Y"),
  tickRotate: -45
},

  y: {
    domain: [
      "Gazette de Lausanne",
      "Journal de Genève",
      "Autres journaux"
    ],
    label: null,
    tickSize: 0
  },

  r: {
    type: "sqrt",
    domain: [1, max_lieutcolrf_annee_fazy],
    range: [4, 14]
  },

  color: {
    type: "linear",
    domain: [1, max_lieutcolrf_annee_fazy],
    range: ["#c6dbef", "#08519c"]
  },

  marks: [
    Plot.ruleY(
      [
        "Gazette de Lausanne",
        "Journal de Genève",
        "Autres journaux"
      ],
      {
        stroke: "#d0d0d0"
      }
    ),

    // Lieut.-col. R. F.:
    // cerchi blu raggruppati per anno
    Plot.dot(
      lieutcolrf_par_annee_fazy,
      {
        x: "date",
        y: "ligne",

        r: "nombre",
        fill: "nombre",
        symbol: "circle",

        stroke: "#08519c",
        strokeWidth: 0.8,
        opacity: 0.9,

        tip: true,

        title: d => {
          const annee =
            d3.utcFormat("%Y")(d.date);

          const firme = d.firme.length
            ? `\nSignature : ${d.firme.join(", ")}`
            : "";

          const titres = d.titres.length
            ? `\n\n${d.titres.join("\n")}`
            : "";

          return `${annee}
${d.ligne}
Signature Lieut.-col. R. F.
${d.nombre} occurrence${d.nombre > 1 ? "s" : ""}${firme}${titres}`;
        }
      }
    ),

    // Robert Fazy:
    // punti verdi originali
    Plot.dot(
      fazy_complet.filter(
        d =>
          d.type_presence ===
          "Signature Robert Fazy"
      ),
      {
        x: "date",
        y: "ligne",

        r: 5.5,
        fill: "#4daf4a",
        symbol: "circle",

        stroke: "white",
        strokeWidth: 1,
        opacity: 0.9,

        tip: true,

        title: d =>
          `${d3.utcFormat("%d.%m.%Y")(d.date)}
${d.giornale ?? ""}
${d.firma_esatta ?? ""}
${d.titre ?? d.testo_50_parole ?? ""}
${d.type_presence}`
      }
    ),

    // Menzioni:
    // triangoli arancioni originali
    Plot.dot(
      fazy_complet.filter(
        d =>
          d.type_presence ===
          "Mention de Lieut.-col. R. F."
      ),
      {
        x: "date",
        y: "ligne",

        r: 7,
        fill: "#e6550d",
        symbol: "diamond",

        stroke: "white",
        strokeWidth: 1,
        opacity: 0.9,

        tip: true,

        title: d =>
          `${d3.utcFormat("%d.%m.%Y")(d.date)}
${d.giornale ?? ""}
${d.titre ?? d.testo_50_parole ?? ""}
${d.type_presence}`
      }
    )
  ]
})
)}

function _valori_legenda_rf_annee(){return(
[34, 54]
)}

function _47(Plot,max_lieutcolrf_annee_fazy){return(
Plot.plot({
  width: 760,
  height: 110,

  marginLeft: 20,
  marginRight: 20,
  marginTop: 10,
  marginBottom: 35,

  x: {
    axis: null,
    domain: [0, 7]
  },

  y: {
    axis: null,
    domain: [-0.8, 0.8]
  },

  r: {
    type: "sqrt",
    domain: [1, max_lieutcolrf_annee_fazy],
    range: [4, 14]
  },

  color: {
    type: "linear",
    domain: [1, max_lieutcolrf_annee_fazy],
    range: ["#c6dbef", "#08519c"]
  },

  marks: [
    // Due cerchi blu: 34 e 54 presenze annue
    Plot.dot(
      [
        {x: 1, nombre: 34},
        {x: 2, nombre: 54}
      ],
      {
        x: "x",
        y: 0,
        r: "nombre",
        fill: "nombre",
        stroke: "#08519c",
        strokeWidth: 0.8,
        opacity: 0.9
      }
    ),

    Plot.text(
      [
        {x: 1, label: "34"},
        {x: 2, label: "54"}
      ],
      {
        x: "x",
        y: 0.02,
        text: "label",
        dy: 25,
        fontSize: 11
      }
    ),

    Plot.text(
      [{
        x: 1.5,
        y: -0.85,
        label: "Signatures Lieut.-col. R. F. par année"
      }],
      {
        x: "x",
        y: "y",
        text: "label",
        fontSize: 11
      }
    ),

    // Punto verde: Robert Fazy
    Plot.dot(
      [{
        x: 3.5,
        y: 0
      }],
      {
        x: "x",
        y: "y",
        r: 5.5,
        fill: "#4daf4a",
        stroke: "white",
        strokeWidth: 1,
        opacity: 0.9
      }
    ),

    Plot.text(
      [{
        x: 3.5,
        y: 0,
        label: "Signature Robert Fazy"
      }],
      {
        x: "x",
        y: "y",
        text: "label",
        dx: 14,
        textAnchor: "start",
        fontSize: 11
      }
    ),

    // Rombo arancione: menzione
    Plot.dot(
      [{
        x: 5.4,
        y: 0
      }],
      {
        x: "x",
        y: "y",
        r: 8,
        symbol: "diamond",
        fill: "#e6550d",
        stroke: "white",
        strokeWidth: 1,
        opacity: 0.9
      }
    ),

    Plot.text(
      [{
        x: 5.4,
        y: 0,
        label: "Mention de Lieut.-col. R. F."
      }],
      {
        x: "x",
        y: "y",
        text: "label",
        dx: 16,
        textAnchor: "start",
        fontSize: 11
      }
    )
  ]
})
)}

function _48(md){return(
md`## MAURICE AESCHIMANN`
)}

function _aeschimann_dataset_recueilli_corr(__query,FileAttachment,invalidation){return(
__query(FileAttachment("aeschimann_dataset_recueilli_corr.csv"),{from:{table:"aeschimann_dataset_recueilli_corr"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

async function _data_aeschimann_a(d3,FileAttachment){return(
d3.csvParse(
  (await FileAttachment("aeschimann_dataset_recueilli_corr.csv").text())
    .split("\n")
    .slice(1)
    .join("\n")
)
)}

function _data_aeschimann_clean(data_aeschimann_a,d3){return(
data_aeschimann_a.map(d => ({
  ...d,
  date: d3.utcParse("%Y-%m-%d")(d.date)
}))
)}

function _52(Plot,d3,data_aeschimann_a){return(
Plot.plot({
  width: 900,
  height: 400,
  marginLeft: 150,

  x: {
    type: "utc",
    label: "Année",
    grid: true,
    ticks: d3.utcYear.every(1),
    tickFormat: d3.utcFormat("%Y")
  },

  y: {
    label: null
  },

  color: {
    domain: ["Mention", "Signature"],
    range: ["orange", "steelblue"],
    legend: true
  },

  marks: [
    Plot.ruleY(data_aeschimann_a, {
      y: "journal",
      stroke: "#cccccc",
      strokeWidth: 1
    }),

    Plot.dot(data_aeschimann_a, {
      x: "date",
      y: "journal",
      fill: "type_trace",
      r: 8
    })
  ]
})
)}

function _53(md){return(
md`## BENJAMIN VIRET`
)}

function _viret_gdl_firme(__query,FileAttachment,invalidation){return(
__query(FileAttachment("viret_gdl_firme.csv"),{from:{table:"viret_gdl_firme"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _data_viret(FileAttachment){return(
FileAttachment("viret_gdl_firme.csv").csv({
  typed: true
})
)}

function _viret(data_viret){return(
data_viret
  .map(d => ({
    ...d,
    date: new Date(d.data),
    annee: new Date(d.data).getFullYear(),
    signature: d.firma_normalizzata
  }))
  .filter(d => !isNaN(d.date))
)}

function _viretParMoisEtSignature(d3,viret){return(
Array.from(
  d3.rollup(
    viret,
    articles => articles.length,
    d => d3.utcMonth.floor(d.date),
    d => d.signature
  ),
  ([mois, signatures]) =>
    Array.from(
      signatures,
      ([signature, nombre]) => ({
        mois,
        signature,
        nombre
      })
    )
).flat()
 .sort((a, b) => a.mois - b.mois)
)}

function _maxArticles(d3,viretParMoisEtSignature){return(
d3.max(
  viretParMoisEtSignature,
  d => d.nombre
)
)}

function _legendeCercles(d3,maxArticles){return(
d3.range(1, maxArticles + 1)
  .map(nombre => ({
    nombre,
    label: String(nombre)
  }))
)}

function _60(Plot,d3,maxArticles,viretParMoisEtSignature){return(
Plot.plot({
  width: 1100,
  height: 300,

  marginTop: 20,
  marginRight: 30,
  marginBottom: 55,
  marginLeft: 70,

  x: {
    type: "utc",
    label: "Année",
    grid: true,
    ticks: d3.utcYear.every(1),
    tickFormat: d3.utcFormat("%Y")
  },

  y: {
    domain: ["B. V.", "B. Viret", "Benj."],
    label: "Forme de signature"
  },

  r: {
    type: "sqrt",
    domain: [1, maxArticles],
    range: [2, 10]
  },

  color: {
    type: "linear",
    domain: [1, maxArticles],
    range: ["#c6dbef", "#08519c"],
    label: "Nombre d’articles"
  },

  marks: [
    Plot.ruleY(
      ["B. V.", "B. Viret", "Benj."],
      {
        stroke: "#d9d9d9",
        strokeWidth: 1
      }
    ),

    Plot.dot(viretParMoisEtSignature, {
      x: "mois",
      y: "signature",
      r: "nombre",
      fill: "nombre",
      stroke: "#08519c",
      strokeWidth: 0.7,
      tip: true,

      title: d => {
        const moisFormate = d.mois.toLocaleDateString(
          "fr-CH",
          {
            month: "long",
            year: "numeric",
            timeZone: "UTC"
          }
        );

        return (
          `${moisFormate}` +
          `\nSignature : ${d.signature}` +
          `\n${d.nombre} article${d.nombre > 1 ? "s" : ""}`
        );
      }
    })
  ]
})
)}

function _61(Plot,maxArticles,legendeCercles){return(
Plot.plot({
  width: 500,
  height: 90,

  marginTop: 10,
  marginBottom: 30,
  marginLeft: 25,
  marginRight: 25,

  x: {
    axis: null,
    domain: [0.5, maxArticles + 0.5]
  },

  y: {
    axis: null,
    domain: [-0.7, 0.7]
  },

  r: {
    type: "sqrt",
    domain: [1, maxArticles],
    range: [2, 10]
  },

  color: {
    type: "linear",
    domain: [1, maxArticles],
    range: ["#c6dbef", "#08519c"]
  },

  marks: [
    Plot.dot(legendeCercles, {
      x: "nombre",
      y: 0,
      r: "nombre",
      fill: "nombre",
      stroke: "#08519c",
      strokeWidth: 0.7
    }),

    Plot.text(legendeCercles, {
      x: "nombre",
      y: 0,
      text: "label",
      dy: 20,
      fontSize: 11
    })
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["robert_fazy_tous_journaux.csv", {url: new URL("./files/59a825afa5106db96bca3bef6280e1894905bc6c16db38f42a802d96253f226e2b3c75892839aedfb84273b05b590265e83074ae0585483a0a46474e763fdc15.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["viret_gdl_firme.csv", {url: new URL("./files/317a6999fed113c8c1ce52ffedd86fe5885e4841f3ff852268d5439b95314446f1360bb80da22bd186cbd2381eb252607fa6e9124eb5cbfa5a7ec71e0337bf52.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["aeschimann_dataset_recueilli_corr.csv", {url: new URL("./files/7c3b849152adff57812a243db59dc15be88cd3a57deba4e05ef13d692aa72789d998fd17992ac713904d7bdb8a692d7ca9971df4e4ef99b9eb92027142ed9b53.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["firme_septembre_1940.csv", {url: new URL("./files/f028db306b1d72e9a6d650a114c3086ff0dc7c528bfad768d99b1d7bb443fc7bd77f5ad1367a977c2b39143f260031a453e43513154d4b5ca5eaeced78a70a32.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["ch3_lieutcolrf.csv", {url: new URL("./files/5a122746c2060637f16a2878222874b542072d8f028d80cbab13cd7ddd2a571cae66a0db82baa7f3bcd6c4c1df721c0b2ff311ba6b973fd9a064d7bcbce827bf.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["firme_septembre_1940_corr.csv", {url: new URL("./files/d9862230a73d82bb9354ff70d51f0eb0a40baed5813190eed9d8a6943e69d0dcc139b814ec4af9582b5896ff586ad5eafbd3ebf7a230675818a97b0529d8bd90.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  const child1 = runtime.module(define1);
  main.import("BubbleChart", child1);
  main.variable(observer("firme_septembre_1940_corr")).define("firme_septembre_1940_corr", ["__query","FileAttachment","invalidation"], _firme_septembre_1940_corr);
  main.variable(observer("firme_septembre_1940")).define("firme_septembre_1940", ["__query","FileAttachment","invalidation"], _firme_septembre_1940);
  main.variable(observer("data_GDL")).define("data_GDL", ["d3","FileAttachment"], _data_GDL);
  main.variable(observer()).define(["__query","data_GDL","invalidation"], _9);
  main.variable(observer("data_GDL_corr")).define("data_GDL_corr", ["data_GDL"], _data_GDL_corr);
  main.variable(observer("data_GDL_clean")).define("data_GDL_clean", ["data_GDL_corr"], _data_GDL_clean);
  main.variable(observer("top10_GDL")).define("top10_GDL", ["data_GDL_clean","d3"], _top10_GDL);
  main.variable(observer()).define(["Plot","top10_GDL","d3"], _13);
  main.variable(observer()).define(["Inputs","top10_GDL"], _14);
  main.variable(observer()).define(["top10_GDL"], _15);
  main.variable(observer("dataBubbleGDL")).define("dataBubbleGDL", ["data_GDL_clean"], _dataBubbleGDL);
  main.variable(observer("bubble_GDL_corrige")).define("bubble_GDL_corrige", ["data_GDL_clean","d3"], _bubble_GDL_corrige);
  main.variable(observer("rapprochements")).define("rapprochements", _rapprochements);
  main.variable(observer("groupes_rapprochements_GDL")).define("groupes_rapprochements_GDL", _groupes_rapprochements_GDL);
  main.variable(observer("data_GDL_rapprochements")).define("data_GDL_rapprochements", ["data_GDL_clean","groupes_rapprochements_GDL"], _data_GDL_rapprochements);
  main.variable(observer("bubble_GDL_rapprochements")).define("bubble_GDL_rapprochements", ["d3","data_GDL_rapprochements"], _bubble_GDL_rapprochements);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("ch3_lieutcolrf")).define("ch3_lieutcolrf", ["__query","FileAttachment","invalidation"], _ch3_lieutcolrf);
  main.variable(observer("data_lieutcolrf")).define("data_lieutcolrf", ["FileAttachment"], _data_lieutcolrf);
  main.variable(observer("lieutcolrf")).define("lieutcolrf", ["data_lieutcolrf","d3"], _lieutcolrf);
  main.variable(observer("ajouts_lieutcolrf")).define("ajouts_lieutcolrf", _ajouts_lieutcolrf);
  main.variable(observer("lieutcolrf_complet")).define("lieutcolrf_complet", ["lieutcolrf","ajouts_lieutcolrf","d3"], _lieutcolrf_complet);
  main.variable(observer("lieutcolrf_par_semaine")).define("lieutcolrf_par_semaine", ["d3","lieutcolrf_complet"], _lieutcolrf_par_semaine);
  main.variable(observer("max_lieutcolrf_semaine")).define("max_lieutcolrf_semaine", ["d3","lieutcolrf_par_semaine"], _max_lieutcolrf_semaine);
  main.variable(observer()).define(["Plot","d3","max_lieutcolrf_semaine","lieutcolrf_par_semaine"], _31);
  main.variable(observer("valori_legenda_lieutcolrf_")).define("valori_legenda_lieutcolrf_", ["d3","max_lieutcolrf_semaine"], _valori_legenda_lieutcolrf_);
  main.variable(observer()).define(["Plot","valori_legenda_lieutcolrf_","max_lieutcolrf_semaine"], _33);
  main.variable(observer("robert_fazy_tous_journaux")).define("robert_fazy_tous_journaux", ["__query","FileAttachment","invalidation"], _robert_fazy_tous_journaux);
  main.variable(observer("data_robert_fazy")).define("data_robert_fazy", ["FileAttachment"], _data_robert_fazy);
  main.variable(observer("robert_fazy_complet")).define("robert_fazy_complet", ["data_robert_fazy","d3"], _robert_fazy_complet);
  main.variable(observer("fazy_complet")).define("fazy_complet", ["lieutcolrf_complet","robert_fazy_complet"], _fazy_complet);
  main.variable(observer("fazy_avec_decalage")).define("fazy_avec_decalage", ["d3","fazy_complet"], _fazy_avec_decalage);
  main.variable(observer("lieutcolrf_fazy_par_semaine")).define("lieutcolrf_fazy_par_semaine", ["d3","fazy_complet"], _lieutcolrf_fazy_par_semaine);
  main.variable(observer("max_lieutcolrf_fazy_semaine")).define("max_lieutcolrf_fazy_semaine", ["d3","lieutcolrf_fazy_par_semaine"], _max_lieutcolrf_fazy_semaine);
  main.variable(observer("lieutcolrf_par_mois_fazy")).define("lieutcolrf_par_mois_fazy", ["d3","fazy_complet"], _lieutcolrf_par_mois_fazy);
  main.variable(observer("max_lieutcolrf_mois_fazy")).define("max_lieutcolrf_mois_fazy", ["d3","lieutcolrf_par_mois_fazy"], _max_lieutcolrf_mois_fazy);
  main.variable(observer("lieutcolrf_par_annee_fazy")).define("lieutcolrf_par_annee_fazy", ["d3","fazy_complet"], _lieutcolrf_par_annee_fazy);
  main.variable(observer("max_lieutcolrf_annee_fazy")).define("max_lieutcolrf_annee_fazy", ["d3","lieutcolrf_par_annee_fazy"], _max_lieutcolrf_annee_fazy);
  main.variable(observer()).define(["Plot","d3","max_lieutcolrf_annee_fazy","lieutcolrf_par_annee_fazy","fazy_complet"], _45);
  main.variable(observer("valori_legenda_rf_annee")).define("valori_legenda_rf_annee", _valori_legenda_rf_annee);
  main.variable(observer()).define(["Plot","max_lieutcolrf_annee_fazy"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("aeschimann_dataset_recueilli_corr")).define("aeschimann_dataset_recueilli_corr", ["__query","FileAttachment","invalidation"], _aeschimann_dataset_recueilli_corr);
  main.variable(observer("data_aeschimann_a")).define("data_aeschimann_a", ["d3","FileAttachment"], _data_aeschimann_a);
  main.variable(observer("data_aeschimann_clean")).define("data_aeschimann_clean", ["data_aeschimann_a","d3"], _data_aeschimann_clean);
  main.variable(observer()).define(["Plot","d3","data_aeschimann_a"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("viret_gdl_firme")).define("viret_gdl_firme", ["__query","FileAttachment","invalidation"], _viret_gdl_firme);
  main.variable(observer("data_viret")).define("data_viret", ["FileAttachment"], _data_viret);
  main.variable(observer("viret")).define("viret", ["data_viret"], _viret);
  main.variable(observer("viretParMoisEtSignature")).define("viretParMoisEtSignature", ["d3","viret"], _viretParMoisEtSignature);
  main.variable(observer("maxArticles")).define("maxArticles", ["d3","viretParMoisEtSignature"], _maxArticles);
  main.variable(observer("legendeCercles")).define("legendeCercles", ["d3","maxArticles"], _legendeCercles);
  main.variable(observer()).define(["Plot","d3","maxArticles","viretParMoisEtSignature"], _60);
  main.variable(observer()).define(["Plot","maxArticles","legendeCercles"], _61);
  return main;
}
