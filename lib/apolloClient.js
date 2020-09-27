import { withApollo } from 'next-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'https://5f70c9404936ac52d0454bc5--zen-carson-609513.netlify.app/.netlify/functions/graphql',
  cache: new InMemoryCache(),
});

export default withApollo(apolloClient)