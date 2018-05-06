import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import shapes from '../shapes';
import constants from '../../constants';
import GameListItem from '../gameListItem';

const StyledPopularList = styled.ul`
	margin: 0;
	padding: 0px;
`;

const PopularList = ({ listItems }) => (
	<StyledPopularList>
		{
			listItems.map(item => <GameListItem {...item} name={item.game.name} link={`${constants.TWITCH_WATCH_URL}${item.game.name}`} />)
		}
	</StyledPopularList>
);

PopularList.propTypes = {
	listItems: PropTypes.arrayOf(shapes.PopularListItem),
};

PopularList.defaultProps = {
	listItems: [],
};

export default PopularList;
