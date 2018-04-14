import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers, withHandlers } from 'recompose';

const GameSearch = ({ onSearch, setSearchText }) => (
	<div>
		<input onChange={setSearchText} placeholder="search for game..." />
		<button onClick={onSearch}>Search</button>
	</div>
);

GameSearch.propTypes = {
	onSearch: PropTypes.func,
	setSearchText: PropTypes.func,
};

GameSearch.defaultProps = {
	onSearch: undefined,
	setSearchText: undefined,
};

const EnhancedGameSearch = compose(
	withStateHandlers(
		() => ({ searchText: '' }),
		{
			setSearchText: () => event => ({ searchText: event.target.value }),
		},
	),
	withHandlers({
		onSearch: ({ onSearch, searchText }) => () => onSearch(searchText),
	}),
)(GameSearch);

export default EnhancedGameSearch;
