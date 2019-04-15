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

const GameDataPointList = ({ dataPoints }) => (
	<DataPointList>
		{
			R.map(dataPoint => (
				<GameDataPointListItem key={dataPoint.date} {...dataPoint} />
			), dataPoints)
		}
	</DataPointList>
);

GameDataPointList.propTypes = {
	dataPoints: PropTypes.arrayOf(PropTypes.shape(shapes.ServiceData)),
};

GameDataPointList.defaultProps = {
	dataPoints: [],
};

const EnhancedGameDataPointList = compose(
	mapProps((props) => {
		console.log(props.dataPoints)
		const result = dataTransforms.average_by_week(props.dataPoints);

		console.log(result)

		return {
			// averageDataPoints:
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
