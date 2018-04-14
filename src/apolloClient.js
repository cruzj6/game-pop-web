import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import constants from './constants';

const client = new ApolloClient({
	link: new HttpLink({
		uri: constants.GAMEPOP_GRAPHQL_URL,
	}),
	cache: new InMemoryCache(),
});

export default client;
