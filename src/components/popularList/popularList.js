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

const PopularList = ({ listItems, serviceName }) => (
	<StyledPopularList>
		{
			listItems.map(
				item => <GameListItem {...item} name={item.game.name} serviceName={serviceName} />,
			)
		}
	</StyledPopularList>
);

PopularList.propTypes = {
	listItems: PropTypes.arrayOf(PropTypes.shape(shapes.PopularListItem)),
	serviceName: PropTypes.oneOf(constants.SERVICE_NAMES).isRequired,
};

PopularList.defaultProps = {
	listItems: [],
};

export default PopularList;
