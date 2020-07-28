module.exports = {
  siteUrl: "https://reactmemory.netlify.app/",

  siteTitle: "Memory",
  siteName: "reactmemory",
  siteTitleTemplate: "%s",
  siteAuthor: "_WhySoBad",
  siteDescription: "A simple memory game created with react.",
  social: {
    github: {
      name: "WhySoBad",
      link: "https://github.com/WhySoBad",
    },
    twitter: {
      name: "@WhySoBad7",
      link: "https://twitter.com/WhySoBad7",
    },
  },
  res: {
    xxxs: { px: "0px", prio: 0, horizontal: 4, type: "xxs" },
    xxs: { px: "360px", prio: 1, horizontal: 4, type: "xxs" },
    xs: { px: "400px", prio: 2, horizontal: 4, type: "xs" },
    s: { px: "550px", prio: 3, horizontal: 4, type: "s" },
    m: { px: "750px", prio: 4, horizontal: 6, type: "m" },
    l: { px: "1000px", prio: 5, horizontal: 6, type: "l" },
    xl: { px: "1200px", prio: 6, horizontal: 10, type: "xl" },
    xxl: { px: "1600px", prio: 7, horizontal: 14, type: "xxl" },
  },
  board: {},
  time: {
    start: 0,
    end: 0,
  },
  clicks: 0,
  solvedPairs: 0,
  allPairs: 0,
  rep: {
    hor: 0,
    ver: 0,
  },
  won: false,
};
