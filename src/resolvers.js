import {PubSub} from 'graphql-subscriptions';

let lunch = {
    lunchAt: '00000',
    oneOFive: 'MAYBE',
    oneOThree: 'MAYBE'
};

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
        }
    },
    Subscription: {
        lunchUpdated: {
            subscribe: () => pubsub.asyncIterator(LUNCH_UPDATED)
        }
    }
};
