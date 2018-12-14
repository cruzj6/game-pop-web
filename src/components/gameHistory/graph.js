import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as R from 'ramda';
import ServiceDataLine from '../visualization/serviceDataLine';
import constants from '../../constants';
import shapes from '../shapes';

const GraphContainerDiv = styled.div`
	height: 500px;
`;

const GameHistoryGraph = ({ serviceData, gameName, currentRange }) => (
	<GraphContainerDiv>
		{
			<ServiceDataLine
				name={gameName}
				serviceData={serviceData}
				showDataPointCircles={
					R.contains(
						currentRange,
						[
							constants.DATE_RANGE_OPTIONS.ONE_WEEK,
							constants.DATE_RANGE_OPTIONS.TWO_WEEKS,
						],
					)
				}
			/>
		}
	</GraphContainerDiv>
);

GameHistoryGraph.propTypes = {
	serviceData: PropTypes.arrayOf(PropTypes.shape(shapes.ServiceData)),
	gameName: PropTypes.string,
	currentRange: PropTypes.string,
};

GameHistoryGraph.defaultProps = {
	serviceData: [],
	gameName: '',
	currentRange: '',
};

export default GameHistoryGraph;
