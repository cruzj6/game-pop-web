import React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
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
