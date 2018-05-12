import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { withFauxDOM } from 'react-faux-dom';
import { compose, lifecycle, mapProps } from 'recompose';

const PopularityChart = ({ chart, name }) => (
	<div>
		<span>Here is some data for {name}</span>
		<div>
			{chart}
		</div>
	</div>
);

PopularityChart.propTypes = {
	chart: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

const EnhancedPopularityChart = compose(
	withFauxDOM,
	mapProps(({ match, ...rest }) => ({
		name: match.params.name,
		...rest,
	})),
	lifecycle({
		componentDidMount() {
			const { connectFauxDOM } = this.props;
			const faux = connectFauxDOM('div', 'ch');

			d3
				.select(faux)
				.append('div')
				.html('HELLO WORLD!');

			this.props.animateFauxDOM(800);
		},
	}),
)(PopularityChart);

export default EnhancedPopularityChart;
