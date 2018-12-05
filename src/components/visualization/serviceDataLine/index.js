import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFauxDOM } from 'react-faux-dom';
import { compose, withState } from 'recompose';
import styled from 'styled-components';
import StringUtils from '../../../stringUtils';
import shapes from '../../shapes';
import ServiceDataGraphDrawer from './serviceDataGraphDrawer';
import styleConstants from '../../../styleConstants';

const StyledDiv = styled.div`
	background-color: ${styleConstants.PRIMARY_COLOR};
`;

const StyledChartDiv = styled.div`
	.line {
		stroke: ${styleConstants.ACCENT_COLOR};
		fill: ${styleConstants.PRIMARY_COLOR};
	}

	.data-circle {
		stroke: ${styleConstants.SECONDARY_ACCENT_COLOR};
		fill: white;

		&:hover {
			fill: ${styleConstants.SECONDARY_ACCENT_COLOR};
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

	componentDidMount() {
		const {
			serviceData,
			setDisplayedHits,
			setDisplayedDate,
			connectFauxDOM,
			animateFauxDOM,
			showDataPointCircles,
		} = this.props;

		// Create faux DOM to write to
		const faux = connectFauxDOM('svg', 'chart');

		ServiceDataGraphDrawer.draw(
			faux,
			serviceData,
			setDisplayedHits,
			setDisplayedDate,
			showDataPointCircles,
			serviceData.length > 200,
		);

		animateFauxDOM(5000);
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
	showDataPointCircles: PropTypes.bool,
};

ServiceDataLine.defaultProps = {
	displayedDate: undefined,
	displayedHits: '',
	chart: null,
	showDataPointCircles: false,
};

const EnhancedServiceDataLine = compose(
	withState('displayedHits', 'setDisplayedHits', ''),
	withState('displayedDate', 'setDisplayedDate'),
	withFauxDOM,
)(ServiceDataLine);

export default EnhancedServiceDataLine;
