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
        path: `${__dirname}/src/images/`, 
      },
      __key: "images", 
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
      __key: "pages", 
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `dataset`,
        path: `${__dirname}/src/dataset/`, 
      },
      __key: "dataset", 
    },
  ],
};
