import React from 'react';
import PropTypes from 'prop-types';
import ReactFauxDOM from 'react-faux-dom';
import { compose, withHandlers, withState } from 'recompose';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import StringUtils from '../../../stringUtils';
import shapes from '../../shapes';
import ServiceDataGraphDrawer from './serviceDataGraphDrawer';

const StyledDiv = styled.div`
	color: black;
	background-color: white;
`;

const StyledChartDiv = styled.div`
	.line {
		stroke: red;
		fill: white;
	}

	.data-circle {
		stroke: green;
		fill: white;

		&:hover {
			fill: green;
			cursor: pointer;
		}
	}

	.data-circle-filled {
		fill: green;
		cursor: pointer;
	}

	.data-zone {
		stroke-opacity: 0;
		fill-opacity: 0;
	}
`;

const ServiceDataLine = ({
	displayedDate,
	displayedHits,
	renderChart,
	serviceData,
}) => (
	<StyledDiv>
		<span>Hits: {displayedHits}</span>
		<br />
		<span>Date: {displayedDate && StringUtils.getMMDDYYYY(displayedDate)}</span>
		<ReactTooltip afterShow={() => console.log('BAAH')} id="hits-tooltip">
			<span>Hits: {displayedHits}</span>
			<br />
			<span>Date: {displayedDate && StringUtils.getMMDDYYYY(displayedDate)}</span>
		</ReactTooltip>
		<StyledChartDiv>
			{renderChart(serviceData)}
		</StyledChartDiv>
	</StyledDiv>
);

ServiceDataLine.propTypes = {
	displayedDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	displayedHits: PropTypes.string,
	renderChart: PropTypes.func.isRequired,
	serviceData: PropTypes.arrayOf(PropTypes.shape(shapes.ServiceData)).isRequired,
};

ServiceDataLine.defaultProps = {
	displayedDate: undefined,
	displayedHits: '',
};

const EnhancedServiceDataLine = compose(
	withState('displayedHits', 'setDisplayedHits', ''),
	withState('displayedDate', 'setDisplayedDate'),
	withHandlers({
		renderChart({ setDisplayedHits, setDisplayedDate, displayedDate }) {
			return (serviceData) => {
				// Create faux DOM to write to
				const faux = ReactFauxDOM.createElement('svg');

				ServiceDataGraphDrawer.draw(
					faux,
					serviceData,
					setDisplayedHits,
					setDisplayedDate,
					displayedDate,
				);

				return faux.toReact();
			};
		},
	}),
)(ServiceDataLine);

export default EnhancedServiceDataLine;
