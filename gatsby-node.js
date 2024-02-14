const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async function({ actions, graphql }) {
  const { createPage } = actions;

  // Query for articles
  const result = await graphql(`
    query {
      allMdx(filter: {frontmatter: {type: {eq: "article"}}}) { 
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  // Create article pages
  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: `/article/${node.frontmatter.slug}`, // Adjust path as needed
      component: require.resolve(`./src/templates/articlesTemplate.js`),
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });

  // Query for unique authors
  const authorsResult = await graphql(`
    query {
      allMdx(filter: {frontmatter: {type: {eq: "author"}}}) { 
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  // Create author pages
  authorsResult.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: `/author/${node.frontmatter.slug}`, // Ensure this path matches your Link to in author template
      component: require.resolve(`./src/templates/authorsTemplate.js`),
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });

};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode });

    // Add a slug field to all MDX nodes (articles and authors)
    createNodeField({
      node,
      name: "slug",
      value: `/blog${value}`,
    });

    // If it's an article, attempt to link it to its author
    if (node.frontmatter.type === "article") {
      createNodeField({
        node,
        name: "authorSlug",
        value: node.frontmatter.authorSlug,
      });
    }
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Mdx implements Node {
      frontmatter: Frontmatter
      author: Mdx @link(by: "frontmatter.slug", from: "frontmatter.authorSlug")
    }
    type Frontmatter {
      title: String
      description: String
      slug: String
      authorSlug: String
    }
  `;
  createTypes(typeDefs);
};