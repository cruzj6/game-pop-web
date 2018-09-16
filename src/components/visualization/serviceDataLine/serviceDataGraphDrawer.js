import * as d3 from 'd3';
import moment from 'moment';

const translate = (x, y) => `translate(${x}, ${y})`;
const px = n => `${n}px`;

// Graph dimensions
const GRAPH_CONTAINER_HEIGHT = 300;
const GRAPH_CONTAINER_WIDTH = 1000;
const MARGIN_SIZE = 40;
const GRAPH_END_X = GRAPH_CONTAINER_WIDTH - MARGIN_SIZE;
const GRAPH_END_Y = GRAPH_CONTAINER_HEIGHT - MARGIN_SIZE;

// Graph item sizes
const GUIDE_LINES_WIDTH = 2;
const GRAPH_POINT_CIRCLE_RADIUS = 5;

// Graph drawing base coordinates
const PATH_START_X = MARGIN_SIZE + GUIDE_LINES_WIDTH + GRAPH_POINT_CIRCLE_RADIUS;
const PATH_END_X = GRAPH_END_X - GRAPH_POINT_CIRCLE_RADIUS;
const PATH_START_Y = MARGIN_SIZE + GRAPH_POINT_CIRCLE_RADIUS;
const PATH_END_Y = GRAPH_CONTAINER_HEIGHT - MARGIN_SIZE - GRAPH_POINT_CIRCLE_RADIUS;

const getScalingFunctions = (serviceData) => {
	const scaleRange = d3
		.scaleLinear()
		.range([PATH_END_Y, PATH_START_Y])
		.domain([PATH_START_X, d3.max(serviceData, ({ hits }) => Number(hits))]);

	const scaleDomain = d3
		.scaleLinear()
		.range([PATH_START_X, PATH_END_X])
		.domain(d3.extent(serviceData, serviceItem => serviceItem.date));

	return {
		scaleRange,
		scaleDomain,
	};
};

const createRootSVG = (rootElement, onHitsHover, onDateHover) => (
	d3.select(rootElement)
		.style('height', px(GRAPH_CONTAINER_HEIGHT))
		.style('width', px(GRAPH_CONTAINER_WIDTH))
		.on('mouseleave', () => {
			onHitsHover('');
			onDateHover('');
		})
		.append('g')
		.style('height', px(GRAPH_CONTAINER_HEIGHT))
		.attr('transform', translate(0, 0))
);

const drawDataLine = (
	graphSVG,
	serviceData,
	scaleDomain,
	scaleRange,
) => {
	// get line coords
	const line = d3.line()
		.x(serviceItem => scaleDomain(serviceItem.date))
		.y(serviceItem => scaleRange(serviceItem.hits));

	// append a path element with the coords from the line
	graphSVG.append('path')
		.attr('class', 'line')
		.data([serviceData])
		.attr('d', line);
};

const createDataPointCircles = (
	graphSVG,
	serviceData,
	scaleDomain,
	scaleRange,
	onHitsHover,
	onDateHover,
	displayedDate,
) => {
	// Build mouseover data-point circles
	const dataPoints = graphSVG.selectAll('g')
		.data(serviceData)
		.enter()
		.append('g');

	// Create a mouseover zone for each point
	const dataPointZones = dataPoints
		.append('rect')
		.attr('transform', serviceItem => (
			translate(
				scaleDomain(serviceItem.date) - GRAPH_POINT_CIRCLE_RADIUS,
				MARGIN_SIZE,
			)
		))
		.attr('width', GRAPH_POINT_CIRCLE_RADIUS * 2)
		.attr('height', GRAPH_CONTAINER_HEIGHT)
		.attr('class', 'data-zone');

	// Set displayed hits on mouseover
	dataPointZones.on('mouseover', ({ date, hits }) => {
		onHitsHover(hits);
		onDateHover(new Date(Number(date)));
	});

	// Create circle on graph to indicate data point
	dataPoints
		.append('circle')
		.attr('transform', serviceItem => (
			translate(
				scaleDomain(serviceItem.date) - GRAPH_POINT_CIRCLE_RADIUS,
				scaleRange(serviceItem.hits) - GRAPH_POINT_CIRCLE_RADIUS,
			)
		))
		.attr('cx', GRAPH_POINT_CIRCLE_RADIUS)
		.attr('cy', GRAPH_POINT_CIRCLE_RADIUS)
		.attr('r', GRAPH_POINT_CIRCLE_RADIUS)
		.attr('class', serviceItem => (
			displayedDate && displayedDate.getTime().toString() === serviceItem.date
				? 'data-circle-filled'
				: 'data-circle'
		));
};

const drawAxisLines = (graphSVG, serviceData, scaleDomain) => {
	// Add x axis line
	const xAxis = graphSVG.append('g');

	xAxis.append('line')
		.attr('x1', MARGIN_SIZE)
		.attr('y1', GRAPH_CONTAINER_HEIGHT - MARGIN_SIZE)
		.attr('x2', PATH_END_X)
		.attr('y2', GRAPH_CONTAINER_HEIGHT - MARGIN_SIZE)
		.attr('style', `stroke:rgb(0, 0, 0);stroke-width:${GUIDE_LINES_WIDTH}`);

	const MARKER_COUNT = 5;
	const [minDate, maxDate] = d3.extent(serviceData, serviceItem => Number(serviceItem.date));
	const duration = maxDate - minDate;
	const markerInterval = duration / (MARKER_COUNT - 1);
	const dateMarkers = new Array(5).fill('').map((_, index) => (index * markerInterval) + minDate);

	xAxis
		.selectAll('g')
		.data(dateMarkers)
		.enter()
		.append('text')
		.text(marker => moment(marker).format('MM/DD HH:mm'))
		.attr('transform', marker => (
			translate(
				scaleDomain(marker) - 30,
				GRAPH_END_Y + 15,
			)
		));

	// Add y axis line
	graphSVG
		.append('g')
		.append('line')
		.attr('x1', MARGIN_SIZE)
		.attr('y1', MARGIN_SIZE)
		.attr('x2', MARGIN_SIZE)
		.attr('y2', GRAPH_CONTAINER_HEIGHT - MARGIN_SIZE)
		.attr('style', `stroke:rgb(0, 0, 0);stroke-width:${GUIDE_LINES_WIDTH}`);
};

const ServiceDataGraphDrawer = {};

ServiceDataGraphDrawer.draw = (
	rootElement,
	serviceData,
	onHitsHover,
	onDateHover,
	displayedDate,
) => {
	const { scaleDomain, scaleRange } = getScalingFunctions(serviceData);
	const graphSVG = createRootSVG(rootElement, onHitsHover, onDateHover);

	drawDataLine(graphSVG, serviceData, scaleDomain, scaleRange);
	createDataPointCircles(
		graphSVG,
		serviceData,
		scaleDomain,
		scaleRange,
		onHitsHover,
		onDateHover,
		displayedDate,
	);
	drawAxisLines(graphSVG, serviceData, scaleDomain);
};

export default ServiceDataGraphDrawer;
