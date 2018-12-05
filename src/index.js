import React from 'react';
import { injectGlobal } from 'styled-components';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import App from './app';
import apolloClient from './apolloClient';
import styleConstants from './styleConstants';
import '../index.html';

/* eslint-disable no-unused-expressions */
injectGlobal`
	body {
		font-family: helvetica;
		color: ${styleConstants.PRIMARY_TEXT_COLOR};
		background-color: ${styleConstants.PAGE_COLOR};
		margin: 0;
		width: auto;
		max-height: 1000px;
	}

	#root {
		height: 100%;
	}
`;
/* eslint-enable no-unused-expressions */

ReactDOM.render(
	<ApolloProvider client={apolloClient}>
		<App />
	</ApolloProvider>,
	document.getElementById('root'), //eslint-disable-line
);
