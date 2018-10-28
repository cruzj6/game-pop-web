import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import StyledButton from '../../styledComponents/styledButton';
import StyledInput from '../../styledComponents/styledInput';

const GameSearch = ({ onSearch, setSearchText }) => (
	<div>
		<StyledInput onChange={setSearchText} placeholder="search for game..." />
		<StyledButton onClick={onSearch}>Search</StyledButton>
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
