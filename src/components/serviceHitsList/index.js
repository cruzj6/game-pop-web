import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import * as R from 'ramda';
import constants from '../../constants';
import GameServiceDataList from '../gameServiceDataList';

const GAME_ON_SERVICE_QUERY = gql`
	query GameOnService($searchTerms: String!, $serviceName: ServiceType!) {
		GameSearch (
			searchTerms: $searchTerms,
			serviceName: $serviceName
		) {
			game {
				name
			},
			hits,
			date
		}
	}
`;

const ServiceHitsList = ({ onItemClick, gameName, serviceName }) => (
	<Query
		query={GAME_ON_SERVICE_QUERY}
		variables={{
			searchTerms: R.trim(gameName),
			serviceName,
		}}
	>
		{
			({ loading, data: { GameSearch = [] } = {} }) => (
				loading
					? <p>Searching...</p>
					: <GameServiceDataList onItemClick={onItemClick} serviceData={GameSearch} />
			)
		}
	</Query>
);

ServiceHitsList.propTypes = {
	gameName: PropTypes.string.isRequired,
	serviceName: PropTypes.oneOf(Object.values(constants.SERVICE_NAMES)).isRequired,
	onItemClick: PropTypes.func.isRequired,
};

export default compose(
	withRouter,
	withHandlers({
		onItemClick({ history }) {
			return (name, serviceName) => history.push(`/gamehistory/${name}/${serviceName}`);
		},
	}),
)(ServiceHitsList);
