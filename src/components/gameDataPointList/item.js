import React from 'react';
import styled from 'styled-components';
import { setISOWeek, startOfISOWeek, format } from 'date-fns';
import shapes from '../shapes';
import styleConstants from '../../styleConstants';
import messageBundle from '../../messageBundle';

const GameDataContainer = styled.li`
	color: ${styleConstants.PRIMARY_TEXT_COLOR};
	background-color: ${styleConstants.SECONDARY_COLOR};
	border: 1px solid ${styleConstants.PRIMARY_COLOR};
	display: flex;
	padding: 10px;
	flex-direction: column;
	align-items: center;
	list-style: none;

	&:hover {
		background-color: ${styleConstants.ACCENT_COLOR};
		cursor: pointer;
	}
`;

const GameDataPointListItem = ({ hits, weekNumber }) => (
	<GameDataContainer>
		<span>Week Starting: {format(startOfISOWeek(setISOWeek(new Date(), weekNumber)), 'MM/DD')}</span>
		<p>{`${messageBundle.HITS}: ${hits}`}</p>
	</GameDataContainer>
);

GameDataPointListItem.propTypes = {
	...shapes.ServiceData,
};

export default GameDataPointListItem;
