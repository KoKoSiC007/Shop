const {buildSchema} = require("graphql");
const {importSchema} = require('graphql-import');
const {ValidationError} = require('sequelize');
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
    },
    createCreator: (name) => {
        console.log(name);
        db.models.creators.create({name: name['name'], id: 6})
            .then(() => {
                return db.models.creators.findAll({where: db.models.creators().id === 6});
            }).catch(ValidationError, err => console.log(err));
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


