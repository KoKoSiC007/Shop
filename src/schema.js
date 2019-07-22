
const db = require('./data/db');

let {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql');

/** Тип Создателя **/
const CreatorType = new GraphQLObjectType({
    name: 'Creator',
    description: 'This all of Creators',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(creator) {
                    return creator.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(creator){
                    return creator.name;
                }
            }
        }
    }
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    description: 'This a product',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(product){
                    return product.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(product) {
                    return product.name;
                }
            },
            description: {
                type: GraphQLString,
                resolve(product) {
                    return product.description;
                }
            }

        }
    }
});
const Query = new GraphQLObjectType({
    name: 'Query',
    description: ' This is a root query',
    fields: () => {
        return {
            creators: {
                type: GraphQLList(CreatorType),
                resolve() {
                    return db.models.creators.findAll();
                }
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query
});
module.exports = Schema;

