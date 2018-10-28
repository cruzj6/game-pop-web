import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes, defaultProps } from 'recompose';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PopularList from './popularList';
import constants from '../../constants';

const TOP_QUERY = gql`
	query PopularForService($serviceName: ServiceType!) {
		Popular (serviceName: $serviceName) {
			...topGameServiceData
		}
	}
	${PopularList.fragments}
`;

export default compose(
	setPropTypes({
		serviceName: PropTypes.oneOf(Object.values(constants.SERVICE_NAMES)),
		max: PropTypes.number,
	}),
	defaultProps({
		max: null,
	}),
)(({ serviceName, max }) => (
	<div>
		<Query query={TOP_QUERY} variables={{ serviceName }}>
			{
				({ loading, error, data }) => {
					if (error) {
						return <span>Error fetching popular data for {serviceName} service</span>;
					}
					if (loading) {
						return <span>Loading...</span>;
					}

					return data.Popular.length > 0
						? <PopularList
							listItems={max ? data.Popular.slice(0, max) : data.Popular}
							serviceName={serviceName}
						/>
						: <span>Seems nothing was found for {serviceName} service</span>;
				}
			}
		</Query>
	</div>
));
