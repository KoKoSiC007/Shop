
const db = require('./data/db');

let {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull
} = require('graphql');

/** Тип Создателя **/
const CreatorType = new GraphQLObjectType({
    name: 'Creator',
    description: 'This all of Creators',

    fields: () => {
        return {
            id: {
                type:  GraphQLNonNull(GraphQLString),
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
                description: 'Показать всех создателей',
                resolve() {
                    return db.models.creators.findAll();
                }
            },
            creator: {
                type: CreatorType,
                description: 'Найти пользователя по id',
                args: {
                    id: {type: GraphQLString}
                },
                resolve: (value, {id}) => {
                    return db.models.creators.findByPk(id).catch( err => {
                        return Promise.reject(err)
                    });
                }
            }
        }
    }
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'This is mutation',
    fields: () => ({
        createCreator: {
            type: CreatorType,
            description: 'Добавить нового создателя',
            args: {
                name: {type: GraphQLString}
            },
            resolve: (value, {name}) => {
                return db.models.creators.create({name: name},{returning: true})
            }
        }
    })
});
const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
module.exports = Schema;

