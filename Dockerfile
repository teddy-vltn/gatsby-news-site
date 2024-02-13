# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 80

# Build the Gatsby site
RUN npm run build

# Install `serve` to serve the site and set the command to run the server
RUN npm install -g serve
CMD ["serve", "-s", "public", "-p", "80"]
