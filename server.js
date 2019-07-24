const {buildSchema} = require("graphql");
const {importSchema} = require('graphql-import');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = importSchema("./src/newSchema.graphql");
const db = require('./src/data/db');
/** Это реализация тех полей что мы указали в schema
 * например: в файле .graphql, в type Query есть поле creators
 * значит мы должны реализовать точно такой же метод в resolvers**/
let resolvers = {
    creators: () => {
        return db.models.creators.findAll()
    }
};

let port = 3000;
const app = express();

app.use('/graph', graphqlHTTP({
    schema: buildSchema(schema),
    rootValue: resolvers,
    graphiql: true,
}));

app.listen(port);
console.log('GraphQl API server running at localhost: ' + port);


