import {
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';

import {PubSub} from 'graphql-subscriptions';
import moment from 'moment';

import {notify} from "./functions";

let lunch = {
    lunchAt: moment().hour(12).minutes(0).seconds(0),
    oneOFive: 'MAYBE',
    oneOThree: 'MAYBE'
};

const LUNCH_UPDATED = 'lunchUpdated';
const pubsub = new PubSub();

const LunchType = new GraphQLObjectType({
        name: 'lunch',
        fields: {
            lunchAt: {
                type: GraphQLString
            },
            oneOThree: {
                type: GraphQLString
            },
            oneOFive: {
                type: GraphQLString
            }
        }
    }
);

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'root',
        fields: () => ({
            lunch: {
                type: LunchType,
                resolve: () => lunch
            }
        })
    }),
    mutation: new GraphQLObjectType({
        name: 'mutation',
        fields: {
            updateLunch: {
                type: LunchType,
                args: {
                    lunchAt: {
                        type: GraphQLString
                    },
                    oneOThree: {
                        type: GraphQLString
                    },
                    oneOFive: {
                        type: GraphQLString
                    }
                },
                resolve: (_, args) => {
                    lunch = args;
                    pubsub.publish(LUNCH_UPDATED, {lunchUpdated: args});
                    return lunch;
                }
            },
            notify: {
                name: 'notify',
                type: LunchType,
                resolve: () => {
                    notify(lunch);
                    return lunch;
                }
            }
        }
    }),
    subscription: new GraphQLObjectType({
        name: 'subscriptions',
        fields: {
            lunchUpdated: {
                type: LunchType,
                subscribe: () => pubsub.asyncIterator(LUNCH_UPDATED)
            }
        }
    })
});


export {schema};

