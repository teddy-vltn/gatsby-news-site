const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async function({ actions, graphql }) {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx {
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

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.frontmatter.slug}`, // Ensure this matches the format expected by your queries
      component : require.resolve(`./src/templates/articlesTemplate.js`),
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
        name: "authorId",
        value: node.frontmatter.authorId,
      });
    }
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Mdx implements Node {
      frontmatter: Frontmatter
      author: Mdx @link(by: "frontmatter.authorSlug", from: "frontmatter.authorId")
    }
    type Frontmatter {
      title: String
      description: String
      slug: String
      authorId: String
    }
  `;
  createTypes(typeDefs);
};