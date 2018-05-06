import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import serviceQueries from '../../gqlQueries/services';
import constants from '../../constants';
import GameListItem from '../gameListItem';

const ServiceHitsList = ({ gameName, serviceName }) => (
	<Query query={serviceQueries.SERVICE_QUERY} variables={{ gameName, serviceName }}>
		{
			({ data: { Service = [] } = {} }) => (
				<ul>
					{
						Service.map(({ game: { name }, hits }) => (
							<GameListItem hits={hits} name={name} link={`${constants.TWITCH_WATCH_URL}${name}`} />
						))
					}
				</ul>
			)
		}
	</Query>
);

ServiceHitsList.propTypes = {
	gameName: PropTypes.string.isRequired,
	serviceName: PropTypes.oneOf(Object.values(constants.SERVICE_NAMES)).isRequired,
};

export default ServiceHitsList;
