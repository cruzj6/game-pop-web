import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import shapes from '../shapes';
import styleConstants from '../styleConstants';

const StyledButton = styled.button`
	height: 20px;
	width: 60px;
	cursor: ${({ disabled }) => (disabled ? 'arrow' : 'pointer')};
	border: 0px;
	color: ${styleConstants.PRIMARY_TEXT_COLOR};
	background-color: ${({ disabled }) => (disabled ? 'gray' : styleConstants.BUTTON_COLOR)};
	margin-left: 10px;

	&:hover {
		background-color: ${({ disabled }) => (disabled ? 'gray' : styleConstants.BUTTON_HOVER_COLOR)};
	}
`;

const StyledListItem = styled.li`
	color: ${styleConstants.PRIMARY_TEXT_COLOR};
	background-color: ${styleConstants.SECONDARY_COLOR};
	border: 1px solid ${styleConstants.PRIMARY_COLOR};
	height: 30px;
	display: flex;
	align-items: center;
	list-style: none;
	padding: 0px 20px;

	&:hover {
		background-color: ${styleConstants.ACCENT_COLOR};
		cursor: pointer;
	}
`;

const StyledGameName = styled.span`
	flex: 1 0 auto;
`;

const GameListItem = ({
	name,
	hits,
	link,
	onGameClick,
}) => (
	<StyledListItem onClick={onGameClick}>
		<StyledGameName>{name}</StyledGameName>
		<span>{`Viewers: ${hits}`}</span>
		<a href={link}>
			<StyledButton>Watch</StyledButton>
		</a>
		<StyledButton disabled title="coming soon...">Track</StyledButton>
	</StyledListItem>
);

GameListItem.propTypes = {
	...shapes.PopularListItem,
	history: PropTypes.array.isRequired, // eslint-disable-line
};

export default compose(
	withRouter,
	withHandlers({
		onGameClick({ history, name }) {
			return () => history.push(`/pop-graph/${name}`);
		},
	}),
)(GameListItem);
