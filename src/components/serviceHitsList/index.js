import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import serviceQueries from '../../gqlQueries/services';
import constants from '../../constants';
import GameServiceDataList from '../gameServiceDataList';

const ServiceHitsList = ({ gameName, serviceName }) => (
	<Query
		query={serviceQueries.SERVICE_QUERY}
		variables={{
			maxResults: 1,
			gameName,
			serviceName,
			fromDate: '0',
		}}
	>
		{
			({ data: { Service = [] } = {} }) => (
				<GameServiceDataList serviceData={Service} />
			)
		}
	</Query>
);

ServiceHitsList.propTypes = {
	gameName: PropTypes.string.isRequired,
	serviceName: PropTypes.oneOf(Object.values(constants.SERVICE_NAMES)).isRequired,
};

export default ServiceHitsList;
