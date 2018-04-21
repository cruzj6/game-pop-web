import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { Query } from 'react-apollo';
import PopularList from './popularList';
import serviceQueries from '../../gqlQueries/services';
import constants from '../../constants';

export default compose(
	setPropTypes({
		serviceName: PropTypes.oneOf(Object.values(constants.SERVICE_NAMES)),
	}),
)(({ serviceName }) => (
	<Query query={serviceQueries.POPULAR_QUERY} variables={{ serviceName }}>
		{
			({ loading, error, data }) => {
				if (error) {
					console.log(error);
					return null;
				}
				if (loading) {
					return <span>Loading...</span>;
				}

				return <PopularList listItems={data.Popular} />;
			}
		}
	</Query>
));
