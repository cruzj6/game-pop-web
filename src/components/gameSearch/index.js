import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import InputWithButton from '../../styledComponents/inputWithButton';

const GameSearch = ({ onSearch, setSearchText }) => (
	<div>
		<InputWithButton
			onChange={setSearchText}
			placeholder="search for game..."
			onSubmit={onSearch}
			buttonText="Search"
		/>
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
