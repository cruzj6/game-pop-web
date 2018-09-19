import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFauxDOM } from 'react-faux-dom';
import { compose, withState } from 'recompose';
import styled from 'styled-components';
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

		&:hover + .data-circle {
			fill: green;
		}
	}
`;

class ServiceDataLine extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidUpdate(prevProps) {
		const {
			serviceData,
			setDisplayedHits,
			setDisplayedDate,
			displayedDate,
			connectFauxDOM,
			animateFauxDOM,
		} = this.props;

		// If we get new service data, re-draw and re-animate the graph
		if (prevProps.serviceData !== serviceData) {
			// Create faux DOM to write to
			const faux = connectFauxDOM('svg', 'chart');

			ServiceDataGraphDrawer.draw(
				faux,
				serviceData,
				setDisplayedHits,
				setDisplayedDate,
				displayedDate,
			);

			animateFauxDOM(10000);
		}
	}

	render() {
		const {
			displayedDate,
			displayedHits,
			chart,
		} = this.props;

		return (
			<StyledDiv>
				<span>Hits: {displayedHits}</span>
				<br />
				<span>Date: {displayedDate && StringUtils.getMMDDYYYY(displayedDate)}</span>
				<StyledChartDiv>
					{chart}
				</StyledChartDiv>
			</StyledDiv>
		);
	}
}

ServiceDataLine.propTypes = {
	connectFauxDOM: PropTypes.func.isRequired,
	animateFauxDOM: PropTypes.func.isRequired,
	chart: PropTypes.element,
	displayedDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	displayedHits: PropTypes.string,
	setDisplayedHits: PropTypes.func.isRequired,
	setDisplayedDate: PropTypes.func.isRequired,
	serviceData: PropTypes.arrayOf(PropTypes.shape(shapes.ServiceData)).isRequired,
};

ServiceDataLine.defaultProps = {
	displayedDate: undefined,
	displayedHits: '',
	chart: null,
};

const EnhancedServiceDataLine = compose(
	withState('displayedHits', 'setDisplayedHits', ''),
	withState('displayedDate', 'setDisplayedDate'),
	withFauxDOM,
)(ServiceDataLine);

export default EnhancedServiceDataLine;
