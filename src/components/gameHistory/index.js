import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { compose, mapProps, withState } from 'recompose';
import styled from 'styled-components';
import * as R from 'ramda';
import gql from 'graphql-tag';
import GameButtons from '../gameButtons';
import constants from '../../constants';
import ServiceDataLine from '../visualization/serviceDataLine';
import GameServiceDataList from '../gameServiceDataList';
import StyledHeader from '../../styledComponents/styledHeading';
import messageBundle from '../../messageBundle';
import StyledButton from '../../styledComponents/styledButton';

const RangeSelectButtons = styled.div`
	margin: 20px 20px 20px 0;
`;

const Heading = styled(StyledHeader)`
	display: inline-block;
`;

const GraphContainerDiv = styled.div`
	height: 500px;
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
			...gameListItem
		}
	}

	${GameServiceDataList.fragments}
`;

const GameHistory = ({
	name,
	serviceName,
	selectedRange,
	setSelectedRange,
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
		<Query
			query={GAME_HISTORY_QUERY}
			variables={{ gameName: name, serviceName, fromDate: getDateFromRangeOption(selectedRange) }}
		>
			{
				({ loading, data: { Service = [] } = {} }) => (
					<Fragment>
						<GraphContainerDiv>
							{
								loading
									? <span>Loading...</span>
									: (
										<ServiceDataLine
											name={name}
											serviceData={Service}
											showDataPointCircles={
												R.contains(
													selectedRange,
													[
														constants.DATE_RANGE_OPTIONS.ONE_WEEK,
														constants.DATE_RANGE_OPTIONS.TWO_WEEKS,
													],
												)
											}
										/>
									)
							}
						</GraphContainerDiv>
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
	selectedRange: PropTypes.string.isRequired,
	setSelectedRange: PropTypes.func.isRequired,
};

export default compose(
	withState('selectedRange', 'setSelectedRange', constants.DATE_RANGE_OPTIONS.ONE_WEEK),
	mapProps(({ match, ...rest }) => ({
		name: match.params.name,
		serviceName: match.params.serviceName,
		...rest,
	})),
)(GameHistory);
