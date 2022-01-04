FROM node:16-alpine as builder
RUN mkdir -p /build

COPY ./package.json ./package-lock.json /build/
WORKDIR /build
RUN npm ci

# Bundle app source
COPY . /build

FROM node:16-alpine
# user with username node is provided from the official node image
ENV user node
# Run the image as a non-root user
USER $user

# Create app directory
RUN mkdir -p /home/$user/src
WORKDIR /home/$user/src

COPY --from=builder /build ./

EXPOSE 5555

ENV NODE_ENV production

CMD ["npm", "start"]