import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import serviceQueries from '../../gqlQueries/services';

const ServiceHitsList = ({ gameName }) => (
	<Query query={serviceQueries.TWITCH_QUERY} variables={{ gameName }}>
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
};

export default ServiceHitsList;
