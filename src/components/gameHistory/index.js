import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { compose, mapProps } from 'recompose';
import GameButtons from '../gameButtons';
import constants from '../../constants';
import serviceQueries from '../../gqlQueries/services';
import ServiceDataLine from '../visualization/serviceDataLine';
import GameServiceDataList from '../gameServiceDataList';
import StyledHeader from '../../styledComponents/styledHeading';

const Heading = StyledHeader.extend`
	display: inline-block;
`;

const getTwoWeeksAgo = () => {
	const twoWeeksAgo = new Date();
	twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
	return twoWeeksAgo.getTime();
};

const GameHistory = ({ name, serviceName }) => (
	<div>
		<Heading>{name}</Heading>
		<GameButtons
			buttonSize="large"
			serviceName={serviceName}
			name={name}
		/>
		<Query
			query={serviceQueries.SERVICE_QUERY}
			variables={{ gameName: name, serviceName, fromDate: getTwoWeeksAgo() }}
		>
			{
				({ data: { Service = [] } = {} }) => (
					<Fragment>
						<ServiceDataLine
							name={name}
							serviceData={Service}
						/>
						<h3>View history datapoints</h3>
						<GameServiceDataList serviceData={Service} />
					</Fragment>
				)
			}
		</Query>
	</div>
);

GameHistory.propTypes = {
	name: PropTypes.string.isRequired,
	serviceName: PropTypes.oneOf(Object.values(constants.SERVICE_NAMES)).isRequired,
};

export default compose(
	mapProps(({ match, ...rest }) => ({
		name: match.params.name,
		serviceName: match.params.serviceName,
		...rest,
	})),
)(GameHistory);
