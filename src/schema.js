import {
  makeExecutableSchema
} from 'graphql-tools';
// import {
//     GraphQLString,
//     GraphQLObjectType,
//     GraphQLSchema
// } from 'graphql';

// const lunchType = new GraphQLObjectType({
//     name: 'lunch',
//     fields: {
//         lunchAt: {
//             type: new GraphQLString,
//             resolve(data) {
//                 return data.lunchAt;
//             }
//         },
//         oneOThree: {
//             type: new GraphQLString,
//             resolve(data) {
//                 return data.oneOThree;
//             }
//         },
//         oneOFive: {
//             type: new GraphQLString,
//             resolve(data) {
//                 return data.oneOFive;
//             }
//         },
// });
//
// export const resolver = new GraphQLSchema({
//     query: {
//         lunch: new GraphQLObjectType({
//             type: lunchType
//         })
//     },
//     mutation: new GraphQLObjectType({}),
//     subscription: new GraphQLObjectType({})
// });

import { resolvers } from './resolvers';

const typeDefs = `

type Lunch {
  lunchAt: String!
  oneOFive: String!
  oneOThree: String!
}

type Query {
  lunch: Lunch
}

type Mutation {
  updateLunch(lunchAt: String, oneOFive: String, oneOThree: String): Lunch
  notify: Lunch
}

type Subscription {
    lunchUpdated: Lunch
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
