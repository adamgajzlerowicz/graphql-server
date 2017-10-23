import {
  makeExecutableSchema
} from 'graphql-tools';

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
}

type Subscription {
    lunchUpdated: Lunch
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
