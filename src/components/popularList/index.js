import React from 'react';
import PropTypes from 'prop-types';
import shapes from '../shapes';
import PopularListItem from './listItem';

const PopularList = ({ listItems }) => (
	<ul>
		{
			listItems.map(item => <PopularListItem {...item} />)
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
