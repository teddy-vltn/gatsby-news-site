/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `app`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "images",
        path: `${__dirname}/src/images/`, // Utilisation de __dirname pour assurer le bon chemin
      },
      __key: "images", // Clé pour identifier de manière unique la source des données
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`, // Utilisation de __dirname ici aussi
      },
      __key: "pages", // Clé unique pour cette instance de plugin
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `dataset`,
        path: `${__dirname}/src/dataset/`, // Chemin correctement formaté
      },
      __key: "dataset", // Clé unique pour les articles
    },
  ],
};
