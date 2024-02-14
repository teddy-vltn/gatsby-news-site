import pandas as pd
import re
import os

# Define a function to create a slug from the title or author name
def create_slug(text):
    slug = re.sub(r'[^\w\s]', '', text).lower()
    slug = re.sub(r'\s+', '-', slug)
    return slug

# Process the full CSV and generate MDX files for articles and authors, with enhancements
def generate_mdx_files(csv_path, max_articles=100):
    articles_df = pd.read_csv(csv_path)

    # Initialize a set to keep track of authors to avoid duplicates
    processed_authors = set()

    n_articles = 1
    n_authors = 1

    # Create the main directory if it doesn't exist
    if not os.path.exists('generated'):
        os.makedirs('generated')

    # Create subdirectories for articles and authors if they don't exist
    articles_dir = 'generated/articles'
    authors_dir = 'generated/authors'
    if not os.path.exists(articles_dir):
        os.makedirs(articles_dir)
    if not os.path.exists(authors_dir):
        os.makedirs(authors_dir)

    # Process articles up to the max_articles limit
    for index, row in articles_df.iterrows():
        if index >= max_articles:
            break

        # Extract relevant information
        title = str(row['title']) if pd.notnull(row['title']) else 'No title'
        description = str(row['description']) if pd.notnull(row['description']) else 'No description'
        author = str(row['author']) if pd.notnull(row['author']) else 'Unknown'
        content = str(row['text']) if pd.notnull(row['text']) else 'No content'
        url = row['url'] if pd.notnull(row['url']) else '#'

        # Escape special characters in YAML and quote the strings
        title = title.replace('"', '\\"')
        description = description.replace('"', '\\"').replace("\n", " ")

        # Generate slug for the article and author
        article_slug = create_slug(title)
        author_slug = create_slug(author)

        # Author MDX content, only create if not already processed
        if author_slug not in processed_authors:
            author_mdx_content = f"""---
type: author
slug: "{author_slug}"
name: "{author}"
---

This is a bio of {author}.
"""
            author_file_directory = f'{authors_dir}/{n_authors}'
            author_file_path = f'{author_file_directory}/{author_slug}.mdx'

            # Write the author MDX file
            if not os.path.exists(author_file_directory):
                os.makedirs(author_file_directory)

            with open(author_file_path, 'w') as author_file:
                author_file.write(author_mdx_content)
                n_authors += 1

            processed_authors.add(author_slug)

        # Article MDX content
        article_mdx_content = f"""---
type: article
slug: "{article_slug}"
title: "{title}"
description: "{description}"
authorSlug: "{author_slug}"
---

{content}

Keep reading at {url}
"""
        
        article_file_directory = f'{articles_dir}/{n_articles}'
        if not os.path.exists(article_file_directory):
            os.makedirs(article_file_directory)

        article_file_path = f'{article_file_directory}/{article_slug}.mdx'

        # Write the article MDX file
        with open(article_file_path, 'w') as article_file:
            article_file.write(article_mdx_content)
            n_articles += 1

        print(f'Processed article {n_articles-1}: {title}')

# Example usage
csv_path = 'py/articledump1208.csv'  # Update this path to your CSV file location
generate_mdx_files(csv_path)
