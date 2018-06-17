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
			Top Games on {serviceName.toUpperCase()} (Highest peak players during week)
		</StyledHeader>
		<Query query={serviceQueries.POPULAR_QUERY} variables={{ serviceName }}>
			{
				({ loading, error, data }) => {
					if (error) {
						return null;
					}
					if (loading) {
						return <span>Loading...</span>;
					}

					return <PopularList listItems={data.Popular} serviceName={serviceName} />;
				}
			}
		</Query>
	</div>
));
