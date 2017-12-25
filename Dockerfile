FROM node:carbon

# Create app directory
WORKDIR /usr/src/api

# Install app dependencies
# COPY package.json .

# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 5555
CMD [ "npm", "start" ]