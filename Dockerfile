FROM ghcr.io/puppeteer/puppeteer:latest


RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY --chown=app:node package*.json ./
RUN npm install
# Set the working directory in the container
#WORKDIR /app

# Copy the package.json and package-lock.json (if available)
#COPY package*.json ./

# Install dependencies
#RUN npm install

# Copy the JavaScript script into the container
COPY mainindex.js ./

# Create a directory to store media files
RUN mkdir /app/media
RUN mkdir /app/session

# Make the 'consume' directory accessible from outside the container
VOLUME ["/app/media"]
VOLUME ["/app/session"]
# Expose any necessary ports (if applicable)
# EXPOSE <port>

# Command to run the JavaScript script
CMD ["node", "mainindex.js"]
