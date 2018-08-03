import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import shapes from '../shapes';
import constants from '../../constants';
import GameListItem from '../gameServiceDataList/item';

const StyledPopularList = styled.ul`
	margin: 0;
	padding: 0px;
`;

const PopularList = ({ listItems, serviceName, onGameClick }) => (
	<StyledPopularList>
		{
			listItems.map(
				item => (
					<GameListItem
						{...item}
						onGameClick={onGameClick}
						name={item.game.name}
						serviceName={serviceName}
					/>
				),
			)
		}
	</StyledPopularList>
);

PopularList.propTypes = {
	listItems: PropTypes.arrayOf(PropTypes.shape(shapes.ServiceData)),
	serviceName: PropTypes.oneOf(constants.SERVICE_NAMES).isRequired,
	onGameClick: PropTypes.func.isRequired,
};

PopularList.defaultProps = {
	listItems: [],
};

const EnhancedPopularList = compose(
	withRouter,
	withHandlers({
		onGameClick({ history }) {
			return (name, serviceName) => history.push(`/gamehistory/${name}/${serviceName}`);
		},
	}),
)(PopularList);

export default EnhancedPopularList;
