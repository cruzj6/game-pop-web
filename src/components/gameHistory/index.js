import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose, mapProps, withState, withProps } from 'recompose';
import styled from 'styled-components';
import * as R from 'ramda';
import moment from 'moment';
import gql from 'graphql-tag';
import GameButtons from '../gameButtons';
import constants from '../../constants';
import StyledHeader from '../../styledComponents/styledHeading';
import messageBundle from '../../messageBundle';
import StyledButton from '../../styledComponents/styledButton';
import GameDataPointList from '../gameDataPointList';
import GameHistoryGraph from './graph';
import shapes from '../shapes';

const RangeSelectButtons = styled.div`
	margin: 20px 20px 20px 0;
`;

const Heading = styled(StyledHeader)`
	display: inline-block;
`;

const rangeDays = {
	[constants.DATE_RANGE_OPTIONS.ONE_WEEK]: 7,
	[constants.DATE_RANGE_OPTIONS.TWO_WEEKS]: 14,
	[constants.DATE_RANGE_OPTIONS.ONE_MONTH]: 30,
	[constants.DATE_RANGE_OPTIONS.SIX_MONTHS]: 180,
};

const getDateFromRangeOption = (rangeOption) => {
	const rangeAgo = new Date();
	rangeAgo.setDate(rangeAgo.getDate() - rangeDays[rangeOption]);
	return rangeAgo.getTime().toString();
};

const GAME_HISTORY_QUERY = gql`
	query GameHistoryQuery($gameName: String!, $serviceName: ServiceType!, $fromDate: String!, $maxResults: Int) {
		Service (
			gameName: $gameName,
			date: $fromDate,
			maxResults: $maxResults,
			serviceName: $serviceName
		) {
			...dataPoint
		}
	}

	${GameDataPointList.fragments}
`;

const GameHistory = ({
	name,
	serviceName,
	selectedRange,
	setSelectedRange,
	gameDataPointLists,
	serviceData,
	loading,
}) => (
	<div>
		<Heading>{name}</Heading>
		<GameButtons
			buttonSize="large"
			serviceName={serviceName}
			name={name}
		/>
		<RangeSelectButtons>
			<span>Hits in last: </span>
			{
				R.map(option => (
					<StyledButton
						key={option}
						unselected={selectedRange !== option}
						onClick={() => setSelectedRange(option)}
					>
						{messageBundle.DATE_RANGE_OPTION_STRINGS[option]}
					</StyledButton>
				), R.values(constants.DATE_RANGE_OPTIONS))
			}
		</RangeSelectButtons>
		{
			loading
				? <span>Loading...</span>
				: (
					<Fragment>
						<GameHistoryGraph
							gameName={name}
							serviceData={serviceData}
							currentRange={selectedRange}
						/>
						<h3>View history datapoints</h3>
						{
							R.map(([month, dataPoints]) => (
								<div key={month}>
									{month}
									<GameDataPointList dataPoints={dataPoints} />
								</div>
							), gameDataPointLists)
						}
					</Fragment>
				)
		}
	</div>
);

GameHistory.propTypes = {
	name: PropTypes.string.isRequired,
	serviceName: PropTypes.oneOf(Object.values(constants.SERVICE_NAMES)).isRequired,
	selectedRange: PropTypes.string.isRequired,
	setSelectedRange: PropTypes.func.isRequired,
	gameDataPointLists: PropTypes.array.isRequired,
	serviceData: PropTypes.arrayOf(PropTypes.shape(shapes.ServiceData)).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default compose(
	withState('selectedRange', 'setSelectedRange', constants.DATE_RANGE_OPTIONS.ONE_WEEK),
	mapProps(({ match, ...rest }) => ({
		name: match.params.name,
		serviceName: match.params.serviceName,
		...rest,
	})),
	graphql(GAME_HISTORY_QUERY, {
		options: ({ name, serviceName, selectedRange }) => ({
			variables: { gameName: name, serviceName, fromDate: getDateFromRangeOption(selectedRange) },
		}),
	}),
	withProps(({ data: { loading, Service: serviceData = [] } }) => ({
		serviceData,
		loading,
		gameDataPointLists: R.compose(
			R.reverse,
			R.toPairs,
			R.groupBy(dataPoint => moment(Number(dataPoint.date)).format('MMMM')),
		)(serviceData),
	})),
)(GameHistory);
