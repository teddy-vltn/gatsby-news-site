import React from 'react';
import { graphql } from 'gatsby';
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
            <p>Name: {mdx.author.frontmatter.name}</p>
            <p>Bio: {mdx.author.frontmatter.bio}</p>
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
        authorId
      }
      author {
        frontmatter {
          name
          bio
        }
      }
    }
  }
`;


