import { ApolloClient, InMemoryCache } from "@apollo/client";

const config = {
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `bearer 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`,
  },
  cache: new InMemoryCache(),
};

export const gqlClient = new ApolloClient(config);
