import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import shapes from '../shapes';
import GameDataPointListItem from './item';

const GameDataPointList = ({ dataPoints }) => (
	<ul>
		{
			R.map(dataPoint => (
				<GameDataPointListItem {...dataPoint} />
			), dataPoints)
		}
	</ul>
);

GameDataPointList.fragments = gql`
	fragment dataPoint on ServiceDataItem {
		hits
		date
	}
`;

GameDataPointList.propTypes = {
	dataPoints: PropTypes.arrayOf(PropTypes.shape(shapes.ServiceData)),
};

GameDataPointList.defaultProps = {
	dataPoints: [],
};

export default GameDataPointList;
