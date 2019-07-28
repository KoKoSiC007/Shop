
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require("./src/schema");


let port = 3000;
const app = express();

app.use('/graph', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(port);
console.log('GraphQl API server running at localhost: ' + port);


