import define1 from "./f3d342db2d382751@886.js";

function _1(md){return(
md`# Figures CHAPITRE 1
`
)}

function _unigrams(FileAttachment){return(
FileAttachment("unigrams.json").json()
)}

function _unigrams_data(FileAttachment){return(
FileAttachment("unigrams.json").json().then(json => json.data)
)}

function _4(md){return(
md`- tous avant 1880 (nous avons retenu uniquement journaliste et rédacteur)`
)}

function _unigrams_data_a(FileAttachment){return(
FileAttachment("impresso dataset avant 1880.json").json().then(json => json.data)
)}

function _6(md){return(
md`- **ajoute "publiciste":**`
)}

function _unigrams_publiciste(FileAttachment){return(
FileAttachment("unigrams_publiciste.json").json()
)}

function _8(md){return(
md`- GENERALE entre 1800-1990 ("publiciste")`
)}

function _unigrams_publiciste_data_g(FileAttachment){return(
FileAttachment("unigrams_publiciste.json")
    .json()
    .then(json => json.data)
)}

function _10(md){return(
md`- avant 1880 ("publiciste")`
)}

function _unigrams_publiciste_data_a(unigrams_publiciste_data_g){return(
unigrams_publiciste_data_g.map(series => ({
    ...series,
    items: series.items.filter(d => +d.date < 1881)
  }))
)}

function _12(md){return(
md`- entre 1870-1990 ("publiciste")`
)}

function _unigrams_publiciste_data(unigrams_publiciste_data_g){return(
unigrams_publiciste_data_g.map(series => ({
    ...series,
  items: series.items.filter(d => +d.date >= 1870 && +d.date <= 1990)
  }))
)}

function _14(md){return(
md`- entre 1800-1990 ("publiciste") in **GDL et JDG**:`
)}

function _unigrams_publiciste_jdg_gdl(FileAttachment){return(
FileAttachment("unigrams_publiciste_JDG_GDL.json").json()
)}

function _unigrams_publiciste_opinion(FileAttachment){return(
FileAttachment("unigrams_publiciste_JDG_GDL.json")
    .json()
    .then(json => json.data)
)}

function _unigrams_publiciste_opinion_data(unigrams_publiciste_opinion){return(
unigrams_publiciste_opinion.map(series => ({
    ...series,
  items: series.items.filter(d => +d.date >= 1870 && +d.date <= 1990)
  }))
)}

function _18(md){return(
md`- entre 1800-1990 ("publiciste") in **Express et l'Impartial**:
`
)}

function _unigrams_publiciste_express_impartial(FileAttachment){return(
FileAttachment("unigrams_publiciste_Express_Impartial.json").json()
)}

function _unigrams_publiciste_information(FileAttachment){return(
FileAttachment("unigrams_publiciste_Express_Impartial.json")
    .json()
    .then(json => json.data)
)}

function _unigrams_publiciste_information_data(unigrams_publiciste_information){return(
unigrams_publiciste_information.map(series => ({
    ...series,
  items: series.items.filter(d => +d.date >= 1870 && +d.date <= 1990)
  }))
)}

function _22(md){return(
md`- **"chroniqueur"**  1800 - 1990`
)}

function _unigrams_chroniqueur1800_1990(FileAttachment){return(
FileAttachment("unigrams_chroniqueur1800_1990.json").json()
)}

function _unigrams_chroniqueur_1800_1990_data(FileAttachment){return(
FileAttachment("unigrams_chroniqueur1800_1990.json")
    .json()
    .then(json => json.data)
)}

function _25(Plot,unigrams_data,unigrams_publiciste_data){return(
Plot.plot({
  width: 1600,
  height: 800,
  aspectRatio: 1,

  style: {
    fontSize: "14px"
  },

  marginLeft: 65,
  marginRight: 25,
  marginTop: 25,
  marginBottom: 50,

  x: {
    label: "Années",
    labelOffset: 38,
    type: "time",
    tickFormat: "%Y"
  },

  y: {
    label: "Fréquence du mot (PPM)",
    labelOffset: 38,
    grid: true,
    ticks: 20,
    domain: [0, 270]
  },

  color: {
    legend: true,
    label: "Unigrammes",
    domain: [
      "journaliste",
      "rédacteur",
      "chroniqueur",
      "rédactrice",
      "correspondant",
      "reporter",
      "publiciste"
    ],
    range: [
      "blue",
      "#FF5500",
      "green",
      "#E31A1C",
      "purple",
      "brown",
      "#808080"
    ]
  },

  marks: [
    Plot.ruleY([0]),

    Plot.lineY(unigrams_data[0].items, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "blue"
    }),

    Plot.lineY(unigrams_data[1].items, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "#FF5500"
    }),

    Plot.lineY(unigrams_data[2].items, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "green"
    }),

    Plot.lineY(unigrams_data[3].items, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "#E31A1C"
    }),

    Plot.lineY(unigrams_data[4].items, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "purple"
    }),

    Plot.lineY(unigrams_data[5].items, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "brown"
    }),

    Plot.lineY(unigrams_publiciste_data[0].items, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "#808080"
    })
  ]
})
)}

function _26(Plot,unigrams_data_a){return(
Plot.plot({
  width: 1600,
  height: 800,
  aspectRatio: 1,

  style: {
    fontSize: "13px"
  },

  marginLeft: 65,
  marginRight: 25,
  marginTop: 25,
  marginBottom: 50,

  x: {
    label: "Années",
    labelOffset: 38,
    type: "time",
    tickFormat: "%Y"
  },

  y: {
    label: "Fréquence du mot (PPM)",
    labelOffset: 38,
    grid: true,
    ticks: 20,
    domain: [0, 370]
  },

  color: {
    legend: true,
    label: "Unigrammes",
    domain: ["journaliste", "rédacteur"],
    range: ["blue", "#FF5500"]
  },

  marks: [
    Plot.ruleY([0]),

    Plot.lineY(unigrams_data_a[0].items, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "blue"
    }),

    Plot.lineY(unigrams_data_a[1].items, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "#FF5500"
    })
  ]
})
)}

function _unigramsgdl_jdg(FileAttachment){return(
FileAttachment("unigramsGDL_JDG.json").json().then(json => json.data)
)}

function _unigrams_expressimpartial(FileAttachment){return(
FileAttachment("unigrams_ExpressImpartial@1.json").json().then(json => json.data)
)}

function _29(md){return(
md`_fréquence journaliste dans les journaux d'opinion et d'information_`
)}

function _30(Plot,unigrams_expressimpartial,unigramsgdl_jdg){return(
Plot.plot({
  width: 2000,
  height: 1200,
  aspectRatio: 1,
  x: {label: "Année", 
      type: "time", 
      tickFormat: "%Y",
     domain: [new Date("1870-01-01"), new Date("1990-12-31")]
      },
  y: {label: "Fréquence mot (PPM)", 
      grid: true, 
      ticks: 20, 
      domain: [0, 110]  },
  color: {
    legend: true,
    label: "Unigrammes",
    domain: ["GDL et JDG","Express et l'Impartial",],
    range:  ["blue","lightblue"]
  },
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(unigrams_expressimpartial[0].items, {x: "date", y: "ppm", strokeWidth: 3, stroke: "lightblue"}), //journaliste
    Plot.lineY(unigramsgdl_jdg[0].items, {x: "date", y: "ppm", strokeWidth: 3, stroke: "blue"}),
  ]
})
)}

function _31(Plot,unigramsgdl_jdg,unigrams_expressimpartial){return(
Plot.plot({
  width: 1200,
  height: 500,
  x: {
    label: "Année",
    type: "time",
    tickFormat: "%Y",
    domain: [
      new Date(Date.UTC(1870, 0, 1)),
      new Date(Date.UTC(1990, 11, 31))
    ]
  },

  y: {
    label: "Fréquence du mot (PPM)",
    grid: true,
    ticks: 20,
    domain: [0, 110]
  },

  color: {
    legend: true,
    label: "Type de presse",
    domain: [
      "Presse d’opinion",
      "Presse d’information"
    ],
    range: ["#2121CA", "#439BFF"]
  },

  marks: [
    Plot.ruleY([0]),

    (() => {
      const opMap = new Map(
        unigramsgdl_jdg[0].items.map(d => [+d.date, +d.ppm])
      );

      const infoMap = new Map(
        unigrams_expressimpartial[0].items.map(d => [+d.date, +d.ppm])
      );

      const comparison = Array.from(
        new Set([...opMap.keys(), ...infoMap.keys()])
      )
        .sort((a, b) => a - b)
        .filter(year => year >= 1870 && year <= 1990)
        .map(year => ({
          date: new Date(Date.UTC(year, 0, 1)),
          op: opMap.get(year),
          info: infoMap.get(year)
        }))
        .filter(d =>
          Number.isFinite(d.op) &&
          Number.isFinite(d.info)
        );

      const lines = comparison.flatMap(d => [
        {
          date: d.date,
          ppm: d.op,
          serie: "Presse d’opinion"
        },
        {
          date: d.date,
          ppm: d.info,
          serie: "Presse d’information"
        }
      ]);

      const areaData = [];
      let segment = 0;

      for (let i = 0; i < comparison.length; i++) {
        const current = comparison[i];

        const currentWinner =
          current.op >= current.info
            ? "Presse d’opinion"
            : "Presse d’information";

        if (i === 0) {
          areaData.push({
            ...current,
            winner: currentWinner,
            segment
          });

          continue;
        }

        const previous = comparison[i - 1];

        const previousWinner =
          previous.op >= previous.info
            ? "Presse d’opinion"
            : "Presse d’information";

        if (currentWinner !== previousWinner) {
          const diffPrevious = previous.op - previous.info;
          const diffCurrent = current.op - current.info;

          const t =
            diffPrevious /
            (diffPrevious - diffCurrent);

          const crossingDate = new Date(
            previous.date.getTime() +
            t *
              (
                current.date.getTime() -
                previous.date.getTime()
              )
          );

          const crossingOp =
            previous.op +
            t * (current.op - previous.op);

          const crossingInfo =
            previous.info +
            t * (current.info - previous.info);

          areaData.push({
            date: crossingDate,
            op: crossingOp,
            info: crossingInfo,
            winner: previousWinner,
            segment
          });

          segment += 1;

          areaData.push({
            date: crossingDate,
            op: crossingOp,
            info: crossingInfo,
            winner: currentWinner,
            segment
          });
        }

        areaData.push({
          ...current,
          winner: currentWinner,
          segment
        });
      }

      return [
        Plot.areaY(areaData, {
          x: "date",
          y1: "op",
          y2: "info",
          z: "segment",
          fill: "winner",
          fillOpacity: 0.22
        }),

        Plot.lineY(lines, {
          x: "date",
          y: "ppm",
          z: "serie",
          stroke: "serie",
          strokeWidth: 3
        })
      ];
    })()
  ].flat()
})
)}

function _32(md){return(
md`_fréquence chroniqueur dans les journaux d'opinion et d'information_`
)}

function _33(Plot,unigrams_expressimpartial,unigramsgdl_jdg){return(
Plot.plot({
  width: 2000,
  height: 1200,
  aspectRatio: 1,
  x: {label: "Année", 
      type: "time", 
      tickFormat: "%Y",
     domain: [new Date("1800-01-01"), new Date("1990-12-31")] // per mettere solo dal 1880 al 1990
      },
  y: {label: "Fréquence mot (PPM)", 
      grid: true, 
      ticks: 20, 
      domain: [0, 17]  },
  color: {
    legend: true,
    label: "Unigrammes",
    domain: ["GDL et JDG","Express et l'Impartial",],
    range:  ["green","lightgreen"]
  },
  marks: [
    Plot.ruleY([0]), 

    Plot.lineY(unigrams_expressimpartial[3].items, {x: "date", y: "ppm", strokeWidth: 3, stroke: "green"}), // chroniqueur
    Plot.lineY(unigramsgdl_jdg[3].items, {x: "date", y: "ppm", strokeWidth: 3, stroke: "lightgreen"}),
  ]
})
)}

function _34(Plot,unigrams_expressimpartial,unigramsgdl_jdg){return(
Plot.plot({
  width: 1200,
  height: 500,

  x: {
    label: "Année",
    type: "time",
    tickFormat: "%Y",
    domain: [
      new Date(Date.UTC(1870, 0, 1)),
      new Date(Date.UTC(1990, 11, 31))
    ]
  },

  y: {
    label: "Fréquence du mot (PPM)",
    grid: true,
    ticks: 20,
    domain: [0, 17]
  },

  color: {
    legend: true,
    label: "Type de presse",
    domain: ["Express et l'Impartial", "GDL et JDG"],
    range: ["green", "lightgreen"],
    tickFormat: d =>
      d === "GDL et JDG"
        ? "Presse d’opinion"
        : "Presse d’information"
  },

  marks: [
    Plot.ruleY([0]),

    (() => {
      const infoMap = new Map(
        unigrams_expressimpartial[3].items.map(d => [+d.date, +d.ppm])
      );

      const opMap = new Map(
        unigramsgdl_jdg[3].items.map(d => [+d.date, +d.ppm])
      );

      const comparison = Array.from(
        new Set([...infoMap.keys(), ...opMap.keys()])
      )
        .sort((a, b) => a - b)
        .filter(year => year >= 1870 && year <= 1990)
        .map(year => ({
          date: new Date(Date.UTC(year, 0, 1)),
          info: infoMap.get(year),
          op: opMap.get(year)
        }))
        .filter(d =>
          Number.isFinite(d.info) &&
          Number.isFinite(d.op)
        );

      const lines = comparison.flatMap(d => [
        {
          date: d.date,
          ppm: d.info,
          serie: "Express et l'Impartial"
        },
        {
          date: d.date,
          ppm: d.op,
          serie: "GDL et JDG"
        }
      ]);

      const areaData = [];
      let segment = 0;

      for (let i = 0; i < comparison.length; i++) {
        const current = comparison[i];

        const currentWinner =
          current.op >= current.info
            ? "GDL et JDG"
            : "Express et l'Impartial";

        if (i === 0) {
          areaData.push({
            ...current,
            winner: currentWinner,
            segment
          });
          continue;
        }

        const previous = comparison[i - 1];

        const previousWinner =
          previous.op >= previous.info
            ? "GDL et JDG"
            : "Express et l'Impartial";

        if (currentWinner !== previousWinner) {
          const diffPrevious = previous.op - previous.info;
          const diffCurrent = current.op - current.info;

          const t = diffPrevious / (diffPrevious - diffCurrent);

          const crossingDate = new Date(
            previous.date.getTime() +
            t * (current.date.getTime() - previous.date.getTime())
          );

          const crossingOp =
            previous.op + t * (current.op - previous.op);

          const crossingInfo =
            previous.info + t * (current.info - previous.info);

          areaData.push({
            date: crossingDate,
            op: crossingOp,
            info: crossingInfo,
            winner: previousWinner,
            segment
          });

          segment += 1;

          areaData.push({
            date: crossingDate,
            op: crossingOp,
            info: crossingInfo,
            winner: currentWinner,
            segment
          });
        }

        areaData.push({
          ...current,
          winner: currentWinner,
          segment
        });
      }

      return [
        Plot.areaY(areaData, {
          x: "date",
          y1: "info",
          y2: "op",
          z: "segment",
          fill: "winner",
          fillOpacity: 0.22
        }),

        Plot.lineY(lines, {
          x: "date",
          y: "ppm",
          z: "serie",
          stroke: "serie",
          strokeWidth: 3
        })
      ];
    })()
  ].flat()
})
)}

function _35(md){return(
md`_fréquence publiciste dans les journaux d'opinion et d'information_`
)}

function _36(Plot,unigrams_publiciste_opinion,unigrams_publiciste_information){return(
Plot.plot({
  width: 1600,
  height: 800,
  aspectRatio: 1,
  x: {label: "Année", 
      type: "time", 
      tickFormat: "%Y"},
  y: {label: "Fréquence mot (PPM)", 
      grid: true, 
      ticks: 20, 
      domain: [0, 20]  },
  color: {
    legend: true,
    label: "Unigrammes",
    domain: ["JDG et GDL", "Express et l'Impartial"],
    range:  ["#906666", "#E9CACA"],
  },
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(unigrams_publiciste_opinion[0].items, {x: "date", y: "ppm", strokeWidth: 3, stroke: "#906666"}),
    Plot.lineY(unigrams_publiciste_information[0].items, {x: "date", y: "ppm", strokeWidth: 3, stroke: "#E9CACA"})
  ]
})
)}

function _37(Plot,unigrams_publiciste_opinion,unigrams_publiciste_information){return(
Plot.plot({
  width: 1200,
  height: 500,

  x: {
    label: "Année",
    type: "time",
    tickFormat: "%Y",
    domain: [
      new Date(Date.UTC(1870, 0, 1)),
      new Date(Date.UTC(1990, 11, 31))
    ]
  },

  y: {
    label: "Fréquence du mot (PPM)",
    grid: true,
    ticks: 20,
    domain: [0, 10]
  },

  color: {
    legend: true,
    label: "Type de presse",
    domain: [
      "JDG et GDL",
      "Express et l'Impartial"
    ],
    range: ["#404040", "#C0AFBB"],
    tickFormat: d =>
      d === "JDG et GDL"
        ? "Presse d’opinion"
        : "Presse d’information"
  },

  marks: [
    Plot.ruleY([0]),

    (() => {
      const impMap = new Map(
        unigrams_publiciste_opinion[0].items.map(d => [+d.date, +d.ppm])
      );

      const galMap = new Map(
        unigrams_publiciste_information[0].items.map(d => [+d.date, +d.ppm])
      );

      const comparison = Array.from(
        new Set([...impMap.keys(), ...galMap.keys()])
      )
        .sort((a, b) => a - b)
        .filter(year => year >= 1870 && year <= 1990)
        .map(year => ({
          date: new Date(Date.UTC(year, 0, 1)),
          imp: impMap.get(year),
          gal: galMap.get(year)
        }))
        .filter(d =>
          Number.isFinite(d.imp) &&
          Number.isFinite(d.gal)
        );

      const lines = comparison.flatMap(d => [
        {
          date: d.date,
          ppm: d.imp,
          serie: "JDG et GDL"
        },
        {
          date: d.date,
          ppm: d.gal,
          serie: "Express et l'Impartial"
        }
      ]);

      const areaData = [];
      let segment = 0;

      for (let i = 0; i < comparison.length; i++) {
        const current = comparison[i];

        const currentWinner =
          current.imp >= current.gal
            ? "JDG et GDL"
            : "Express et l'Impartial";

        if (i === 0) {
          areaData.push({
            ...current,
            winner: currentWinner,
            segment
          });
          continue;
        }

        const previous = comparison[i - 1];

        const previousWinner =
          previous.imp >= previous.gal
            ? "JDG et GDL"
            : "Express et l'Impartial";

        if (currentWinner !== previousWinner) {
          const diffPrevious = previous.imp - previous.gal;
          const diffCurrent = current.imp - current.gal;

          const t = diffPrevious / (diffPrevious - diffCurrent);

          const crossingDate = new Date(
            previous.date.getTime() +
              t * (current.date.getTime() - previous.date.getTime())
          );

          const crossingImp =
            previous.imp + t * (current.imp - previous.imp);

          const crossingGal =
            previous.gal + t * (current.gal - previous.gal);

          areaData.push({
            date: crossingDate,
            imp: crossingImp,
            gal: crossingGal,
            winner: previousWinner,
            segment
          });

          segment += 1;

          areaData.push({
            date: crossingDate,
            imp: crossingImp,
            gal: crossingGal,
            winner: currentWinner,
            segment
          });
        }

        areaData.push({
          ...current,
          winner: currentWinner,
          segment
        });
      }

      return [
        Plot.areaY(areaData, {
          x: "date",
          y1: "imp",
          y2: "gal",
          z: "segment",
          fill: "winner",
          fillOpacity: 0.22
        }),

        Plot.lineY(lines, {
          x: "date",
          y: "ppm",
          z: "serie",
          stroke: "serie",
          strokeWidth: 3
        })
      ];
    })()
  ].flat()
})
)}

function _38(md){return(
md`_P. S. : Ligne "trend-moyenne" pour graphiques_
- _code générale --> ajouter un array pour la ligne souhaitée + code de la fonction linéaire + enfin, l'ajouter au graphique sous forme de ligne_`
)}

function _movingAverage(d3){return(
(data, window = 5) =>
  data.map((d, i) => ({
    date: d.date,
    ppm: d3.mean(
      data.slice(
        Math.max(0, i - window),
        Math.min(data.length, i + window + 1)
      ),
      e => e.ppm
    )
  }))
)}

function _impressoClean(unigrams_data,d3){return(
[...unigrams_data[0].items]
  .map(d => ({
    date: d.date instanceof Date ? d.date : new Date(d.date),
    ppm: +d.ppm
  }))
  .sort((a, b) => d3.ascending(a.date, b.date))
)}

function _trendJImpresso(movingAverage,impressoClean){return(
movingAverage(impressoClean, 5)
)}

function _42(md){return(
md`_journaliste:_`
)}

function _43(Plot,unigrams_data,trendJImpresso){return(
Plot.plot({
  width: 1600,
  height: 900,

  marginLeft: 35,
  marginBottom: 60,
  
  style: {
    fontSize: "13.5px"
  },

  x: {
    label: "Années",
    labelOffset: 35,
    type: "time",
    tickFormat: "%Y",
    domain: [new Date("1870-01-01"), new Date("1990-12-31")]
  },

  y: {
    label: "Fréquence mot (PPM)",
    labelOffset: 30,
    grid: true,
    ticks: 20,
    domain: [0, 100]
  },

  color: {
    legend: true,
    label: "Unigrammes",
    range: ["blue"]
  },

  marks: [
    Plot.ruleY([0]),

    Plot.lineY(unigrams_data[0].items, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "blue"
    }),

    Plot.lineY(trendJImpresso, {
      x: "date",
      y: "ppm",
      stroke: "blue",
      strokeWidth: 2,
      strokeDasharray: "6,4",
      opacity: 0.9
    })
  ]
})
)}

function _44(md){return(
md`_gerer les dates : _`
)}

function _toDateSeries(){return(
items =>
  items
    .map(d => ({
      date: d.date instanceof Date
        ? d.date
        : new Date(Date.UTC(+d.date, 0, 1)),
      ppm: +d.ppm
    }))
    .filter(d =>
      d.date >= new Date(Date.UTC(1870, 0, 1)) &&
      d.date <= new Date(Date.UTC(1990, 11, 31))
    )
    .sort((a, b) => a.date - b.date)
)}

function _chroniqueur(toDateSeries,unigrams_chroniqueur_1800_1990_data){return(
toDateSeries(unigrams_chroniqueur_1800_1990_data[0].items)
)}

function _reporter(toDateSeries,unigrams_data){return(
toDateSeries(unigrams_data[5].items)
)}

function _publiciste(toDateSeries,unigrams_publiciste_data_g){return(
toDateSeries(unigrams_publiciste_data_g[0].items)
)}

function _trend_chroniqueur(movingAverage,chroniqueur){return(
movingAverage(chroniqueur, 5)
)}

function _trend_publiciste(movingAverage,publiciste){return(
movingAverage(publiciste, 5)
)}

function _trend_reporter(movingAverage,reporter){return(
movingAverage(reporter, 5)
)}

function _52(Plot,chroniqueur,publiciste,reporter,trend_chroniqueur,trend_publiciste,trend_reporter){return(
Plot.plot({
  width: 1600,
  height: 800,
  aspectRatio: 1,

  style: {
    fontSize: "14px"
  },

  marginLeft: 65,
  marginRight: 25,
  marginTop: 25,
  marginBottom: 50,

  x: {
    label: "Années",
    labelOffset: 38,
    type: "time",
    tickFormat: "%Y",
    domain: [new Date("1870-01-01"), new Date("1990-12-31")]
  },

  y: {
    label: "Fréquence du mot (PPM)",
    labelOffset: 38,
    grid: true,
    ticks: 20
  },

  color: {
    legend: true,
    label: "Unigrammes",
    domain: ["chroniqueur", "publiciste", "reporter"],
    range: ["green", "#A0A0A0", "brown"]
  },

  marks: [
    Plot.ruleY([0]),

    Plot.lineY(chroniqueur, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "green"
    }),

    Plot.lineY(publiciste, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "#A0A0A0"
    }),

    Plot.lineY(reporter, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "brown"
    }),

    Plot.lineY(trend_chroniqueur, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "green",
      strokeDasharray: "6,8"
    }),

    Plot.lineY(trend_publiciste, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "#A0A0A0",
      strokeDasharray: "6,8"
    }),

    Plot.lineY(trend_reporter, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "brown",
      strokeDasharray: "6,8"
    })
  ]
})
)}

function _53(md){return(
md`### REPORTER avec pourcentages polysemie
- pourcentages issus d'une lecture manuelle de 300 occurrences choisies au hasard pour chaque période`
)}

function _periods(){return(
[
  {start: new Date("1870-01-01"), end: new Date("1900-12-31"), p: 0.15,  period: "1870–1900"},
  {start: new Date("1901-01-01"), end: new Date("1920-12-31"), p: 0.207, period: "1901–1920"},
  {start: new Date("1921-01-01"), end: new Date("1940-12-31"), p: 0.133, period: "1921–1940"},
  {start: new Date("1941-01-01"), end: new Date("1950-12-31"), p: 0.203, period: "1941–1950"},
  {start: new Date("1951-01-01"), end: new Date("1960-12-31"), p: 0.263, period: "1951–1960"},
  {start: new Date("1961-01-01"), end: new Date("1970-12-31"), p: 0.19,  period: "1961–1970"}
]
)}

function _pForDate(periods){return(
(date) => {
  const t = +date;
  const band = periods.find(b => +b.start <= t && t <= +b.end);
  return band ? band : null;
}
)}

function _reporterSeries(reporter){return(
reporter.map(d => ({...d, date: new Date(d.date)}))
)}

function _correctedByPeriod(periods,reporterSeries){return(
periods.flatMap((per, i) =>
  reporterSeries
    .filter(d => d.date >= per.start && d.date <= per.end)
    .map(d => ({
      ...d,
      ppm_corr: d.ppm * per.p,
      period: i
    }))
)
)}

function _reporterBars(reporterSeries,pForDate){return(
reporterSeries
  .map(d => {
    const band = pForDate(d.date);
    if (!band) return null;
    return {
      ...d,
      period: band.period,
      p: band.p,
      ppm_corr: d.ppm * band.p
    };
  })
  .filter(Boolean)
)}

function _bands(){return(
[
  {start: new Date("1870-01-01"), end: new Date("1900-12-31"), p: 0.15,  label: "15%",   band: "A"},
  {start: new Date("1901-01-01"), end: new Date("1920-12-31"), p: 0.207, label: "20.7%", band: "B"},
  {start: new Date("1921-01-01"), end: new Date("1940-12-31"), p: 0.133, label: "13.3%", band: "A"},
  {start: new Date("1941-01-01"), end: new Date("1950-12-31"), p: 0.203, label: "20.3%", band: "B"},
  {start: new Date("1951-01-01"), end: new Date("1960-12-31"), p: 0.263, label: "26.3%", band: "A"},
  {start: new Date("1961-01-01"), end: new Date("1970-12-31"), p: 0.19,  label: "19%",   band: "B"}
]
)}

function _labels(periods){return(
periods.map(per => ({
  x: new Date((+per.start + +per.end) / 2),
  pLabel: `${Math.round(per.p * 1000) / 10}%`
}))
)}

function _yMax(reporterSeries,correctedByPeriod,chroniqueur,publiciste){return(
Math.max(
  ...reporterSeries.map(d => +d.ppm),
  ...correctedByPeriod.map(d => +d.ppm_corr),
  ...chroniqueur.map(d => +d.ppm),
  ...publiciste.map(d => +d.ppm)
) * 1.05
)}

function _areaMarks(periods,reporterSeries,Plot,colors){return(
periods.map((per, i) => {
  const seg = reporterSeries
    .filter(d => d.date >= per.start && d.date <= per.end)
    .map(d => ({date: d.date, ppm_corr: (+d.ppm) * per.p}));
  return Plot.areaY(seg, {x: "date", y: "ppm_corr", fill: colors[i], fillOpacity: 0.20});
})
)}

function _boundaries(){return(
[
  new Date("1900-01-01"),
  new Date("1920-01-01"),
  new Date("1940-01-01"),
  new Date("1950-01-01"),
  new Date("1960-01-01"),
  new Date("1970-01-01")
]
)}

function _colors(){return(
[
  "#8dd3c7",
  "#CDCD51",
  "#bebada",
  "#fb8072",
  "#80b1d3",
  "#fdb462"
]
)}

function _corrLineMarks(periods,reporterSeries,Plot,colors){return(
periods.map((per, i) => {
  const seg = reporterSeries
    .filter(d => d.date >= per.start && d.date <= per.end)
    .map(d => ({date: d.date, ppm_corr: (+d.ppm) * per.p}));
  return Plot.lineY(seg, {x: "date", y: "ppm_corr", stroke: colors[i], strokeWidth: 3, strokeDasharray: "6,6"});
})
)}

function _66(Plot,periods,colors,yMax,boundaries,areaMarks,reporterSeries,corrLineMarks){return(
Plot.plot({
  color: {
    legend: false,
    domain: ["reporter", ...periods.map(p => p.period)],
    range: ["brown", ...colors]
  },

  width: 1600,
  height: 800,

  style: {
    fontSize: "14px"
  },

  marginLeft: 65,
  marginRight: 25,
  marginTop: 25,
  marginBottom: 50,

  x: {
    type: "time",
    tickFormat: "%Y",
    domain: [new Date("1870-01-01"), new Date("1990-12-31")],
    label: "Années",
    labelOffset: 38
  },

  y: {
    label: "Fréquence de « reporter » (PPM)",
    labelOffset: 38,
    grid: true,
    ticks: 20,
    domain: [0, yMax]
  },

  marks: [
    Plot.ruleY([0]),

    Plot.ruleX(boundaries, {
      strokeOpacity: 0.5
    }),

    ...areaMarks,

    Plot.lineY(reporterSeries, {
      x: "date",
      y: "ppm",
      stroke: "brown",
      strokeWidth: 3
    }),

    ...corrLineMarks,

    Plot.text(
      periods.map(per => ({
        x: new Date((+per.start + +per.end) / 2),
        y: yMax * 0.05,
        label: `${Math.round(per.p * 1000) / 10}%`
      })),
      {
        x: "x",
        y: "y",
        text: "label",
        fill: "#444",
        fontSize: 15
      }
    )
  ]
})
)}

function _67(md){return(
md`_Uniquement à titre comparatif_:`
)}

function _68(Plot,areaMarks,chroniqueur,publiciste,reporter,trend_chroniqueur,trend_publiciste,trend_reporter,corrLineMarks){return(
Plot.plot({
  width: 1600,
  height: 800,
  title: "Fréquence 'chroniqueur', 'publiciste', 'reporter'",
  aspectRatio: 1,
  color: {
  legend: true,
  label: "Unigrammes",
  domain: ["chroniqueur","publiciste","reporter"],
  range: ["green","#D4769B","brown"]
},
  x: {
    label: "Années",
    type: "time",
    tickFormat: "%Y",
    domain: [new Date("1870-01-01"), new Date("1990-12-31")]
  },
  y: { label: "Fréquence mot (PPM)", grid: true, ticks: 20 },
  marks: [
    Plot.ruleY([0]),

    // area sotto la linea corretta (solo 1870–1970)
    ...areaMarks,

    // serie originali
    Plot.lineY(chroniqueur, { x: "date", y: "ppm", strokeWidth: 3, stroke: "green" }),
    Plot.lineY(publiciste,  { x: "date", y: "ppm", strokeWidth: 3, stroke: "#D4769B" }),
    Plot.lineY(reporter,    { x: "date", y: "ppm", strokeWidth: 3, stroke: "brown" }),

    // trend originali (tratteggiati)
    Plot.lineY(trend_chroniqueur, { x: "date", y: "ppm", strokeWidth: 3, stroke: "green", strokeDasharray: "6,8" }),
    Plot.lineY(trend_publiciste,  { x: "date", y: "ppm", strokeWidth: 3, stroke: "#D4769B", strokeDasharray: "6,8" }),
    Plot.lineY(trend_reporter,    { x: "date", y: "ppm", strokeWidth: 3, stroke: "brown", strokeDasharray: "6,8" }),

    // linea reporter corretta (tratteggiata, colorata per periodo)
    ...corrLineMarks
  ]
})
)}

function _periodsReporterCompare(){return(
[
  {period: "1870–1900", start: new Date("1870-01-01"), end: new Date("1900-12-31"), opinion: 0.150, info: 0.147},
  {period: "1901–1920", start: new Date("1901-01-01"), end: new Date("1920-12-31"), opinion: 0.157, info: 0.247},
  {period: "1921–1940", start: new Date("1921-01-01"), end: new Date("1940-12-31"), opinion: 0.103, info: 0.180},
  {period: "1941–1950", start: new Date("1941-01-01"), end: new Date("1950-12-31"), opinion: 0.107, info: 0.307},
  {period: "1951–1960", start: new Date("1951-01-01"), end: new Date("1960-12-31"), opinion: 0.187, info: 0.427},
  {period: "1961–1970", start: new Date("1961-01-01"), end: new Date("1970-12-31"), opinion: 0.173, info: 0.257}
]
)}

function _colorsReporterCompare(){return(
["#8dd3c7", "#CDCD51", "#bebada", "#fb8072", "#80b1d3", "#fdb462"]
)}

function _pOpinionForDate(periodsReporterCompare){return(
date => {
  const d = +date
  const per = periodsReporterCompare.find(p => d >= +p.start && d <= +p.end)
  return per ? per.opinion : null
}
)}

function _pInfoForDate(periodsReporterCompare){return(
date => {
  const d = +date
  const per = periodsReporterCompare.find(p => d >= +p.start && d <= +p.end)
  return per ? per.info : null
}
)}

function _opinionSeries(unigramsgdl_jdg){return(
unigramsgdl_jdg[5].items.map(d => ({
  date: new Date(d.date),
  ppm: +d.ppm
}))
)}

function _infoSeries(unigrams_expressimpartial){return(
unigrams_expressimpartial[5].items.map(d => ({
  ...d,
  date: new Date(d.date),
  ppm: +d.ppm
}))
)}

function _correctedOpinion(opinionSeries,pOpinionForDate){return(
opinionSeries
  .map(d => {
    const p = pOpinionForDate(d.date)
    return p == null ? null : {date: d.date, corrected: d.ppm * p}
  })
  .filter(d => d !== null)
)}

function _correctedInfo(infoSeries,pInfoForDate){return(
infoSeries
  .map(d => {
    const p = pInfoForDate(d.date)
    return p == null ? null : {date: d.date, corrected: d.ppm * p}
  })
  .filter(d => d !== null)
)}

function _yMaxReporterCompare(){return(
70
)}

function _boundariesReporterCompare(){return(
[
  new Date("1900-01-01"),
  new Date("1920-01-01"),
  new Date("1940-01-01"),
  new Date("1950-01-01"),
  new Date("1960-01-01"),
  new Date("1970-01-01")
]
)}

function _areaMarksReporterCompare(periodsReporterCompare,Plot,yMaxReporterCompare,colorsReporterCompare){return(
periodsReporterCompare.map((per, i) =>
  Plot.rect(
    [{x1: per.start, x2: per.end, y1: 0, y2: yMaxReporterCompare * 0.10}],
    {
      x1: "x1",
      x2: "x2",
      y1: "y1",
      y2: "y2",
      fill: colorsReporterCompare[i],
      fillOpacity: 0.35
    }
  )
)
)}

function _corrOpinionMarks(periodsReporterCompare,Plot,correctedOpinion){return(
periodsReporterCompare.map(per =>
  Plot.lineY(
    correctedOpinion.filter(d => +d.date >= +per.start && +d.date <= +per.end),
    {
      x: "date",
      y: "corrected",
      stroke: "brown",
      strokeWidth: 2.5,
      strokeDasharray: "6,6"
    }
  )
)
)}

function _corrInfoMarks(periodsReporterCompare,Plot,correctedInfo){return(
periodsReporterCompare.map(per =>
  Plot.lineY(
    correctedInfo.filter(d => +d.date >= +per.start && +d.date <= +per.end),
    {
      x: "date",
      y: "corrected",
      stroke: "#CC6600",
      strokeWidth: 2.5,
      strokeDasharray: "6,6"
    }
  )
)
)}

function _labelsReporterCompare(periodsReporterCompare,yMaxReporterCompare){return(
periodsReporterCompare.flatMap(per => {
  const mid = new Date((+per.start + +per.end) / 2)
  return [
    {x: mid, y: yMaxReporterCompare * 0.085, label: `OP ${(per.opinion * 100).toFixed(1)}%`, c: "#CC6600"},
    {x: mid, y: yMaxReporterCompare * 0.045, label: `INFO ${(per.info * 100).toFixed(1)}%`, c: "brown"}
  ]
})
)}

function _yMaxInfo(){return(
70
)}

function _labelsInfo(periodsReporterCompare,yMaxInfo,colorsReporterCompare){return(
periodsReporterCompare.map((per, i) => ({
  x: new Date((+per.start + +per.end) / 2),
  y: yMaxInfo * 0.92,
  label: `${(per.info * 100).toFixed(1)}%`,
  c: colorsReporterCompare[i]
}))
)}

function _85(Plot,yMaxInfo,boundariesReporterCompare,periodsReporterCompare,correctedInfo,colorsReporterCompare,infoSeries,corrInfoMarks,labelsInfo){return(
Plot.plot({
  color: {
    legend: true,
    domain: ["reporter info"],
    range: ["#CC6600"]
  },
  width: 1600,
  height: 800,
  x: {
    type: "time",
    tickFormat: "%Y",
    domain: [new Date("1870-01-01"), new Date("1990-12-31")],
    label: "Années"
  },
  y: {
    label: "Fréquence 'reporter' (PPM)",
    grid: true,
    ticks: 20,
    domain: [0, yMaxInfo]
  },
  marks: [
    Plot.ruleY([0]),
    Plot.ruleX(boundariesReporterCompare, {strokeOpacity: 0.5}),

    ...periodsReporterCompare.map((per, i) =>
      Plot.areaY(
        correctedInfo.filter(d => +d.date >= +per.start && +d.date <= +per.end),
        {
          x: "date",
          y: "corrected",
          y1: 0,
          fill: colorsReporterCompare[i],
          fillOpacity: 0.25
        }
      )
    ),

    Plot.lineY(infoSeries, {
      x: "date",
      y: "ppm",
      stroke: "#CC6600",
      strokeWidth: 3
    }),

    ...corrInfoMarks,

    Plot.text(labelsInfo, {
      x: "x",
      y: "y",
      text: "label",
      fill: d => d.c,
      fontSize: 12,
      fontWeight: "bold"
    })
  ]
})
)}

function _yMaxOpinion(){return(
70
)}

function _labelsOpinion(periodsReporterCompare,yMaxInfo,colorsReporterCompare){return(
periodsReporterCompare.map((per, i) => ({
  x: new Date((+per.start + +per.end) / 2),
  y: yMaxInfo * 0.86,
  label: `${(per.opinion * 100).toFixed(1)}%`,
  c: colorsReporterCompare[i]
}))
)}

function _88(Plot,yMaxOpinion,boundariesReporterCompare,periodsReporterCompare,correctedOpinion,colorsReporterCompare,opinionSeries,corrOpinionMarks,labelsOpinion){return(
Plot.plot({
  color: {
    legend: true,
    domain: ["reporter opinion"],
    range: ["brown"]
  },
  width: 1600,
  height: 800,
  x: {
    type: "time",
    tickFormat: "%Y",
    domain: [new Date("1870-01-01"), new Date("1990-12-31")],
    label: "Années"
  },
  y: {
    label: "Fréquence 'reporter' (PPM)",
    grid: true,
    ticks: 20,
    domain: [0, yMaxOpinion]
  },
  marks: [
    Plot.ruleY([0]),
    Plot.ruleX(boundariesReporterCompare, {strokeOpacity: 0.5}),

...periodsReporterCompare.map((per, i) =>
  Plot.areaY(
    correctedOpinion.filter(d => +d.date >= +per.start && +d.date <= +per.end),
    {
      x: "date",
      y: "corrected",
      y1: 0,
      fill: colorsReporterCompare[i],
      fillOpacity: 0.25
    }
  )
),

    Plot.lineY(opinionSeries, {
      x: "date",
      y: "ppm",
      stroke: "brown",
      strokeWidth: 3
    }),

    ...corrOpinionMarks,

    Plot.text(labelsOpinion, {
      x: "x",
      y: "y",
      text: "label",
      fill: d => d.c,
      fontSize: 12,
      fontWeight: "bold"
    })
  ]
})
)}

function _89(Plot,yMaxInfo,boundariesReporterCompare,periodsReporterCompare,correctedInfo,colorsReporterCompare,correctedOpinion,infoSeries,opinionSeries,corrInfoMarks,corrOpinionMarks,labelsInfo,labelsOpinion){return(
Plot.plot({
  color: {
    legend: true,
    domain: ["Presse d'information", "Presse d'opinion"],
    range: ["#CC6600", "brown"]
  },

  width: 1600,
  height: 900,

  style: {
    fontSize: "14px"
  },

  marginLeft: 65,
  marginRight: 25,
  marginTop: 25,
  marginBottom: 50,

  x: {
    type: "time",
    tickFormat: "%Y",
    domain: [new Date("1870-01-01"), new Date("1990-12-31")],
    label: "Années",
    labelOffset: 38
  },

  y: {
    label: "Fréquence de « reporter » (PPM)",
    labelOffset: 38,
    grid: true,
    ticks: 20,
    domain: [0, yMaxInfo]
  },

  marks: [
    Plot.ruleY([0]),

    Plot.ruleX(boundariesReporterCompare, {
      strokeOpacity: 0.5
    }),

    ...periodsReporterCompare.map((per, i) =>
      Plot.areaY(
        correctedInfo.filter(
          d => +d.date >= +per.start && +d.date <= +per.end
        ),
        {
          x: "date",
          y: "corrected",
          y1: 0,
          fill: colorsReporterCompare[i],
          fillOpacity: 0.20
        }
      )
    ),

    ...periodsReporterCompare.map((per, i) =>
      Plot.areaY(
        correctedOpinion.filter(
          d => +d.date >= +per.start && +d.date <= +per.end
        ),
        {
          x: "date",
          y: "corrected",
          y1: 0,
          fill: colorsReporterCompare[i],
          fillOpacity: 0.20
        }
      )
    ),

    Plot.lineY(infoSeries, {
      x: "date",
      y: "ppm",
      stroke: "#CC6600",
      strokeWidth: 3
    }),

    Plot.lineY(opinionSeries, {
      x: "date",
      y: "ppm",
      stroke: "brown",
      strokeWidth: 3
    }),

    ...corrInfoMarks,

    ...corrOpinionMarks,

    Plot.text(labelsInfo, {
      x: "x",
      y: "y",
      text: "label",
      fill: "#CC6600",
      fontSize: 15,
      fontWeight: "bold"
    }),

    Plot.text(labelsOpinion, {
      x: "x",
      y: "y",
      text: "label",
      fill: "brown",
      fontSize: 15,
      fontWeight: "bold"
    })
  ]
})
)}

function _90(md){return(
md`_rédactrice_`
)}

function _91(Plot,unigrams_data){return(
Plot.plot({
  width: 1600,
  height: 800,
  aspectRatio: 1,
  x: {
    label: "Années",
    type: "time",
    tickFormat: "%Y",
    domain: [
      new Date("1870-01-01"),
      new Date("1990-12-31")
    ]
  },
  y: {
    label: "Fréquence 'rédactrice'(PPM)",
    grid: true,
    ticks: 20
  },
  color: {
    legend: true,
    label: "Corpus",
    //domain: ["rédactrice"],
    range: ["red"]
  },
  marks: [
    Plot.ruleY([0]),

    Plot.lineY(unigrams_data[3].items, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "red"
    }),
  ]
})
)}

function _92(md){return(
md`Fréquence Rédaction et Rédacteur (P.S. : dans les données collectées, nous avons également recensé les occurrences du mot rédaction, mais nous ne l'avons pas utilisées):`
)}

function _unigrams_redaction_information_data(FileAttachment){return(
FileAttachment("unigrams_redaction_information.json").json().then(json => json.data)
)}

function _unigrams_redaction_opinion(FileAttachment){return(
FileAttachment("unigrams_redaction_opinion.json").json()
)}

function _unigrams_redaction_opinion_data(FileAttachment){return(
FileAttachment("unigrams_redaction_opinion.json").json().then(json => json.data)
)}

function _96(md){return(
md`_Dataset: prendre les données rédacteur des journaux d'opinion et d'information _`
)}

function _seriesMap(unigrams_redaction_opinion_data,unigrams_redaction_information_data){return(
{
  "rédacteur (opinion)": {
    items: unigrams_redaction_opinion_data[1].items,
    stroke: "#E66100"
  },
  "rédacteur (information)": {
    items: unigrams_redaction_information_data[1].items,
    stroke: "#2B2B2B"
  }
}
)}

function _98(Plot,seriesMap){return(
Plot.plot({
  width: 1400,
  height: 800,

  x: {
    label: "Année",
    type: "time",
    tickFormat: "%Y",
    domain: [
      new Date(Date.UTC(1870, 0, 1)),
      new Date(Date.UTC(1990, 11, 31))
    ]
  },

  y: {
    label: "Fréquence du mot (PPM)",
    grid: true,
    ticks: 20,
    domain: [0, 150]
  },

  color: {
    legend: true,
    label: "Type de presse",
    domain: [
      "rédacteur (opinion)",
      "rédacteur (information)"
    ],
    range: ["#E66100", "#2B2B2B"],
    tickFormat: d =>
      d === "rédacteur (opinion)"
        ? "Presse d’opinion"
        : "Presse d’information"
  },

  marks: [
    Plot.ruleY([0]),

    (() => {
      const opMap = new Map(
        seriesMap["rédacteur (opinion)"].items.map(d => [
          +d.date,
          +d.ppm
        ])
      );

      const infoMap = new Map(
        seriesMap["rédacteur (information)"].items.map(d => [
          +d.date,
          +d.ppm
        ])
      );

      const comparison = Array.from(
        new Set([...opMap.keys(), ...infoMap.keys()])
      )
        .sort((a, b) => a - b)
        .filter(year => year >= 1870 && year <= 1990)
        .map(year => ({
          date: new Date(Date.UTC(year, 0, 1)),
          op: opMap.get(year),
          info: infoMap.get(year)
        }))
        .filter(d =>
          Number.isFinite(d.op) &&
          Number.isFinite(d.info)
        );

      const lines = comparison.flatMap(d => [
        {
          date: d.date,
          ppm: d.op,
          serie: "rédacteur (opinion)"
        },
        {
          date: d.date,
          ppm: d.info,
          serie: "rédacteur (information)"
        }
      ]);

      const areaData = [];
      let segment = 0;

      for (let i = 0; i < comparison.length; i++) {
        const current = comparison[i];

        const currentWinner =
          current.op >= current.info
            ? "rédacteur (opinion)"
            : "rédacteur (information)";

        if (i === 0) {
          areaData.push({
            ...current,
            winner: currentWinner,
            segment
          });
          continue;
        }

        const previous = comparison[i - 1];

        const previousWinner =
          previous.op >= previous.info
            ? "rédacteur (opinion)"
            : "rédacteur (information)";

        if (currentWinner !== previousWinner) {
          const diffPrevious = previous.op - previous.info;
          const diffCurrent = current.op - current.info;

          const t =
            diffPrevious /
            (diffPrevious - diffCurrent);

          const crossingDate = new Date(
            previous.date.getTime() +
            t * (current.date.getTime() - previous.date.getTime())
          );

          const crossingValue =
            previous.op +
            t * (current.op - previous.op);

          areaData.push({
            date: crossingDate,
            op: crossingValue,
            info: crossingValue,
            winner: previousWinner,
            segment
          });

          segment += 1;

          areaData.push({
            date: crossingDate,
            op: crossingValue,
            info: crossingValue,
            winner: currentWinner,
            segment
          });
        }

        areaData.push({
          ...current,
          winner: currentWinner,
          segment
        });
      }

      return [
        Plot.areaY(areaData, {
          x: "date",
          y1: "op",
          y2: "info",
          z: "segment",
          fill: "winner",
          fillOpacity: 0.22
        }),

        Plot.lineY(lines, {
          x: "date",
          y: "ppm",
          z: "serie",
          stroke: "serie",
          strokeWidth: 4
        })
      ];
    })()
  ].flat()
})
)}

function _99(md){return(
md`### CORRESPONDANT avec pourcentage polysemie
- pourcentages issus d'une lecture manuelle de 300 occurrences choisies au hasard pour chaque période`
)}

function _correspondant_expressimpartial(unigrams_expressimpartial){return(
unigrams_expressimpartial[1].items
    .map(d => ({
      date: new Date(d.date),
      ppm: +d.ppm
    }))
    .sort((a, b) => a.date - b.date)
)}

function _correspondant_gdljdg(unigramsgdl_jdg){return(
unigramsgdl_jdg[1].items
    .map(d => ({
      date: new Date(d.date),
      ppm: +d.ppm
    }))
    .sort((a, b) => a.date - b.date)
)}

function _trend_expressimpartial(movingAverage,correspondant_expressimpartial){return(
movingAverage(correspondant_expressimpartial, 5)
)}

function _trend_gdljdg(movingAverage,correspondant_gdljdg){return(
movingAverage(correspondant_gdljdg, 5)
)}

function _periodsCorrespondantCompare(){return(
[
  {
    period: "1886–1888",
    start: new Date("1886-01-01"),
    end: new Date("1888-12-31"),
    info: 0.5667,
    opinion: 0.7633
  },
  {
    period: "1916–1918",
    start: new Date("1916-01-01"),
    end: new Date("1918-12-31"),
    info: 0.70,
    opinion: 0.7533
  },
  {
    period: "1925–1927",
    start: new Date("1925-01-01"),
    end: new Date("1927-12-31"),
    info: 0.8433,
    opinion: 0.6933
  },
  {
    period: "1940–1942",
    start: new Date("1940-01-01"),
    end: new Date("1942-12-31"),
    info: 0.88,
    opinion: 0.82
  },
  {
    period: "1953–1955",
    start: new Date("1953-01-01"),
    end: new Date("1955-12-31"),
    info: 0.80,
    opinion: 0.7367
  },
  {
    period: "1963–1965",
    start: new Date("1963-01-01"),
    end: new Date("1965-12-31"),
    info: 0.77,
    opinion: 0.70
  },
  {
    period: "1973–1975",
    start: new Date("1973-01-01"),
    end: new Date("1975-12-31"),
    info: 0.7833,
    opinion: 0.4167
  }
]
)}

function _colorsCorrespondantCompare(){return(
[
  "#8dd3c7",
  "#CDCD51",
  "#bebada",
  "#fb8072",
  "#80b1d3",
  "#fdb462",
  "#b3de69"
]
)}

function _pInfoCorrespondantForDate(periodsCorrespondantCompare){return(
date => {
  const d = +date

  const period = periodsCorrespondantCompare.find(
    p => d >= +p.start && d <= +p.end
  )

  return period ? period.info : null
}
)}

function _pOpinionCorrespondantForDate(periodsCorrespondantCompare){return(
date => {
  const d = +date

  const period = periodsCorrespondantCompare.find(
    p => d >= +p.start && d <= +p.end
  )

  return period ? period.opinion : null
}
)}

function _infoCorrespondantSeries(correspondant_expressimpartial){return(
correspondant_expressimpartial.map(d => ({
  ...d,
  date: d.date instanceof Date ? d.date : new Date(d.date),
  ppm: +d.ppm
}))
)}

function _opinionCorrespondantSeries(correspondant_gdljdg){return(
correspondant_gdljdg.map(d => ({
  ...d,
  date: d.date instanceof Date ? d.date : new Date(d.date),
  ppm: +d.ppm
}))
)}

function _correctedInfoCorrespondant(infoCorrespondantSeries,pInfoCorrespondantForDate){return(
infoCorrespondantSeries
  .map(d => {
    const p = pInfoCorrespondantForDate(d.date)

    return p == null
      ? null
      : {
          date: d.date,
          corrected: d.ppm * p
        }
  })
  .filter(d => d !== null)
)}

function _correctedOpinionCorrespondant(opinionCorrespondantSeries,pOpinionCorrespondantForDate){return(
opinionCorrespondantSeries
  .map(d => {
    const p = pOpinionCorrespondantForDate(d.date)

    return p == null
      ? null
      : {
          date: d.date,
          corrected: d.ppm * p
        }
  })
  .filter(d => d !== null)
)}

function _boundariesCorrespondantCompare(){return(
[
  new Date("1886-01-01"),
  new Date("1889-01-01"),

  new Date("1916-01-01"),
  new Date("1919-01-01"),

  new Date("1925-01-01"),
  new Date("1928-01-01"),

  new Date("1940-01-01"),
  new Date("1943-01-01"),

  new Date("1953-01-01"),
  new Date("1956-01-01"),

  new Date("1963-01-01"),
  new Date("1966-01-01"),

  new Date("1973-01-01"),
  new Date("1976-01-01")
]
)}

function _yMaxCorrespondantCompare(infoCorrespondantSeries,opinionCorrespondantSeries){return(
Math.ceil(
  Math.max(
    ...infoCorrespondantSeries.map(d => d.ppm),
    ...opinionCorrespondantSeries.map(d => d.ppm)
  ) / 10
) * 10
)}

function _corrInfoCorrespondantMarks(periodsCorrespondantCompare,Plot,correctedInfoCorrespondant){return(
periodsCorrespondantCompare.map(period =>
  Plot.lineY(
    correctedInfoCorrespondant.filter(
      d => +d.date >= +period.start && +d.date <= +period.end
    ),
    {
      x: "date",
      y: "corrected",
      stroke: "purple",
      strokeWidth: 2.5,
      strokeDasharray: "6,6"
    }
  )
)
)}

function _corrOpinionCorrespondantMarks(periodsCorrespondantCompare,Plot,correctedOpinionCorrespondant){return(
periodsCorrespondantCompare.map(period =>
  Plot.lineY(
    correctedOpinionCorrespondant.filter(
      d => +d.date >= +period.start && +d.date <= +period.end
    ),
    {
      x: "date",
      y: "corrected",
      stroke: "violet",
      strokeWidth: 2.5,
      strokeDasharray: "6,6"
    }
  )
)
)}

function _labelsInfoCorrespondant(periodsCorrespondantCompare,yMaxCorrespondantCompare,colorsCorrespondantCompare){return(
periodsCorrespondantCompare.map((period, i) => ({
  x: new Date((+period.start + +period.end) / 2),
  y: yMaxCorrespondantCompare * 0.94,
  label: `${(period.info * 100).toFixed(2)}%`,
  color: colorsCorrespondantCompare[i]
}))
)}

function _labelsOpinionCorrespondant(periodsCorrespondantCompare,yMaxCorrespondantCompare,colorsCorrespondantCompare){return(
periodsCorrespondantCompare.map((period, i) => ({
  x: new Date((+period.start + +period.end) / 2),
  y: yMaxCorrespondantCompare * 0.88,
  label: `${(period.opinion * 100).toFixed(2)}%`,
  color: colorsCorrespondantCompare[i]
}))
)}

function _118(md){return(
md`_Fréquence 'correspondant' dans les journaux d'opinion et d'information"_`
)}

function _119(Plot,correspondant_expressimpartial,correspondant_gdljdg,trend_expressimpartial,trend_gdljdg){return(
Plot.plot({
  width: 1600,
  height: 800,
  aspectRatio: 1,
  x: {
    label: "Année",
    type: "time",
    tickFormat: "%Y",
    domain: [new Date("1870-01-01"), new Date("1990-12-31")]
  },
  y: {
    label: "Fréquence mot (PPM)",
    grid: true,
    ticks: 20
  },
  color: {
    legend: true,
    label: "Corpus",
    domain: [
      "FAN et l'Impartial",
      "GDL et JDG",
      "FAN et l'Impartial",
      "Trend GDL et JDG"
    ],
    range: ["purple", "violet", "purple", "violet"]
  },
  marks: [
    Plot.ruleY([0]),

    // lignes originales
    Plot.lineY(correspondant_expressimpartial, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "purple"
    }),

    Plot.lineY(correspondant_gdljdg, {
      x: "date",
      y: "ppm",
      strokeWidth: 3,
      stroke: "violet"
    }),

    // moyennes mobiles
    Plot.lineY(trend_expressimpartial, {
      x: "date",
      y: "ppm",
      strokeWidth: 4,
      stroke: "purple",
      strokeOpacity: 0.6,
      strokeDasharray: "8,6"
    }),

    Plot.lineY(trend_gdljdg, {
      x: "date",
      y: "ppm",
      strokeWidth: 4,
      stroke: "violet",
      strokeOpacity: 0.6,
      strokeDasharray: "8,6"
    })
  ]
})
)}

function _120(md){return(
md`_En tenant compte de la polysémie_
`
)}

function _121(Plot,yMaxCorrespondantCompare,periodsCorrespondantCompare,correctedInfoCorrespondant,colorsCorrespondantCompare,correctedOpinionCorrespondant,infoCorrespondantSeries,opinionCorrespondantSeries,corrInfoCorrespondantMarks,corrOpinionCorrespondantMarks,labelsInfoCorrespondant,labelsOpinionCorrespondant){return(
Plot.plot({
  color: {
    legend: true,
    domain: ["Presse d'information", "Presse d'opinion"],
    range: ["purple", "violet"]
  },

  width: 1400,
  height: 800,

  style: {
    fontSize: "14px"
  },

  marginLeft: 65,
  marginRight: 25,
  marginTop: 25,
  marginBottom: 50,

  x: {
    type: "time",
    tickFormat: "%Y",
    domain: [new Date("1870-01-01"), new Date("1990-12-31")],
    label: "Années",
    labelOffset: 38
  },

  y: {
    label: "Fréquence de « correspondant » (PPM)",
    labelOffset: 38,
    grid: true,
    ticks: 20,
    domain: [0, yMaxCorrespondantCompare]
  },

  marks: [
    Plot.ruleY([0]),

    ...periodsCorrespondantCompare.map((period, i) =>
      Plot.areaY(
        correctedInfoCorrespondant.filter(
          d => +d.date >= +period.start && +d.date <= +period.end
        ),
        {
          x: "date",
          y: "corrected",
          y1: 0,
          fill: colorsCorrespondantCompare[i],
          fillOpacity: 0.20
        }
      )
    ),

    ...periodsCorrespondantCompare.map((period, i) =>
      Plot.areaY(
        correctedOpinionCorrespondant.filter(
          d => +d.date >= +period.start && +d.date <= +period.end
        ),
        {
          x: "date",
          y: "corrected",
          y1: 0,
          fill: colorsCorrespondantCompare[i],
          fillOpacity: 0.20
        }
      )
    ),

    Plot.lineY(infoCorrespondantSeries, {
      x: "date",
      y: "ppm",
      stroke: "purple",
      strokeWidth: 3
    }),

    Plot.lineY(opinionCorrespondantSeries, {
      x: "date",
      y: "ppm",
      stroke: "violet",
      strokeWidth: 3
    }),

    ...corrInfoCorrespondantMarks,

    ...corrOpinionCorrespondantMarks,

    Plot.text(labelsInfoCorrespondant, {
      x: "x",
      y: "y",
      text: "label",
      fill: "purple",
      fontSize: 15,
      fontWeight: "bold"
    }),

    Plot.text(labelsOpinionCorrespondant, {
      x: "x",
      y: "y",
      text: "label",
      fill: "violet",
      fontSize: 15,
      fontWeight: "bold"
    })
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["unigrams.json", {url: new URL("./files/abbfd5fd27d04cf47a7b87e4ed68d5d045219ce5f89b497e6f08ceb4e2973c04ca14419fc58cbad3c2772d103fb88b8d28395d3108aeb3add498c1ecb30cde25.json", import.meta.url), mimeType: "application/json", toString}],
    ["unigramsGDL_JDG.json", {url: new URL("./files/3db80e7403346aef45922170970749012e6ad80028765eb2d6d869954d16d44720cee165b2ddc02698c4fc07b3378e015e974a6747d8655ca7f290926de58b07.json", import.meta.url), mimeType: "application/json", toString}],
    ["unigrams_ExpressImpartial@1.json", {url: new URL("./files/57a04e46cdd0529fb64b3ae7db955eabf793b20a26cb3f1c1ae52f1d8a575919ec74f0a5a55ca22ab9d2fb6327ebf50dc2b2de46710ce438181c4b84d506d3f1.json", import.meta.url), mimeType: "application/json", toString}],
    ["impresso dataset avant 1880.json", {url: new URL("./files/5279188ddd985fa41151a86cce694b97f3068d5eb7fb1999b4d9f9c37e4c4a07fd57344a55a82e573d0c29306fe8c8955b197973d7f30d1e387491e9726d141b.json", import.meta.url), mimeType: "application/json", toString}],
    ["unigrams_publiciste.json", {url: new URL("./files/ff1254c688d7b47d5cd73a6004e07ed7c112734c976da40bbd727f683b8b225f823833e19ed2758266173314fc01fdf9427716b620893cfcc08eb26d53335046.json", import.meta.url), mimeType: "application/json", toString}],
    ["unigrams_publiciste_JDG_GDL.json", {url: new URL("./files/c0b102a20c5762bd6cde1625def90eca54ac9889027067219433149a8960fc487d677cfef5b05f583cab5763c5af32f7e222ae2c9a62159e67abfe86f10392f2.json", import.meta.url), mimeType: "application/json", toString}],
    ["unigrams_publiciste_Express_Impartial.json", {url: new URL("./files/5238ef55be2c4eff9615d638e85feeb4694ad055ace3fb6493689e658c9ab76068a60b4fd148b06319bc00c2f5b2b690afdb5e5c44ff6ab3198727d97405e00b.json", import.meta.url), mimeType: "application/json", toString}],
    ["unigrams_chroniqueur1800_1990.json", {url: new URL("./files/e08354275c8aaf564db55ed42c0bf1ec6f043b954068b9696e6e41d53f65a2736025d654e0806cc580827feae4917c555e016e19ab63751d26d2f4818ab2c862.json", import.meta.url), mimeType: "application/json", toString}],
    ["unigrams_redaction_information.json", {url: new URL("./files/d2edbd490819e574617c3d538780e12d43a01879456a2166766671af3d900016125674e4b26fa3089fadb03bfaff1c9ed376602a5eefe07e8c4777c685ccbb39.json", import.meta.url), mimeType: "application/json", toString}],
    ["unigrams_redaction_opinion.json", {url: new URL("./files/55763024a272aad05ad74d33a2f753e7348830fee0b8d0accb10152536bfbb8cd5e2cb6a13020f0d0c6bf6ded20342f447c94f4a8a67a52738e7fab0fafec668.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("unigrams")).define("unigrams", ["FileAttachment"], _unigrams);
  main.variable(observer("unigrams_data")).define("unigrams_data", ["FileAttachment"], _unigrams_data);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("unigrams_data_a")).define("unigrams_data_a", ["FileAttachment"], _unigrams_data_a);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("unigrams_publiciste")).define("unigrams_publiciste", ["FileAttachment"], _unigrams_publiciste);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("unigrams_publiciste_data_g")).define("unigrams_publiciste_data_g", ["FileAttachment"], _unigrams_publiciste_data_g);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("unigrams_publiciste_data_a")).define("unigrams_publiciste_data_a", ["unigrams_publiciste_data_g"], _unigrams_publiciste_data_a);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("unigrams_publiciste_data")).define("unigrams_publiciste_data", ["unigrams_publiciste_data_g"], _unigrams_publiciste_data);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("unigrams_publiciste_jdg_gdl")).define("unigrams_publiciste_jdg_gdl", ["FileAttachment"], _unigrams_publiciste_jdg_gdl);
  main.variable(observer("unigrams_publiciste_opinion")).define("unigrams_publiciste_opinion", ["FileAttachment"], _unigrams_publiciste_opinion);
  main.variable(observer("unigrams_publiciste_opinion_data")).define("unigrams_publiciste_opinion_data", ["unigrams_publiciste_opinion"], _unigrams_publiciste_opinion_data);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("unigrams_publiciste_express_impartial")).define("unigrams_publiciste_express_impartial", ["FileAttachment"], _unigrams_publiciste_express_impartial);
  main.variable(observer("unigrams_publiciste_information")).define("unigrams_publiciste_information", ["FileAttachment"], _unigrams_publiciste_information);
  main.variable(observer("unigrams_publiciste_information_data")).define("unigrams_publiciste_information_data", ["unigrams_publiciste_information"], _unigrams_publiciste_information_data);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("unigrams_chroniqueur1800_1990")).define("unigrams_chroniqueur1800_1990", ["FileAttachment"], _unigrams_chroniqueur1800_1990);
  main.variable(observer("unigrams_chroniqueur_1800_1990_data")).define("unigrams_chroniqueur_1800_1990_data", ["FileAttachment"], _unigrams_chroniqueur_1800_1990_data);
  main.variable(observer()).define(["Plot","unigrams_data","unigrams_publiciste_data"], _25);
  main.variable(observer()).define(["Plot","unigrams_data_a"], _26);
  main.variable(observer("unigramsgdl_jdg")).define("unigramsgdl_jdg", ["FileAttachment"], _unigramsgdl_jdg);
  main.variable(observer("unigrams_expressimpartial")).define("unigrams_expressimpartial", ["FileAttachment"], _unigrams_expressimpartial);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["Plot","unigrams_expressimpartial","unigramsgdl_jdg"], _30);
  main.variable(observer()).define(["Plot","unigramsgdl_jdg","unigrams_expressimpartial"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["Plot","unigrams_expressimpartial","unigramsgdl_jdg"], _33);
  main.variable(observer()).define(["Plot","unigrams_expressimpartial","unigramsgdl_jdg"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["Plot","unigrams_publiciste_opinion","unigrams_publiciste_information"], _36);
  main.variable(observer()).define(["Plot","unigrams_publiciste_opinion","unigrams_publiciste_information"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("movingAverage")).define("movingAverage", ["d3"], _movingAverage);
  main.variable(observer("impressoClean")).define("impressoClean", ["unigrams_data","d3"], _impressoClean);
  main.variable(observer("trendJImpresso")).define("trendJImpresso", ["movingAverage","impressoClean"], _trendJImpresso);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["Plot","unigrams_data","trendJImpresso"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("toDateSeries")).define("toDateSeries", _toDateSeries);
  main.variable(observer("chroniqueur")).define("chroniqueur", ["toDateSeries","unigrams_chroniqueur_1800_1990_data"], _chroniqueur);
  main.variable(observer("reporter")).define("reporter", ["toDateSeries","unigrams_data"], _reporter);
  main.variable(observer("publiciste")).define("publiciste", ["toDateSeries","unigrams_publiciste_data_g"], _publiciste);
  main.variable(observer("trend_chroniqueur")).define("trend_chroniqueur", ["movingAverage","chroniqueur"], _trend_chroniqueur);
  main.variable(observer("trend_publiciste")).define("trend_publiciste", ["movingAverage","publiciste"], _trend_publiciste);
  main.variable(observer("trend_reporter")).define("trend_reporter", ["movingAverage","reporter"], _trend_reporter);
  main.variable(observer()).define(["Plot","chroniqueur","publiciste","reporter","trend_chroniqueur","trend_publiciste","trend_reporter"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("periods")).define("periods", _periods);
  main.variable(observer("pForDate")).define("pForDate", ["periods"], _pForDate);
  main.variable(observer("reporterSeries")).define("reporterSeries", ["reporter"], _reporterSeries);
  main.variable(observer("correctedByPeriod")).define("correctedByPeriod", ["periods","reporterSeries"], _correctedByPeriod);
  main.variable(observer("reporterBars")).define("reporterBars", ["reporterSeries","pForDate"], _reporterBars);
  main.variable(observer("bands")).define("bands", _bands);
  main.variable(observer("labels")).define("labels", ["periods"], _labels);
  main.variable(observer("yMax")).define("yMax", ["reporterSeries","correctedByPeriod","chroniqueur","publiciste"], _yMax);
  main.variable(observer("areaMarks")).define("areaMarks", ["periods","reporterSeries","Plot","colors"], _areaMarks);
  main.variable(observer("boundaries")).define("boundaries", _boundaries);
  main.variable(observer("colors")).define("colors", _colors);
  main.variable(observer("corrLineMarks")).define("corrLineMarks", ["periods","reporterSeries","Plot","colors"], _corrLineMarks);
  main.variable(observer()).define(["Plot","periods","colors","yMax","boundaries","areaMarks","reporterSeries","corrLineMarks"], _66);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer()).define(["Plot","areaMarks","chroniqueur","publiciste","reporter","trend_chroniqueur","trend_publiciste","trend_reporter","corrLineMarks"], _68);
  main.variable(observer("periodsReporterCompare")).define("periodsReporterCompare", _periodsReporterCompare);
  main.variable(observer("colorsReporterCompare")).define("colorsReporterCompare", _colorsReporterCompare);
  main.variable(observer("pOpinionForDate")).define("pOpinionForDate", ["periodsReporterCompare"], _pOpinionForDate);
  main.variable(observer("pInfoForDate")).define("pInfoForDate", ["periodsReporterCompare"], _pInfoForDate);
  main.variable(observer("opinionSeries")).define("opinionSeries", ["unigramsgdl_jdg"], _opinionSeries);
  main.variable(observer("infoSeries")).define("infoSeries", ["unigrams_expressimpartial"], _infoSeries);
  main.variable(observer("correctedOpinion")).define("correctedOpinion", ["opinionSeries","pOpinionForDate"], _correctedOpinion);
  main.variable(observer("correctedInfo")).define("correctedInfo", ["infoSeries","pInfoForDate"], _correctedInfo);
  main.variable(observer("yMaxReporterCompare")).define("yMaxReporterCompare", _yMaxReporterCompare);
  main.variable(observer("boundariesReporterCompare")).define("boundariesReporterCompare", _boundariesReporterCompare);
  main.variable(observer("areaMarksReporterCompare")).define("areaMarksReporterCompare", ["periodsReporterCompare","Plot","yMaxReporterCompare","colorsReporterCompare"], _areaMarksReporterCompare);
  main.variable(observer("corrOpinionMarks")).define("corrOpinionMarks", ["periodsReporterCompare","Plot","correctedOpinion"], _corrOpinionMarks);
  main.variable(observer("corrInfoMarks")).define("corrInfoMarks", ["periodsReporterCompare","Plot","correctedInfo"], _corrInfoMarks);
  main.variable(observer("labelsReporterCompare")).define("labelsReporterCompare", ["periodsReporterCompare","yMaxReporterCompare"], _labelsReporterCompare);
  main.variable(observer("yMaxInfo")).define("yMaxInfo", _yMaxInfo);
  main.variable(observer("labelsInfo")).define("labelsInfo", ["periodsReporterCompare","yMaxInfo","colorsReporterCompare"], _labelsInfo);
  main.variable(observer()).define(["Plot","yMaxInfo","boundariesReporterCompare","periodsReporterCompare","correctedInfo","colorsReporterCompare","infoSeries","corrInfoMarks","labelsInfo"], _85);
  main.variable(observer("yMaxOpinion")).define("yMaxOpinion", _yMaxOpinion);
  main.variable(observer("labelsOpinion")).define("labelsOpinion", ["periodsReporterCompare","yMaxInfo","colorsReporterCompare"], _labelsOpinion);
  main.variable(observer()).define(["Plot","yMaxOpinion","boundariesReporterCompare","periodsReporterCompare","correctedOpinion","colorsReporterCompare","opinionSeries","corrOpinionMarks","labelsOpinion"], _88);
  main.variable(observer()).define(["Plot","yMaxInfo","boundariesReporterCompare","periodsReporterCompare","correctedInfo","colorsReporterCompare","correctedOpinion","infoSeries","opinionSeries","corrInfoMarks","corrOpinionMarks","labelsInfo","labelsOpinion"], _89);
  main.variable(observer()).define(["md"], _90);
  main.variable(observer()).define(["Plot","unigrams_data"], _91);
  main.variable(observer()).define(["md"], _92);
  main.variable(observer("unigrams_redaction_information_data")).define("unigrams_redaction_information_data", ["FileAttachment"], _unigrams_redaction_information_data);
  main.variable(observer("unigrams_redaction_opinion")).define("unigrams_redaction_opinion", ["FileAttachment"], _unigrams_redaction_opinion);
  main.variable(observer("unigrams_redaction_opinion_data")).define("unigrams_redaction_opinion_data", ["FileAttachment"], _unigrams_redaction_opinion_data);
  main.variable(observer()).define(["md"], _96);
  main.variable(observer("seriesMap")).define("seriesMap", ["unigrams_redaction_opinion_data","unigrams_redaction_information_data"], _seriesMap);
  main.variable(observer()).define(["Plot","seriesMap"], _98);
  main.variable(observer()).define(["md"], _99);
  main.variable(observer("correspondant_expressimpartial")).define("correspondant_expressimpartial", ["unigrams_expressimpartial"], _correspondant_expressimpartial);
  main.variable(observer("correspondant_gdljdg")).define("correspondant_gdljdg", ["unigramsgdl_jdg"], _correspondant_gdljdg);
  main.variable(observer("trend_expressimpartial")).define("trend_expressimpartial", ["movingAverage","correspondant_expressimpartial"], _trend_expressimpartial);
  main.variable(observer("trend_gdljdg")).define("trend_gdljdg", ["movingAverage","correspondant_gdljdg"], _trend_gdljdg);
  main.variable(observer("periodsCorrespondantCompare")).define("periodsCorrespondantCompare", _periodsCorrespondantCompare);
  main.variable(observer("colorsCorrespondantCompare")).define("colorsCorrespondantCompare", _colorsCorrespondantCompare);
  main.variable(observer("pInfoCorrespondantForDate")).define("pInfoCorrespondantForDate", ["periodsCorrespondantCompare"], _pInfoCorrespondantForDate);
  main.variable(observer("pOpinionCorrespondantForDate")).define("pOpinionCorrespondantForDate", ["periodsCorrespondantCompare"], _pOpinionCorrespondantForDate);
  main.variable(observer("infoCorrespondantSeries")).define("infoCorrespondantSeries", ["correspondant_expressimpartial"], _infoCorrespondantSeries);
  main.variable(observer("opinionCorrespondantSeries")).define("opinionCorrespondantSeries", ["correspondant_gdljdg"], _opinionCorrespondantSeries);
  main.variable(observer("correctedInfoCorrespondant")).define("correctedInfoCorrespondant", ["infoCorrespondantSeries","pInfoCorrespondantForDate"], _correctedInfoCorrespondant);
  main.variable(observer("correctedOpinionCorrespondant")).define("correctedOpinionCorrespondant", ["opinionCorrespondantSeries","pOpinionCorrespondantForDate"], _correctedOpinionCorrespondant);
  main.variable(observer("boundariesCorrespondantCompare")).define("boundariesCorrespondantCompare", _boundariesCorrespondantCompare);
  main.variable(observer("yMaxCorrespondantCompare")).define("yMaxCorrespondantCompare", ["infoCorrespondantSeries","opinionCorrespondantSeries"], _yMaxCorrespondantCompare);
  main.variable(observer("corrInfoCorrespondantMarks")).define("corrInfoCorrespondantMarks", ["periodsCorrespondantCompare","Plot","correctedInfoCorrespondant"], _corrInfoCorrespondantMarks);
  main.variable(observer("corrOpinionCorrespondantMarks")).define("corrOpinionCorrespondantMarks", ["periodsCorrespondantCompare","Plot","correctedOpinionCorrespondant"], _corrOpinionCorrespondantMarks);
  main.variable(observer("labelsInfoCorrespondant")).define("labelsInfoCorrespondant", ["periodsCorrespondantCompare","yMaxCorrespondantCompare","colorsCorrespondantCompare"], _labelsInfoCorrespondant);
  main.variable(observer("labelsOpinionCorrespondant")).define("labelsOpinionCorrespondant", ["periodsCorrespondantCompare","yMaxCorrespondantCompare","colorsCorrespondantCompare"], _labelsOpinionCorrespondant);
  main.variable(observer()).define(["md"], _118);
  main.variable(observer()).define(["Plot","correspondant_expressimpartial","correspondant_gdljdg","trend_expressimpartial","trend_gdljdg"], _119);
  main.variable(observer()).define(["md"], _120);
  main.variable(observer()).define(["Plot","yMaxCorrespondantCompare","periodsCorrespondantCompare","correctedInfoCorrespondant","colorsCorrespondantCompare","correctedOpinionCorrespondant","infoCorrespondantSeries","opinionCorrespondantSeries","corrInfoCorrespondantMarks","corrOpinionCorrespondantMarks","labelsInfoCorrespondant","labelsOpinionCorrespondant"], _121);
  const child1 = runtime.module(define1);
  main.import("Plot", child1);
  return main;
}
