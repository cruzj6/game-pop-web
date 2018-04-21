import React from 'react';
import PropTypes from 'prop-types';
import shapes from '../shapes';
import PopularListItem from './listItem';

const PopularList = ({ listItems }) => (
	<ul>
		{console.log(listItems)}
		{
			listItems.map(item => <PopularListItem {...item} name={item.game.name} />)
		}
	</ul>
);

PopularList.propTypes = {
	listItems: PropTypes.arrayOf(shapes.PopularListItem),
};

PopularList.defaultProps = {
	listItems: [],
};

export default PopularList;
