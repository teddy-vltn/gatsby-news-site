import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../component/layout'; // Adjust the path according to your layout component

export default function AuthorTemplate({ data }) {
  const { author, allMdx } = data; // `author` for author info, `allMdx` for articles by the author

  return (
    <Layout>
      <div>
        <h1>Author: {author.frontmatter.name}</h1>
        <p>Bio: {author.body}</p>
        <h2>Articles by this Author</h2>
        <ul>
          {allMdx.nodes.map((article) => (
            <li key={article.id}>
              <Link to={"/article/" + article.frontmatter.slug}>{article.frontmatter.title}</Link>
              <p>{article.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query AuthorAndArticles($slug: String) {
    author: mdx(frontmatter: { slug: { eq: $slug }, type: { eq: "author" } }) {
      body
      frontmatter {
        name
      }
    }
    allMdx(filter: { frontmatter: { authorSlug: { eq: $slug }, type: { eq: "article" } } }) {
      nodes {
        id
        excerpt
        frontmatter {
          title
          slug
        }
      }
    }
  }
`;
