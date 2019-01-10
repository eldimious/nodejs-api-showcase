FROM node:11.5.0-alpine

# Run the image as a non-root user
RUN adduser -S api
USER api

# Create app directory
RUN mkdir -p /home/api/app
WORKDIR /home/api/app

# Install app dependencies
COPY --chown=api:nogroup package.json package-lock.json /home/api/app
RUN npm install

EXPOSE 5555
CMD [ "npm", "start" ]
