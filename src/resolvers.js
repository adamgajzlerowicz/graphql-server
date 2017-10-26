import {PubSub} from 'graphql-subscriptions';
import moment from 'moment';
// import {
//     GraphQLString,
//     GraphQLObjectType,
//     GraphQLSchema
// } from 'graphql';

import {notify} from "./functions";

let lunch = {
    lunchAt: moment().hour(12).minutes(0).seconds(0),
    oneOFive: 'MAYBE',
    oneOThree: 'MAYBE'
};

notify({
    oneOFive: 'YES',
    oneOThree: 'NO'
});

const LUNCH_UPDATED = 'lunchUpdated';

const pubsub = new PubSub();


export const resolvers = {
    Query: {
        lunch: () => {
            return lunch;
        }
    },
    Mutation: {
        updateLunch: (root, args) => {
            lunch = args;
            pubsub.publish(LUNCH_UPDATED, {lunchUpdated: args});
            return lunch;
        },
        notify: () =>{
            notify(lunch);
            return lunch;
        }
    },
    Subscription: {
        lunchUpdated: {
            subscribe: () => pubsub.asyncIterator(LUNCH_UPDATED)
        }
    }
};

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
