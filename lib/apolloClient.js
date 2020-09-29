import { withApollo } from 'next-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

const path = require('path')
const fullDbpath = path.resolve('data.db')


let filename
console.log('dirname', __dirname)
console.log('filename', __filename)
console.log('fullDbPath', fullDbpath)
console.log('process.cwd()', process.cwd())
console.log('resolve', path.resolve('.'))
//
// (async () => {
//   const res = await fetch('/.netlify/functions/hostname')
// })()


// declare const process
let graphqlServerUrl
let hostname
if (process.env.NODE_ENV === 'production') {
   // graphqlServerUrl = 'https://5f70c9404936ac52d0454bc5--zen-carson-609513.netlify.app/.netlify/functions/graphql'
   graphqlServerUrl = '/.netlify/functions/graphql'
}

if (process.env.NODE_ENV === 'development') {
  graphqlServerUrl = 'http://localhost:9000/.netlify/functions/graphql'
}

console.log('process.env.NODE_ENV', process.env.NODE_ENV)


const fullDbPath2 = path.join(process.cwd(), path.sep + 'data.db')
console.log('fullDbPath2', fullDbPath2);

const apolloClient = new ApolloClient({
  uri: graphqlServerUrl,
  cache: new InMemoryCache(),
});


export default withApollo(apolloClient)