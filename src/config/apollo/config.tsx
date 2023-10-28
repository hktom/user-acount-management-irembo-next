import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ApolloLink, from } from "apollo-link";
import Cookies from "js-cookie";

import { HttpLink } from "apollo-link-http";

export const HOST_URL: string = "https://apigate.moringapp.com/";

export const TOKEN = Cookies.get("token");

const httpLink = new HttpLink({ uri: `${HOST_URL}graphql` });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: "Bearer " + TOKEN,
    },
  }));

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink]) as any,
});

export const queryMethods = async (object: any) => {
  try {
    return await apolloClient.query({
      query: gql`
          ${object}
        `,
    });
  } catch (error) {
    return { message: error };
  }
};

export const mutateMethods = async (object: any) => {
  try {
    return await apolloClient.mutate({
      mutation: gql`
          ${object}
        `,
    });
  } catch (error) {
    return { error: error };
  }
};
