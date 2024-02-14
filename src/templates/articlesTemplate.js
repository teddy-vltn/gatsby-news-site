import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../component/layout'; // Adjust the path according to your layout component

export default function ArticleTemplate({ data }) {
    const { mdx } = data; // This contains your post data, including the author info
  
    return (
      <Layout>
        <h1>{mdx.frontmatter.title}</h1>
        <p>{mdx.frontmatter.description}</p>
        {mdx.author && (
          <div>
            <h2>About the Author</h2>
            <Link to={"/author/" + mdx.author.frontmatter.slug}>{mdx.author.frontmatter.name}</Link>
            <p>Bio: {mdx.author.body}</p>
          </div>
        )}
        <h2>Content</h2>
        <div dangerouslySetInnerHTML={{ __html: mdx.body }} />
      </Layout>
    );
  }

  export const query = graphql`
  query ArticleBySlug($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        description
        authorSlug
      }
      author {
        body
        frontmatter {
          name
          slug
        }
      }
    }
  }
`;



