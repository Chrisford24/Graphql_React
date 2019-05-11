const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-vb9uh.mongodb.net/test?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(
    app.listen(port, () => {
      console.log(`Server started on ${port}`);
    })
  )
  .catch(err => {
    console.log(err);
  });
