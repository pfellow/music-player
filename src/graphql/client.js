import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { GET_QUEUED_SONGS } from './queries';
import key from '../key.json';

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://advanced-giraffe-98.hasura.app/v1/graphql',
    options: {
      reconnect: true
    },
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': key.authToken
      }
    }
  })
);

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
  typeDefs: gql`
    type Song {
      id: uuid!
      title: String!
      artist: String!
      duration: Float!
      thumbnail: String!
      url: String!
    }

    input SongInput {
      id: uuid!
      title: String!
      artist: String!
      duration: Float!
      thumbnail: String!
      url: String!
    }

    type Query {
      queue: [Song]!
    }

    type Mutation {
      addOrRemoveFromQueue(input: SongInput!): [Song]!
    }
  `,
  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, { input }, { cache }) => {
        const queryResult = cache.readQuery({
          query: GET_QUEUED_SONGS
        });
        if (queryResult) {
          const { queue } = queryResult;
          const isInQueue = queue.some((song) => song.id === input.id);
          const newQueue = isInQueue
            ? queue.filter((song) => song.id !== input.id)
            : [...queue, input];
          cache.writeQuery({
            query: GET_QUEUED_SONGS,
            data: { queue: newQueue }
          });
          return newQueue;
        }
        return [];
      }
    }
  }
});

const hasQueue = Boolean(localStorage.getItem('queue'));

const data = {
  queue: hasQueue ? JSON.parse(localStorage.getItem('queue')) : []
};

client.writeQuery({ query: GET_QUEUED_SONGS, data });

export default client;
