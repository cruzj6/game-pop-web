import React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { compose, mapProps } from 'recompose';
import * as dataTransforms from 'game-pop-data-transforms';
import shapes from '../shapes';
import GameDataPointListItem from './item';

const DataPointList = styled.ul`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	max-width: 1500px;
`;

const GameDataPointList = ({ averageDataPoints }) => (
	<DataPointList>
		{
			R.map(averageDataPoint => (
				<GameDataPointListItem
					key={averageDataPoint.week}
					weekNumber={averageDataPoint.week}
					hits={averageDataPoint.average}
				/>
			), averageDataPoints)
		}
	</DataPointList>
);

GameDataPointList.propTypes = {
	averageDataPoints: PropTypes.arrayOf(PropTypes.shape(shapes.ServiceData)),
};

GameDataPointList.defaultProps = {
	averageDataPoints: [],
};

const EnhancedGameDataPointList = compose(
	mapProps((props) => {
		const averageDataPoints = dataTransforms.average_by_week(props.dataPoints);

		return {
			averageDataPoints: R.sortBy(R.prop('week'))(averageDataPoints),
			...props,
		};
	}),
)(GameDataPointList);

EnhancedGameDataPointList.fragments = gql`
	fragment dataPoint on ServiceDataItem {
		hits
		date
	}
`;

export default EnhancedGameDataPointList;
