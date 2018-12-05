import React from 'react';
import StyledListItem from '../../styledComponents/styledListItem';
import shapes from '../shapes';
import StringUtils from '../../stringUtils';

const GameDataPointListItem = ({ hits, date }) => (
	<StyledListItem>
		{/* <span>{hits}</span> */}
		<span>{StringUtils.getDateWithTime(date)}</span>
	</StyledListItem>
);

GameDataPointListItem.propTypes = {
	...shapes.ServiceData,
};

export default GameDataPointListItem;
