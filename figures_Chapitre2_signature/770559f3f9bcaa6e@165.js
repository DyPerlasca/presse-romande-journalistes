function _1(md){return(
md`# CHAPITRE 2`
)}

function _signaturesGdl(__query,FileAttachment,invalidation){return(
__query(FileAttachment("Signatures GDL.csv"),{from:{table:"Signatures GDL"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

async function _data_GDL(d3,FileAttachment){return(
d3.dsvFormat(";").parse(
  await FileAttachment("Signatures GDL.csv").text()
)
)}

function _4(__query,data_GDL,invalidation){return(
__query(data_GDL,{from:{table:"data_GDL"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"data_GDL")
)}

function _signaturesFal(__query,FileAttachment,invalidation){return(
__query(FileAttachment("Signatures FAL.csv"),{from:{table:"Signatures FAL"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

async function _data_FAL(d3,FileAttachment){return(
d3.dsvFormat(";").parse(await FileAttachment("Signatures FAL.csv").text())
)}

function _7(__query,data_FAL,invalidation){return(
__query(data_FAL,{from:{table:"data_FAL"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"data_FAL")
)}

function _data_GDL_clean(data_GDL){return(
data_GDL
  .filter(d => {
    const contenu = (d["Type Contenu"] || "")
      .trim()
      .toLowerCase();

    return !contenu.startsWith("comm"); //no comm
  })
  .map(d => {
    const yy = String(d.Date || "")
      .split(".")[2]
      .trim();

    const n = +yy;

    return {
      ...d,

      year:
        yy.length === 4
          ? n
          : 1900 + n,

      type:
        (d["Type Signature"] || "")
          .trim()
          .toLowerCase() ||
        "sans signature"
    };
  })
)}

function _data_FAL_clean(data_FAL){return(
data_FAL
  .filter(d => {
    const contenu = (d["Type Contenu"] || "")
      .trim()
      .toLowerCase();

    return !contenu.startsWith("comm"); //no comm
  })
  .map(d => {
    const yy = String(d.Date || "")
      .split(".")[2]
      .trim();

    const n = +yy;

    return {
      ...d,

      year:
        yy.length === 4
          ? n
          : 1900 + n,

      type:
        (d["Type Signature"] || "")
          .trim()
          .toLowerCase() ||
        "sans signature"
    };
  })
)}

function _data_final_GDL_corretto(data_GDL_clean,d3)
{
  const tipi = ["abr", "complet", "autre"];

  const annees = Array.from(
    new Set(data_GDL_clean.map(d => d.year))
  ).sort(d3.ascending);

  return annees.flatMap(year => {
    const righeAnno = data_GDL_clean.filter(
      d => d.year === year
    );

    const denominatore = righeAnno.length;

    const categorie = tipi.map(type => {
      const numero = righeAnno.filter(
        d => d.type === type
      ).length;

      return {
        year,
        type,
        count: numero,
        denominator: denominatore,
        percent:
          denominatore > 0
            ? numero / denominatore
            : 0
      };
    });

    const totaleFirmato = d3.sum(
      categorie,
      d => d.count
    );

    return [
      ...categorie,
      {
        year,
        type: "total",
        count: totaleFirmato,
        denominator: denominatore,
        percent:
          denominatore > 0
            ? totaleFirmato / denominatore
            : 0
      }
    ];
  });
}


function _11(Plot,d3,data_final_GDL_corretto){return(
Plot.plot({
  width: 900,
  height: 500,

  x: {
    label: "Année",
    domain: [1870, 1980],
    tickFormat: d3.format("d")
  },

  y: {
    label: "%",
    tickFormat: d3.format(".0%"),
    domain: [0, 0.5]
  },

color: {
  legend: true,
  label: "Type de signature",
  domain: ["total", "abr", "complet", "autre"],
  range: ["black", "blue", "green", "orange"],
  tickFormat: d => ({
    total: "Total",
    abr: "Abrégée",
    complet: "Nom complet",
    autre: "Autre"
  })[d] ?? d
},

  marks: [
    Plot.lineY(
       data_final_GDL_corretto.filter(
        d => d.type !== "total"
      ),
      {
        x: "year",
        y: "percent",
        stroke: "type",
        z: "type",
        strokeWidth: 1.5
      }
    ),

    Plot.lineY(
      data_final_GDL_corretto.filter(
        d => d.type === "total"
      ),
      {
        x: "year",
        y: "percent",
        stroke: "black",
        strokeWidth: 3
      }
    ),

    Plot.ruleY([0])
  ]
})
)}

function _data_final_FAL_corretto(data_FAL_clean,d3)
{
  const tipi = ["abr", "complet", "autre"];

  const annees = Array.from(
    new Set(data_FAL_clean.map(d => d.year))
  ).sort(d3.ascending);

  return annees.flatMap(year => {
    const righeAnno = data_FAL_clean.filter(
      d => d.year === year
    );

    const denominatore = righeAnno.length;

    const categorie = tipi.map(type => {
      const count = righeAnno.filter(
        d => d.type === type
      ).length;

      return {
        year,
        type,
        count,
        denominator: denominatore,
        percent:
          denominatore > 0
            ? count / denominatore
            : 0
      };
    });

    const totaleFirmato = d3.sum(
      categorie,
      d => d.count
    );

    return [
      ...categorie,
      {
        year,
        type: "total",
        count: totaleFirmato,
        denominator: denominatore,
        percent:
          denominatore > 0
            ? totaleFirmato / denominatore
            : 0
      }
    ];
  });
}


function _13(Plot,d3,data_final_FAL_corretto){return(
Plot.plot({
  width: 900,
  height: 500,

  x: {
    label: "Année",
    domain: [1880, 1980],
    tickFormat: d3.format("d")
  },

  y: {
    label: "%",
    tickFormat: d3.format(".0%"),
    domain: [0, 0.5]
  },

color: {
  legend: true,
  label: "Type de signature",
  domain: ["total", "abr", "complet", "autre"],
  range: ["black", "blue", "green", "orange"],
  tickFormat: d => ({
    total: "Total",
    abr: "Abrégée",
    complet: "Nom complet",
    autre: "Autre"
  })[d] ?? d
},

  marks: [
    Plot.lineY(
      data_final_FAL_corretto.filter(
        d => d.type !== "total"
      ),
      {
        x: "year",
        y: "percent",
        stroke: "type",
        z: "type",
        strokeWidth: 1.5
      }
    ),

    Plot.lineY(
      data_final_FAL_corretto.filter(
        d => d.type === "total"
      ),
      {
        x: "year",
        y: "percent",
        stroke: "black",
        strokeWidth: 3
      }
    ),

    Plot.ruleY([0])
  ]
})
)}

function _14(md){return(
md`# Type articles signés`
)}

function _signed_format_over_total_GDL(data_GDL_clean,d3)
{
  const typesSignes = ["abr", "complet", "autre"];

  const annees = Array.from(
    new Set(data_GDL_clean.map(d => d.year))
  ).sort(d3.ascending);

  return annees.flatMap(decade => {
    const articlesDecennie = data_GDL_clean.filter(
      d => d.year === decade
    );

    const denominator = articlesDecennie.length;

    const articlesSignes = articlesDecennie
      .filter(d => typesSignes.includes(d.type))
      .map(d => ({
        ...d,

        typeFormat:
          String(d["Type Format"] || "")
            .trim()
            .toLowerCase() ||
          "non classé"
      }));

    return d3.rollups(
      articlesSignes,
      lignes => lignes.length,
      d => d.typeFormat
    ).map(([typeFormat, count]) => ({
      decade,
      typeFormat,
      count,
      denominator,
      percent:
        denominator > 0
          ? count / denominator
          : 0
    }));
  });
}


function _total_line_GDL(data_final_GDL_corretto,d3){return(
data_final_GDL_corretto
  .filter(d => d.type === "total")
  .map(d => ({
    decade: d.year,
    count: d.count,
    denominator: d.denominator,
    percent: d.percent
  }))
  .sort((a, b) => d3.ascending(a.decade, b.decade))
)}

function _17(Plot,total_line_GDL,d3){return(
Plot.lineY(total_line_GDL, {
  x: "decade",
  y: "percent",
  stroke: "black",
  strokeWidth: 3,
  marker: true,

  title: d => `${d.decade}
Total signé
${d.count} article(s)
${d3.format(".1%")(d.percent)}`
})
)}

function _18(Plot,d3,signed_format_over_total_GDL,data_final_GDL_corretto){return(
Plot.plot({
  width: 950,
  height: 520,

  x: {
    label: "Décennie",
    type: "band",
    domain: d3.range(1870, 1990, 10),
    tickFormat: d3.format("d")
  },

  y: {
    label: "% de l’ensemble des articles",
    tickFormat: d3.format(".0%"),
    domain: [0, 0.45]
  },

  color: {
    legend: true,
    label: "Type de format",

    domain: [
      "ed",
      "corr",
      "chronique",
      "reportage",
      "interview",
      "info",
      //"dep",
      //"non classé"
    ],

    range: [
      "#6a3d9a",
      "#1f78b4",
      "#33a02c",
      "#e31a1c",
      "#ff7f00",
      "#b15928",
      //"#a6cee3",
      //"#999999"
    ],

    tickFormat: d => ({
      ed: "Éditorial",
      corr: "Correspondance",
      chronique: "Chronique",
      reportage: "Reportage",
      interview: "Interview",
      info: "Information",
     // dep: "Dépêche",
     // "non classé": "Non classé"
    })[d] ?? d
  },

  marks: [
    Plot.barY(
      signed_format_over_total_GDL
        .slice()
        .sort((a, b) =>
          d3.ascending(a.decade, b.decade) ||
          d3.descending(a.percent, b.percent)
        ),

      Plot.stackY({
        x: "decade",
        y: "percent",
        fill: "typeFormat",
        order: null,

        title: d => {
          const labels = {
            ed: "Éditorial",
            corr: "Correspondance",
            chronique: "Chronique",
            reportage: "Reportage",
            interview: "Interview",
            info: "Information",
            dep: "Dépêche",
            "non classé": "Non classé"
          };

          return `${d.decade}
${labels[d.typeFormat] ?? d.typeFormat}
${d.count} article(s) signé(s)
${d3.format(".1%")(d.percent)} de l’ensemble des articles`;
        }
      })
    ),

    Plot.lineY(
      data_final_GDL_corretto
        .filter(d => d.type === "total")
        .map(d => ({
          decade: Math.floor(d.year / 10) * 10,
          percent: d.percent,
          count: d.count
        })),
      {
        x: "decade",
        y: "percent",
        stroke: "black",
        strokeWidth: 3,
        marker: true,

        title: d => `${d.decade}
Total signé
${d.count} article(s)
${d3.format(".1%")(d.percent)}`
      }
    ),

    Plot.ruleY([0])
  ]
})
)}

function _signed_format_over_total_FAL(data_FAL_clean,d3)
{
  const typesSignes = ["abr", "complet", "autre"];

  const annees = Array.from(
    new Set(data_FAL_clean.map(d => d.year))
  ).sort(d3.ascending);

  return annees.flatMap(decade => {
    const articlesDecennie = data_FAL_clean.filter(
      d => d.year === decade
    );

    const denominator = articlesDecennie.length;

    const articlesSignes = articlesDecennie
      .filter(d => typesSignes.includes(d.type))
      .map(d => ({
        ...d,

        typeFormat:
          String(d["Type Format"] || "")
            .trim()
            .toLowerCase() ||
          "non classé"
      }));

    return d3.rollups(
      articlesSignes,
      lignes => lignes.length,
      d => d.typeFormat
    ).map(([typeFormat, count]) => ({
      decade,
      typeFormat,
      count,
      denominator,
      percent:
        denominator > 0
          ? count / denominator
          : 0
    }));
  });
}


function _total_line_FAL(data_final_FAL_corretto,d3){return(
data_final_FAL_corretto
  .filter(d => d.type === "total")
  .map(d => ({
    decade: d.year,
    count: d.count,
    denominator: d.denominator,
    percent: d.percent
  }))
  .sort((a, b) =>
    d3.ascending(a.decade, b.decade)
  )
)}

function _21(Plot,d3,signed_format_over_total_FAL,total_line_FAL){return(
Plot.plot({
  width: 950,
  height: 520,

  x: {
    label: "Décennie",
    type: "band",
    domain: d3.range(1880, 1990, 10),
    tickFormat: d3.format("d")
  },

  y: {
    label: "% de l’ensemble des articles",
    tickFormat: d3.format(".0%"),
    domain: [0, 0.50]
  },

  color: {
    legend: true,
    label: "Type de format",

    domain: [
      "ed",
      "corr",
      "chronique",
      "reportage",
      "interview",
      "info",
      //"dep",
      //"non classé"
    ],

    range: [
      "#6a3d9a",
      "#1f78b4",
      "#33a02c",
      "#e31a1c",
      "#ff7f00",
      "#b15928",
      "#a6cee3",
      //"#999999"
    ],

    tickFormat: d => ({
      ed: "Éditorial",
      corr: "Correspondance",
      chronique: "Chronique",
      reportage: "Reportage",
      interview: "Interview",
      info: "Information",
      //dep: "Dépêche",
      //"non classé": "Non classé"
    })[d] ?? d
  },

  marks: [
    Plot.barY(
      signed_format_over_total_FAL
        .slice()
        .sort((a, b) =>
          d3.ascending(a.decade, b.decade) ||
          d3.descending(a.percent, b.percent)
        ),

      Plot.stackY({
        x: "decade",
        y: "percent",
        fill: "typeFormat",
        order: null,

        title: d => {
          const labels = {
            ed: "Éditorial",
            corr: "Correspondance",
            chronique: "Chronique",
            reportage: "Reportage",
            interview: "Interview",
            info: "Information",
            dep: "Dépêche",
            "non classé": "Non classé"
          };

          return `${d.decade}
${labels[d.typeFormat] ?? d.typeFormat}
${d.count} article(s) signé(s)
${d3.format(".1%")(d.percent)} de l’ensemble des articles`;
        }
      })
    ),

    Plot.lineY(total_line_FAL, {
      x: "decade",
      y: "percent",
      stroke: "black",
      strokeWidth: 3,
      marker: true,

      title: d => `${d.decade}
Total signé
${d.count} article(s)
${d3.format(".1%")(d.percent)}`
    }),

    Plot.ruleY([0])
  ]
})
)}

function _all_format_GDL(data_GDL_clean,d3)
{
  const annees = Array.from(
    new Set(data_GDL_clean.map(d => d.year))
  ).sort(d3.ascending);

  return annees.flatMap(decade => {
    const articlesDecennie = data_GDL_clean
      .filter(d => d.year === decade)
      .map(d => ({
        ...d,
        typeFormat:
          String(d["Type Format"] || "")
            .trim()
            .toLowerCase() ||
          "non classé"
      }));

    const denominator = articlesDecennie.length;

    return d3.rollups(
      articlesDecennie,
      lignes => lignes.length,
      d => d.typeFormat
    ).map(([typeFormat, count]) => ({
      decade,
      typeFormat,
      count,
      denominator,
      percent:
        denominator > 0
          ? count / denominator
          : 0
    }));
  });
}


function _23(Plot,d3,all_format_GDL){return(
Plot.plot({
  width: 950,
  height: 520,

  x: {
    label: "Décennie",
    type: "band",
    domain: d3.range(1870, 1990, 10),
    tickFormat: d3.format("d")
  },

  y: {
    label: "% de l’ensemble des articles",
    tickFormat: d3.format(".0%"),
    domain: [0, 1]
  },

  color: {
    legend: true,
    label: "Type de format",

    domain: [
      "chronique",
      "corr",
      "info",
      "reportage",
      "ed",
      "interview",
      "dep"
    ],

    range: [
      "#33a02c", // Chronique
      "#1f78b4", // Correspondance
      "#b15928", // Information
      "#e31a1c", // Reportage
      "#6a3d9a", // Éditorial
      "#ff7f00", // Interview
      "#a6cee3"  // Dépêche
    ],

    tickFormat: d => ({
      chronique: "Chronique",
      corr: "Correspondance",
      info: "Information",
      reportage: "Reportage",
      ed: "Éditorial",
      interview: "Interview",
      dep: "Dépêche"
    })[d] ?? d
  },

  marks: [
    Plot.barY(
      all_format_GDL
        .filter(d => d.typeFormat !== "non classé")
        .map(d => ({
          ...d,

          ordre: ({
            chronique: 1,
            corr: 2,
            info: 3,
            reportage: 4,
            ed: 5,
            interview: 6,
            dep: 7
          })[d.typeFormat]
        })),

      Plot.stackY({
        x: "decade",
        y: "percent",
        fill: "typeFormat",
        order: "ordre",

        title: d => {
          const labels = {
            chronique: "Chronique",
            corr: "Correspondance",
            info: "Information",
            reportage: "Reportage",
            ed: "Éditorial",
            interview: "Interview",
            dep: "Dépêche"
          };

          return `${d.decade}
${labels[d.typeFormat] ?? d.typeFormat}
${d.count} article(s)
${d3.format(".1%")(d.percent)} de l’ensemble des articles`;
        }
      })
    ),

    Plot.ruleY([0])
  ]
})
)}

function _all_format_FAL(data_FAL_clean,d3)
{
  const annees = Array.from(
    new Set(data_FAL_clean.map(d => d.year))
  ).sort(d3.ascending);

  return annees.flatMap(decade => {
    const articlesDecennie = data_FAL_clean
      .filter(d => d.year === decade)
      .map(d => ({
        ...d,
        typeFormat:
          String(d["Type Format"] || "")
            .trim()
            .toLowerCase() ||
          "non classé"
      }));

    const denominator = articlesDecennie.length;

    return d3.rollups(
      articlesDecennie,
      lignes => lignes.length,
      d => d.typeFormat
    ).map(([typeFormat, count]) => ({
      decade,
      typeFormat,
      count,
      denominator,
      percent:
        denominator > 0
          ? count / denominator
          : 0
    }));
  });
}


function _25(Plot,d3,all_format_FAL){return(
Plot.plot({
  width: 950,
  height: 520,

  x: {
    label: "Décennie",
    type: "band",
    domain: d3.range(1880, 1990, 10),
    tickFormat: d3.format("d")
  },

  y: {
    label: "% de l’ensemble des articles",
    tickFormat: d3.format(".0%"),
    domain: [0, 1]
  },

  color: {
    legend: true,
    label: "Type de format",

    domain: [
      "chronique",
      "corr",
      "info",
      "reportage",
      "ed",
      "interview",
      "dep"
    ],

    range: [
      "#33a02c", // Chronique
      "#1f78b4", // Correspondance
      "#b15928", // Information
      "#e31a1c", // Reportage
      "#6a3d9a", // Éditorial
      "#ff7f00", // Interview
      "#a6cee3"  // Dépêche
    ],

    tickFormat: d => ({
      chronique: "Chronique",
      corr: "Correspondance",
      info: "Information",
      reportage: "Reportage",
      ed: "Éditorial",
      interview: "Interview",
      dep: "Dépêche"
    })[d] ?? d
  },

  marks: [
    Plot.barY(
      all_format_FAL
        .filter(d => d.typeFormat !== "non classé")
        .map(d => ({
          ...d,

          ordre: ({
            chronique: 1,
            corr: 2,
            info: 3,
            reportage: 4,
            ed: 5,
            interview: 6,
            dep: 7
          })[d.typeFormat]
        })),

      Plot.stackY({
        x: "decade",
        y: "percent",
        fill: "typeFormat",
        order: "ordre",

        title: d => {
          const labels = {
            chronique: "Chronique",
            corr: "Correspondance",
            info: "Information",
            reportage: "Reportage",
            ed: "Éditorial",
            interview: "Interview",
            dep: "Dépêche"
          };

          return `${d.decade}
${labels[d.typeFormat] ?? d.typeFormat}
${d.count} article(s)
${d3.format(".1%")(d.percent)} de l’ensemble des articles`;
        }
      })
    ),

    Plot.ruleY([0])
  ]
})
)}

function _26(md){return(
md`# contenu`
)}

function _signed_content_over_total_GDL(data_GDL_clean,d3)
{
  const typesSignes = ["abr", "complet", "autre"];

  const annees = Array.from(
    new Set(data_GDL_clean.map(d => d.year))
  ).sort(d3.ascending);

  return annees.flatMap(decade => {
    const articlesDecennie = data_GDL_clean.filter(
      d => d.year === decade
    );

    const denominator = articlesDecennie.length;

    const articlesSignes = articlesDecennie
      .filter(d => typesSignes.includes(d.type))
      .map(d => ({
        ...d,
        typeContenu:
          String(d["Type Contenu"] || "")
            .trim()
            .toLowerCase() ||
          "non classé"
      }));

    return d3.rollups(
      articlesSignes,
      lignes => lignes.length,
      d => d.typeContenu
    ).map(([typeContenu, count]) => ({
      decade,
      typeContenu,
      count,
      denominator,
      percent:
        denominator > 0
          ? count / denominator
          : 0
    }));
  });
}


function _28(Inputs,signed_content_over_total_GDL){return(
Inputs.table(signed_content_over_total_GDL)
)}

function _29(Plot,d3,signed_content_over_total_GDL,data_final_GDL_corretto){return(
Plot.plot({
  width: 950,
  height: 520,

  x: {
    label: "Décennie",
    type: "band",
    domain: d3.range(1870, 1990, 10),
    tickFormat: d3.format("d")
  },

  y: {
    label: "% de l’ensemble des articles",
    tickFormat: d3.format(".0%"),
    domain: [0, 0.45]
  },

  color: {
    legend: true,
    label: "Type de contenu",

    domain: [
      "inter",
      "pol",
      "actu",
      "culture",
      "eco",
      "société",
      "sport",
      "science",
      "judiciaire",
      "divertissement",
      "nécrologie"
    ],

    range: [
      "#4269d0", // Internationale
      "#efb118", // Politique
      "#ff725c", // Actualité
      "#6cc5b0", // Culture
      "#9498a0", // Économie
      "#9c6bff", // Société
      "#ff8ab7", // Sport
      "#5aa469", // Science
      "#d17c3f", // Judiciaire
      "#7f8fa6", // Divertissement
      "#b56576"  // Nécrologie
    ],

    tickFormat: d => ({
      inter: "Internationale",
      pol: "Politique",
      actu: "Actualité",
      culture: "Culture",
      eco: "Économie",
      société: "Société",
      sport: "Sport",
      science: "Science",
      judiciaire: "Judiciaire",
      divertissement: "Divertissement",
      necrologie: "Nécrologie"
    })[d] ?? d
  },

  marks: [
    Plot.barY(
      signed_content_over_total_GDL
        .filter(d => d.typeContenu !== "non classé")
        .map(d => ({
          ...d,

          ordre: ({
            inter: 1,
            pol: 2,
            actu: 3,
            culture: 4,
            eco: 5,
            société: 6,
            sport: 7,
            science: 8,
            judiciaire: 9,
            divertissement: 10,
            necrologie: 11
          })[d.typeContenu]
        })),

      Plot.stackY({
        x: "decade",
        y: "percent",
        fill: "typeContenu",
        order: "ordre",

        title: d => {
          const labels = {
            inter: "Internationale",
            pol: "Politique",
            actu: "Actualité",
            culture: "Culture",
            eco: "Économie",
            société: "Société",
            sport: "Sport",
            science: "Science",
            judiciaire: "Judiciaire",
            divertissement: "Divertissement",
            necrologie: "Nécrologie"
          };

          return `${d.decade}
${labels[d.typeContenu] ?? d.typeContenu}
${d.count} article(s) signé(s)
${d3.format(".1%")(d.percent)} de l’ensemble des articles`;
        }
      })
    ),

    Plot.lineY(
      data_final_GDL_corretto
        .filter(d => d.type === "total")
        .map(d => ({
          decade: d.year,
          count: d.count,
          percent: d.percent
        })),
      {
        x: "decade",
        y: "percent",
        stroke: "black",
        strokeWidth: 3,
        marker: true,

        title: d => `${d.decade}
Total signé
${d.count} article(s)
${d3.format(".1%")(d.percent)}`
      }
    ),

    Plot.ruleY([0])
  ]
})
)}

function _signed_content_over_total_FAL(data_FAL_clean,d3)
{
  const typesSignes = ["abr", "complet", "autre"];

  const annees = Array.from(
    new Set(data_FAL_clean.map(d => d.year))
  ).sort(d3.ascending);

  return annees.flatMap(decade => {
    const articlesDecennie = data_FAL_clean.filter(
      d => d.year === decade
    );

    const denominator = articlesDecennie.length;

    const articlesSignes = articlesDecennie
      .filter(d => typesSignes.includes(d.type))
      .map(d => ({
        ...d,
        typeContenu:
          String(d["Type Contenu"] || "")
            .trim()
            .toLowerCase() ||
          "non classé"
      }));

    return d3.rollups(
      articlesSignes,
      lignes => lignes.length,
      d => d.typeContenu
    ).map(([typeContenu, count]) => ({
      decade,
      typeContenu,
      count,
      denominator,
      percent: denominator > 0 ? count / denominator : 0
    }));
  });
}


function _31(Plot,d3,signed_content_over_total_FAL,total_line_FAL){return(
Plot.plot({
  width: 950,
  height: 520,

  x: {
    label: "Décennie",
    type: "band",
    domain: d3.range(1880, 1990, 10),
    tickFormat: d3.format("d")
  },

  y: {
    label: "% de l’ensemble des articles",
    tickFormat: d3.format(".0%"),
    domain: [0, 0.50]
  },

  color: {
    legend: true,
    label: "Type de contenu",

    domain: [
      "inter",
      "pol",
      "actu",
      "culture",
      "eco",
      "société",
      "sport",
      "science",
      "judiciaire",
      "divertissement",
      "nécrologie"
    ],

    range: [
      "#4269d0",
      "#efb118",
      "#ff725c",
      "#6cc5b0",
      "#9498a0",
      "#9c6bff",
      "#ff8ab7",
      "#5aa469",
      "#d17c3f",
      "#7f8fa6",
      "#b56576"
    ],

    tickFormat: d => ({
      inter: "Internationale",
      pol: "Politique",
      actu: "Actualité",
      culture: "Culture",
      eco: "Économie",
      société: "Société",
      sport: "Sport",
      science: "Science",
      judiciaire: "Judiciaire",
      divertissement: "Divertissement",
      "nécrologie": "Nécrologie"
    })[d] ?? d
  },

  marks: [
    Plot.barY(
      signed_content_over_total_FAL.map(d => ({
        ...d,

        ordre: ({
          inter: 1,
          pol: 2,
          actu: 3,
          culture: 4,
          eco: 5,
          société: 6,
          sport: 7,
          science: 8,
          judiciaire: 9,
          divertissement: 10,
          "nécrologie": 11
        })[d.typeContenu]
      })),

      Plot.stackY({
        x: "decade",
        y: "percent",
        fill: "typeContenu",
        order: "ordre",

        title: d => {
          const labels = {
            inter: "Internationale",
            pol: "Politique",
            actu: "Actualité",
            culture: "Culture",
            eco: "Économie",
            société: "Société",
            sport: "Sport",
            science: "Science",
            judiciaire: "Judiciaire",
            divertissement: "Divertissement",
            "nécrologie": "Nécrologie"
          };

          return `${d.decade}
${labels[d.typeContenu] ?? d.typeContenu}
${d.count} article(s) signé(s)
${d3.format(".1%")(d.percent)} de l’ensemble des articles`;
        }
      })
    ),

    Plot.lineY(total_line_FAL, {
      x: "decade",
      y: "percent",
      stroke: "black",
      strokeWidth: 3,
      marker: true,

      title: d => `${d.decade}
Total signé
${d.count} article(s)
${d3.format(".1%")(d.percent)}`
    }),

    Plot.ruleY([0])
  ]
})
)}

function _all_contenu_GDL(data_GDL_clean,d3)
{
  const annees = Array.from(
    new Set(data_GDL_clean.map(d => d.year))
  ).sort(d3.ascending);

  return annees.flatMap(decade => {
    const articlesDecennie = data_GDL_clean
      .filter(d => d.year === decade)
      .map(d => ({
        ...d,
        typeContenu:
          String(d["Type Contenu"] || "")
            .trim()
            .toLowerCase() ||
          "non classé"
      }));

    const denominator = articlesDecennie.length;

    return d3.rollups(
      articlesDecennie,
      lignes => lignes.length,
      d => d.typeContenu
    ).map(([typeContenu, count]) => ({
      decade,
      typeContenu,
      count,
      denominator,
      percent: denominator > 0
        ? count / denominator
        : 0
    }));
  });
}


function _33(Plot,d3,all_contenu_GDL){return(
Plot.plot({
  width: 950,
  height: 520,

  x: {
    label: "Décennie",
    type: "band",
    domain: d3.range(1870, 1990, 10),
    tickFormat: d3.format("d")
  },

  y: {
    label: "% de l’ensemble des articles",
    tickFormat: d3.format(".0%"),
    domain: [0, 1]
  },

  color: {
    legend: true,
    label: "Type de contenu",

    domain: [
      "inter",
      "pol",
      "actu",
      "culture",
      "eco",
      "société",
      "sport",
      "science",
      "judiciaire",
      "divertissement",
      "nécrologie"
    ],

    range: [
      "#4269d0", // Internationale
      "#efb118", // Politique
      "#ff725c", // Actualité
      "#6cc5b0", // Culture
      "#9498a0", // Économie
      "#9c6bff", // Société
      "#ff8ab7", // Sport
      "#5aa469", // Science
      "#d17c3f", // Judiciaire
      "#7f8fa6", // Divertissement
      "#b56576"  // Nécrologie
    ],

    tickFormat: d => ({
      inter: "Internationale",
      pol: "Politique",
      actu: "Actualité",
      culture: "Culture",
      eco: "Économie",
      société: "Société",
      sport: "Sport",
      science: "Science",
      judiciaire: "Judiciaire",
      divertissement: "Divertissement",
      "nécrologie": "Nécrologie"
    })[d] ?? d
  },

  marks: [
    Plot.barY(
      all_contenu_GDL
        .filter(d => d.typeContenu !== "non classé")
        .map(d => ({
          ...d,

          ordre: ({
            inter: 1,
            pol: 2,
            actu: 3,
            culture: 4,
            eco: 5,
            société: 6,
            science: 7,
            judiciaire: 8,
            divertissement: 9,
            "nécrologie": 10,
            sport: 11
          })[d.typeContenu]
        })),

      Plot.stackY({
        x: "decade",
        y: "percent",
        fill: "typeContenu",
        order: "ordre",

        title: d => {
          const labels = {
            inter: "Internationale",
            pol: "Politique",
            actu: "Actualité",
            culture: "Culture",
            eco: "Économie",
            société: "Société",
            sport: "Sport",
            science: "Science",
            judiciaire: "Judiciaire",
            divertissement: "Divertissement",
            "nécrologie": "Nécrologie"
          };

          return `${d.decade}
${labels[d.typeContenu] ?? d.typeContenu}
${d.count} article(s)
${d3.format(".1%")(d.percent)} de l’ensemble des articles`;
        }
      })
    ),

    Plot.ruleY([0])
  ]
})
)}

function _all_contenu_FAL(data_FAL_clean,d3)
{
  const annees = Array.from(
    new Set(data_FAL_clean.map(d => d.year))
  ).sort(d3.ascending);

  return annees.flatMap(decade => {
    const articlesDecennie = data_FAL_clean
      .filter(d => d.year === decade)
      .map(d => ({
        ...d,
        typeContenu:
          String(d["Type Contenu"] || "")
            .trim()
            .toLowerCase() ||
          "non classé"
      }));

    const denominator = articlesDecennie.length;

    return d3.rollups(
      articlesDecennie,
      lignes => lignes.length,
      d => d.typeContenu
    ).map(([typeContenu, count]) => ({
      decade,
      typeContenu,
      count,
      denominator,
      percent: denominator > 0
        ? count / denominator
        : 0
    }));
  });
}


function _35(Plot,d3,all_contenu_FAL){return(
Plot.plot({
  width: 950,
  height: 520,

  x: {
    label: "Décennie",
    type: "band",
    domain: d3.range(1880, 1990, 10),
    tickFormat: d3.format("d")
  },

  y: {
    label: "% de l’ensemble des articles",
    tickFormat: d3.format(".0%"),
    domain: [0, 1]
  },

  color: {
    legend: true,
    label: "Type de contenu",

    domain: [
      "inter",
      "pol",
      "actu",
      "culture",
      "eco",
      "société",
      "sport",
      "science",
      "judiciaire",
      "divertissement",
      "nécrologie"
    ],

    range: [
      "#4269d0", // Internationale
      "#efb118", // Politique
      "#ff725c", // Actualité
      "#6cc5b0", // Culture
      "#9498a0", // Économie
      "#9c6bff", // Société
      "#ff8ab7", // Sport
      "#5aa469", // Science
      "#d17c3f", // Judiciaire
      "#7f8fa6", // Divertissement
      "#b56576"  // Nécrologie
    ],

    tickFormat: d => ({
      inter: "Internationale",
      pol: "Politique",
      actu: "Actualité",
      culture: "Culture",
      eco: "Économie",
      société: "Société",
      sport: "Sport",
      science: "Science",
      judiciaire: "Judiciaire",
      divertissement: "Divertissement",
      "nécrologie": "Nécrologie"
    })[d] ?? d
  },

  marks: [
    Plot.barY(
      all_contenu_FAL
        .filter(d => d.typeContenu !== "non classé")
        .map(d => ({
          ...d,

          ordre: ({
            inter: 1,
            pol: 2,
            actu: 3,
            culture: 4,
            eco: 5,
            société: 6,
            science: 7,
            judiciaire: 8,
            divertissement: 9,
            "nécrologie": 10,
            sport: 11
          })[d.typeContenu]
        })),

      Plot.stackY({
        x: "decade",
        y: "percent",
        fill: "typeContenu",
        order: "ordre",

        title: d => {
          const labels = {
            inter: "Internationale",
            pol: "Politique",
            actu: "Actualité",
            culture: "Culture",
            eco: "Économie",
            société: "Société",
            sport: "Sport",
            science: "Science",
            judiciaire: "Judiciaire",
            divertissement: "Divertissement",
            "nécrologie": "Nécrologie"
          };

          return `${d.decade}
${labels[d.typeContenu] ?? d.typeContenu}
${d.count} article(s)
${d3.format(".1%")(d.percent)} de l’ensemble des articles`;
        }
      })
    ),

    Plot.ruleY([0])
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Signatures GDL.csv", {url: new URL("./files/5bf6c5b3e8faaac3b98cc8a901eeb70f4599ad5a6b3ca73ad50a89ee2c6fffd8aa90f6ddc59c91cf3bdad0b592f6274876700d4f5d1c12aec31c3bd1996ed1d5.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Signatures FAL.csv", {url: new URL("./files/7efde03e1461c5a76a425022180209d886619df0c37fd0f5a5b4682a7c08f5dbaac77014a95c244bc0548b13f165f62b0e3d35966e3ce83e75e9cc6131dc7c24.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("signaturesGdl")).define("signaturesGdl", ["__query","FileAttachment","invalidation"], _signaturesGdl);
  main.variable(observer("data_GDL")).define("data_GDL", ["d3","FileAttachment"], _data_GDL);
  main.variable(observer()).define(["__query","data_GDL","invalidation"], _4);
  main.variable(observer("signaturesFal")).define("signaturesFal", ["__query","FileAttachment","invalidation"], _signaturesFal);
  main.variable(observer("data_FAL")).define("data_FAL", ["d3","FileAttachment"], _data_FAL);
  main.variable(observer()).define(["__query","data_FAL","invalidation"], _7);
  main.variable(observer("data_GDL_clean")).define("data_GDL_clean", ["data_GDL"], _data_GDL_clean);
  main.variable(observer("data_FAL_clean")).define("data_FAL_clean", ["data_FAL"], _data_FAL_clean);
  main.variable(observer("data_final_GDL_corretto")).define("data_final_GDL_corretto", ["data_GDL_clean","d3"], _data_final_GDL_corretto);
  main.variable(observer()).define(["Plot","d3","data_final_GDL_corretto"], _11);
  main.variable(observer("data_final_FAL_corretto")).define("data_final_FAL_corretto", ["data_FAL_clean","d3"], _data_final_FAL_corretto);
  main.variable(observer()).define(["Plot","d3","data_final_FAL_corretto"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("signed_format_over_total_GDL")).define("signed_format_over_total_GDL", ["data_GDL_clean","d3"], _signed_format_over_total_GDL);
  main.variable(observer("total_line_GDL")).define("total_line_GDL", ["data_final_GDL_corretto","d3"], _total_line_GDL);
  main.variable(observer()).define(["Plot","total_line_GDL","d3"], _17);
  main.variable(observer()).define(["Plot","d3","signed_format_over_total_GDL","data_final_GDL_corretto"], _18);
  main.variable(observer("signed_format_over_total_FAL")).define("signed_format_over_total_FAL", ["data_FAL_clean","d3"], _signed_format_over_total_FAL);
  main.variable(observer("total_line_FAL")).define("total_line_FAL", ["data_final_FAL_corretto","d3"], _total_line_FAL);
  main.variable(observer()).define(["Plot","d3","signed_format_over_total_FAL","total_line_FAL"], _21);
  main.variable(observer("all_format_GDL")).define("all_format_GDL", ["data_GDL_clean","d3"], _all_format_GDL);
  main.variable(observer()).define(["Plot","d3","all_format_GDL"], _23);
  main.variable(observer("all_format_FAL")).define("all_format_FAL", ["data_FAL_clean","d3"], _all_format_FAL);
  main.variable(observer()).define(["Plot","d3","all_format_FAL"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("signed_content_over_total_GDL")).define("signed_content_over_total_GDL", ["data_GDL_clean","d3"], _signed_content_over_total_GDL);
  main.variable(observer()).define(["Inputs","signed_content_over_total_GDL"], _28);
  main.variable(observer()).define(["Plot","d3","signed_content_over_total_GDL","data_final_GDL_corretto"], _29);
  main.variable(observer("signed_content_over_total_FAL")).define("signed_content_over_total_FAL", ["data_FAL_clean","d3"], _signed_content_over_total_FAL);
  main.variable(observer()).define(["Plot","d3","signed_content_over_total_FAL","total_line_FAL"], _31);
  main.variable(observer("all_contenu_GDL")).define("all_contenu_GDL", ["data_GDL_clean","d3"], _all_contenu_GDL);
  main.variable(observer()).define(["Plot","d3","all_contenu_GDL"], _33);
  main.variable(observer("all_contenu_FAL")).define("all_contenu_FAL", ["data_FAL_clean","d3"], _all_contenu_FAL);
  main.variable(observer()).define(["Plot","d3","all_contenu_FAL"], _35);
  return main;
}
