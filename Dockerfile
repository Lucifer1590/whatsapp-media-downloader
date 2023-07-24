FROM shivjm/node-chromium:node19-chromium115-debian
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
#COPY --chown=node:node package*.json .
#RUN npm install
RUN npm install whatsapp-web.js qrcode-terminal fs path

# Copy the JavaScript script into the container
COPY mainindex.js ./

# Create a directory to store media files
RUN mkdir /home/node/app/media
RUN mkdir /home/node/app/session

# Make the 'consume' directory accessible from outside the container
VOLUME ["/home/node/app/media"]
VOLUME ["/home/node/app/session"]
# Expose any necessary ports (if applicable)
# EXPOSE <port>

# Command to run the JavaScript script
CMD ["node", "mainindex.js"]
