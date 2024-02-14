import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../component/layout';

export default function BlogPage({ data }) {
  return (
    <Layout>
      <h1>Articles</h1>
      {data.allMdx.edges.map(({ node }) => (
        <article key={node.id}>
          <h2>
            <Link to={"/article/" + node.frontmatter.slug}>{node.frontmatter.title}</Link>
          </h2>
          <p>{node.frontmatter.description}</p>
        </article>
      ))}
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allMdx {
      edges {
        node {
          id
          frontmatter {
            slug
            title
            description
          }
        }
      }
    }
  }
`;
