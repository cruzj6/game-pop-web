import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';
import { compose, mapProps, withHandlers, withState } from 'recompose';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import constants from '../../constants';
import serviceQueries from '../../gqlQueries/services';

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

const getTwoWeeksAgo = () => {
	const twoWeeksAgo = new Date();
	twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
	return twoWeeksAgo.getTime();
};

const PopularityChart = ({
	displayedDate,
	displayedHits,
	renderChart,
	name,
	serviceName,
}) => (
	<Query
		query={serviceQueries.SERVICE_QUERY}
		variables={{ gameName: name, serviceName, fromDate: getTwoWeeksAgo() }}
	>
		{
			({ data: { Service = [] } = {} }) => (
				<StyledDiv>
					<span>Here is some data for {name}</span>
					<span>Hits: {displayedHits}</span>
					<br />
					<span>Date: {displayedDate && `${displayedDate.getMonth() + 1}/${displayedDate.getDate()}/${displayedDate.getFullYear()}`}</span>
					<StyledChartDiv>
						{renderChart(Service)}
					</StyledChartDiv>
				</StyledDiv>
			)
		}
	</Query>
);

PopularityChart.propTypes = {
	displayedDate: PropTypes.instanceOf(Date),
	displayedHits: PropTypes.string,
	renderChart: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	serviceName: PropTypes.oneOf(constants.SERVICE_NAMES).isRequired,
};

PopularityChart.defaultProps = {
	displayedDate: undefined,
	displayedHits: '',
};

const EnhancedPopularityChart = compose(
	mapProps(({ match, ...rest }) => ({
		name: match.params.name,
		serviceName: match.params.serviceName,
		...rest,
	})),
	withState('displayedHits', 'setDisplayedHits', ''),
	withState('displayedDate', 'setDisplayedDate', new Date()),
	withHandlers({
		renderChart({ setDisplayedHits, setDisplayedDate, displayedDate }) {
			return (serviceData) => {
				const GRAPH_HEIGHT = 300;
				const GRAPH_WIDTH = 1000;
				const faux = ReactFauxDOM.createElement('svg');

				const translate = (x, y) => `translate(${x}, ${y})`;
				const px = n => `${n}px`;

				const scaleRange = d3
					.scaleLinear()
					.range([GRAPH_HEIGHT, 0])
					.domain([0, d3.max(serviceData, ({ hits }) => Number(hits))]);

				const scaleDomain = d3
					.scaleLinear()
					.range([0, GRAPH_WIDTH])
					.domain(d3.extent(serviceData, serviceItem => serviceItem.date));

				const chartSvg = d3.select(faux)
					.style('height', px(GRAPH_HEIGHT))
					.style('width', px(GRAPH_WIDTH))
					.append('g')
					.style('height', px(GRAPH_HEIGHT))
					.attr('transform', translate(0, 0));

				// create 'g' to hold 'rect'
				const line = d3.line()
					.x(serviceItem => scaleDomain(serviceItem.date))
					.y(serviceItem => scaleRange(serviceItem.hits));

				// append a path element with the coords from the line
				chartSvg.append('path')
					.attr('class', 'line')
					.data([serviceData])
					.attr('d', line);

				// Build mouseover data-point circles
				const pointRadius = 5;
				const dataPoints = chartSvg.selectAll('g')
					.data(serviceData)
					.enter()
					.append('g');

				// Create a mouseover zone for each point
				const dataPointZone = dataPoints
					.append('rect')
					.attr('transform', serviceItem => (
						translate(
							scaleDomain(serviceItem.date) - pointRadius,
							0,
						)
					))
					.attr('width', pointRadius)
					.attr('height', GRAPH_HEIGHT)
					.attr('class', 'data-zone');

				// Set displayed hits on mouseover
				dataPointZone.on('mouseover', ({ date, hits }) => {
					setDisplayedHits(hits);
					setDisplayedDate(new Date(Number(date)));
				});

				// Create circle on graph to indicate data point
				dataPoints
					.append('circle')
					.attr('transform', serviceItem => (
						translate(
							scaleDomain(serviceItem.date) - pointRadius,
							scaleRange(serviceItem.hits) - pointRadius,
						)
					))
					.attr('cx', pointRadius)
					.attr('cy', pointRadius)
					.attr('r', pointRadius)
					.attr('class', serviceItem => (
						serviceItem.date === displayedDate.getTime().toString()
							? 'data-circle-filled'
							: 'data-circle'
					));

				return faux.toReact();
			};
		},
	}),
)(PopularityChart);

export default EnhancedPopularityChart;
