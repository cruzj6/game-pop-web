import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { Query } from 'react-apollo';
import PopularList from './popularList';
import serviceQueries from '../../gqlQueries/services';
import constants from '../../constants';
import StyledHeader from '../../styledComponents/styledHeading';

export default compose(
	setPropTypes({
		serviceName: PropTypes.oneOf(Object.values(constants.SERVICE_NAMES)),
	}),
)(({ serviceName }) => (
	<div>
		<StyledHeader>
			Top Games on {serviceName.toUpperCase()} (Highest peak players in last 7 days)
		</StyledHeader>
		<Query query={serviceQueries.POPULAR_QUERY} variables={{ serviceName }}>
			{
				({ loading, error, data }) => {
					if (error) {
						return <span>Error fetching popular data for {serviceName} service</span>;
					}
					if (loading) {
						return <span>Loading...</span>;
					}

					return data.Popular.length > 0
						? <PopularList listItems={data.Popular} serviceName={serviceName} />
						: <span>Seems nothing was found for {serviceName} service</span>;
				}
			}
		</Query>
	</div>
));
