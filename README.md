[![Build Status](https://api.travis-ci.org/eldimious/nodejs-api-showcase.svg?branch=master)](https://api.travis-ci.org/eldimious/nodejs-api-showcase)

# What is this repository for? #
Node.js app architecture showcase using [Express](https://www.npmjs.com/package/express), [MongoDB](https://www.mongodb.com/) and [Mongoose](http://mongoosejs.com/) as ORM. The project has an  implementation of an authentication system that uses JSON Web Token to manage users' login data in Node.js web server. You can start your Node.js projects building on this boilerplate.

# Architecture Overview #
The app is designed to use a layered architecture. The architecture is heavily influenced by the Clean Architecture.[Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) is an architecture where:

  1. **does not depend on the existence of some framework, database, external agency.**
  2. **does not depend on UI**
  3. **the business rules can be tested without the UI, database, web server, or any external element.** 

<p align="center">
  <img src="https://cdn-images-1.medium.com/max/719/1*ZNT5apOxDzGrTKUJQAIcvg.png" width="350"/>
  <img src="https://cdn-images-1.medium.com/max/900/0*R7uuhFwZbhcqZSvn" width="350" /> 
</p>

<p align="center">
  <img src="https://cdn-images-1.medium.com/max/1200/0*rFs1UtU4sRns5vCJ.png" width="350" />
  <img src="https://cdn-images-1.medium.com/max/1200/0*C-snK7L4sMn7b6CW.png" width="350" /> 
</p>

Also, in entry point(server.js), I use Dependency Injection(DI). There are many reasons using Dependency Injection as:
1. Decoupling
2. Easier unit testing
3. Faster development
4. Dependency injection is really helpful when it comes to testing. You can easily mock your modules' dependencies using this pattern.

You can take a look at this tutorial: `https://blog.risingstack.com/dependency-injection-in-node-js/`.
According to DI:
  A. High-level modules should not depend on low-level modules. Both should depend on abstractions.
  B. Abstractions should not depend on details.

The code style being used is based on the airbnb js style guide.


## Data Layer ##

The data layer is implemented using repositories, that hide the underlying data sources (database, network, cache, etc), and provides an abstraction over them so other parts of the application that make use of the repositories, don't care about the origin of the data and are decoupled from the specific implementations used, like the Mongoose ORM that is used by this app. Furthermore, the repositories are responsible to map the entities they fetch from the data sources to the models used in the applications. This is important to enable the decoupling.

## Domain Layer ##

The domain layer is implemented using services. They depend on the repositories to get the app models and apply the business rules on them. They are not coupled to a specific database implementation and can be reused if we add more data sources to the app or even if we change the database for example from MongoDB to Couchbase Server.

## Routes/Controller Layer ##

This layer is being used in the express app and depends on the domain layer (services). Here we define the routes that can be called from outside. The services are always used as the last middleware on the routes and we must not rely on res.locals from express to get data from previous middlewares. That means that the middlewares registered before should not alter data being passed to the domain layer. They are only allowed to act upon the data without modification, like for example validating the data and skipping calling next().

## Entry point ##

The entry point for the applications is the server.js file. It does not depend on express.js or other node.js frameworks. It is responsible for instantiating the application layers, connecting to the db and  mounting the http server to the specified port.

# Quick start #

### Prerequisites ###

Create an .env file in project root to register the following required environment variables:
  - `DATABASE_URL` - MongoDB connection URL

### Use Docker: ###

You can use Docker to start the app locally. The Dockerfile and the docker-compose.yml are already provided for you. For this option you must specify following var in the .env file:

DATABASE_URL

then run the following command:

```shell
docker-compose up
```

### Use the npm scripts: ###

```shell
npm run test
```
for running tests.


# Endpoints #

## Auth Routes ##
  
### Register ###

```shell
POST /auth/register
```

Body Params:
```shell
{ 
  name,
  surname,
  username,
  email,
  password
}
```

Description: creates a new user. Password is stored in bcrypt format.


### Login ###

```shell
POST /auth/login
```

Body Params:
```shell
{ 
  email,
  password
}
```

**Description**: logs in to the server. Server will return a JWT token and user's info as:

```js
{
    "status": "success",
    "data": {
        "token": {
          id: "eyJhbGciOiJIUzxxxxxxx.eyJlbWFpbCI6ImRpbW9zdGhlbxxxxxxxxxxxxx.axxxxxxxxxx",
          expiresIn: 86400,
        },
        "user": {
            "id": "mongoID",
            "fullName": "clark kent",
            "username": "superman",
            "email": "clarkkent@test.com",
            "created": "2018-01-08T14:43:32.480Z"
        }
    }
}
```

## Posts Routes ##

In order to be able to retrieve posts list, user should send a Bearer token using Authorization header, otherwise server will answer with 401.

### Posts List ###

```shell
GET /posts
```

Query Params:
```shell
{ 
  publisher, {String} (optional)
}
```
**Description**: retrieves user's posts docs, based on his token and his id.


```shell
POST /posts
```

Body Params:
```shell
{ 
  imageUrl, {String}
  publisher, {String}
  description, {String} (optional)
}
```
**Description**: creates a new post doc in DB for user.

```shell
GET /posts/:postId
```

**Description**: Gets specific user's post.

# Packages and Tools #

  - [Node.js](https://nodejs.org/en/)
  - [Express](https://www.npmjs.com/package/express)
  - [Mongoose](http://mongoosejs.com/)
  - [Mongoose-Pagination](https://github.com/edwardhotchkiss/mongoose-paginate)
  - [Express-jsend](https://www.npmjs.com/package/express-jsend)
  - [Express-validator](https://github.com/ctavan/express-validator)
  - [Bcrypt](https://github.com/dcodeIO/bcrypt.js)
  - [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
  - [Mocha](https://www.npmjs.com/package/mocha)
  - [Chai](https://www.npmjs.com/package/chai)
  - [Sinon](https://www.npmjs.com/package/sinon)
  - [Supertest](https://github.com/visionmedia/supertest)
  - [Eslint](https://www.npmjs.com/package/eslint)
