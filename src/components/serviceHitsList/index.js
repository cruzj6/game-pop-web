import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import serviceQueries from '../../gqlQueries/services';
import constants from '../../constants';

const ServiceHitsList = ({ gameName, serviceName }) => (
	<Query query={serviceQueries.SERVICE_QUERY} variables={{ gameName, serviceName }}>
		{
			({ data: { Service = [] } = {} }) => (
				<ul>
					{
						Service.map(({ game: { name }, hits }) => <li>{`${name}:${hits}`}</li>)
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
