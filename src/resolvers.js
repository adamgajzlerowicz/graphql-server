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
        notify: () => {
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

