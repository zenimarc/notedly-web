// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import Pages from './pages';
import GlobalStyle from './components/GlobalStyle';

// configure our API URI & cache
const uri = process.env.API_URI;

const httpLink = createHttpLink({ uri });

const cache = new InMemoryCache();

// check for a token and return the headers to the context previousContext -> { headers }
const setAuthLink = setContext((request, { headers }) => ({
  headers: {
    ...headers,
    authorization: localStorage.getItem('token') || ''
  }
}));

// configure apollo client
const client = new ApolloClient({
  link: setAuthLink.concat(httpLink),
  uri,
  cache,
  resolvers: {},
  connectToDevTools: true
});

const data = {
  isLoggedIn: !!localStorage.getItem('token')
};

cache.writeData({ data });

client.onResetStore(() => {
  cache.writeData({ data });
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

// to instruct react to render our app within the indicated div
ReactDOM.render(<App />, document.getElementById('root'));
