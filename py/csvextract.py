import pandas as pd
import re
import os

# Define a function to create a slug from the title
def create_slug(title):
    # Convert to lowercase, remove non-word characters and replace spaces with hyphens
    slug = re.sub(r'[^\w\s]', '', title).lower()
    slug = re.sub(r'\s+', '-', slug)
    return slug

# Process the full CSV and generate MDX files
def generate_mdx_files_corrected(csv_path):
    articles_df = pd.read_csv(csv_path)

    # Initialize a list to keep track of generated filenames
    generated_filenames = []

    n = 1
    MAX = 100

    for _, row in articles_df.iterrows():

        # Limit the number of files generated
        if n == MAX:
            break

        # Extract relevant information
        title = str(row['title']) if pd.notnull (row['title']) else 'No title'
        description = str(row['description']) if pd.notnull(row['description']) else 'No description'
        author = str(row['author']) if pd.notnull(row['author']) else 'Unknown'
        content = str(row['text']) if pd.notnull(row['text']) else 'No content'

         # Escape special characters in YAML and quote the strings
        title = title.replace('"', '\\"')
        description = description.replace('"', '\\"').replace("\n", " ")

        # Generate slug and authorId
        slug = create_slug(title)

        # Create the content of the MDX file
        mdx_content = f"""---
type: article
slug: "{slug}"
title: "{title}"
description: "{description}"
authorId: "author-2"
---

{content}

Keep reading at {row['url']}
"""

        # Define the filename
        filename = f'{slug}.mdx'
        generated_filenames.append(filename)

        # Create the directory if it doesn't exist
        if not os.path.exists('generated'):
            os.makedirs('generated')

        # Check if the file already exists in the directory /generated
        if filename in os.listdir('generated'):
            print(f'File {filename} already exists. Skipping...')
            continue

        # Create subdirectory based on the 'n' value
        if not os.path.exists(f'generated/{n}'):
            os.makedirs(f'generated/{n}')

        # File should be in a directory called 'generated' and a subdirectory based on the 'n' value
        with open(f'generated/{n}/{filename}', 'w') as f:
            f.write(mdx_content)
        
        n += 1

    return generated_filenames

# Path to the CSV file
csv_path = 'py/articledump1208.csv'

# Generate MDX files and retrieve the filenames
generated_mdx_filenames = generate_mdx_files_corrected(csv_path)

# Display the first 5 filenames for confirmation
print(generated_mdx_filenames[:5])
