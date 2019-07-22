const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema');

let port = 3000;
const app = express();
app.use('/', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(port);
console.log('GraphQl API server running at localhost: ' + port);
app.post('http://localhost:3000/', res => {
    console.log(res);
});

