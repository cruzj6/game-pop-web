import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import serviceQueries from '../../gqlQueries/services';
import constants from '../../constants';
import GameListItem from '../gameListItem';

const ServiceHitsList = ({ gameName, serviceName }) => (
	<Query
		query={serviceQueries.SERVICE_QUERY}
		variables={{ gameName, serviceName, fromDate: '1526571669043' }}
	>
		{
			({ data: { Service = [] } = {} }) => (
				<ul>
					{
						Service.map(({ game: { name }, hits, date }) => (
							<GameListItem
								hits={hits}
								name={name}
								controlsEnabled={false}
								date={new Date(Number(date))}
								serviceName={constants.SERVICE_NAMES.TWITCH}
							/>
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
