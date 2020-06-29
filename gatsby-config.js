module.exports = {
  siteMetadata: {
    title: `memory.js`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `WhySoBad`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sass",
      options: {
        implementation: require("sass"),
        cssLoaderOptions: {
          camelCase: false,
        },
        includePaths: [require("path").resolve(__dirname, "node_modules")],
      },
    },
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        svgoConfig: {
          plugins: [
            { prefixIds: false },
            {
              cleanupIDs: {
                remove: true,
                force: true,
              },
            },
            { inlineStyles: false },
            { removeStyleElement: true },
          ],
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/logo/icon.png`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/logo/icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
