import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import InputWithButton from '../../styledComponents/inputWithButton';

const GameSearch = ({ onSearch, setSearchText, onSubmit }) => (
	<form onSubmit={onSubmit}>
		<InputWithButton
			onChange={setSearchText}
			placeholder="search for game..."
			onSubmit={onSearch}
			buttonText="Search"
		/>
	</form>
);

GameSearch.propTypes = {
	onSearch: PropTypes.func,
	setSearchText: PropTypes.func,
	onSubmit: PropTypes.func,
};

GameSearch.defaultProps = {
	onSearch: undefined,
	setSearchText: undefined,
	onSubmit: undefined,
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
		onSubmit: ({ onSearch, searchText }) => e => e.preventDefault() && onSearch(searchText),
	}),
)(GameSearch);

export default EnhancedGameSearch;
