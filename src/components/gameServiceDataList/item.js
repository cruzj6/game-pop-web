import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import shapes from '../shapes';
import styleConstants from '../styleConstants';
import StringUtils from '../../stringUtils';
import GameButtons from '../gameButtons';

const StyledListItem = styled.li`
	color: ${styleConstants.PRIMARY_TEXT_COLOR};
	background-color: ${styleConstants.SECONDARY_COLOR};
	border: 1px solid ${styleConstants.PRIMARY_COLOR};
	height: 30px;
	display: flex;
	align-items: center;
	list-style: none;
	padding: 0px 20px;

	> span {
		padding-right: 5px;

		&.game-list-item-viewers {
			font-weight: bold;
		}
	}

	&:hover {
		background-color: ${styleConstants.ACCENT_COLOR};
		cursor: pointer;
	}
`;

const StyledGameName = styled.span`
	flex: 1 0 auto;
`;

const GameServiceDataListItem = ({
	controlsEnabled,
	name,
	hits,
	date,
	onGameClick,
	serviceName,
}) => (
	<StyledListItem onClick={onGameClick ? () => onGameClick(name, serviceName) : undefined}>
		<StyledGameName>{name}</StyledGameName>
		{
			date
				? (
					<Fragment>
						<span>{StringUtils.getDateWithTime(date)}</span>
						<span>|</span>
					</Fragment>
				)
				: null
		}
		<span className="game-list-item-viewers">{`Viewers: ${hits}`}</span>
		{
			controlsEnabled
				? <GameButtons serviceName={serviceName} name={name} />
				: null
		}
	</StyledListItem>
);

GameServiceDataListItem.propTypes = {
	...shapes.ServiceData,
	controlsEnabled: PropTypes.bool,
	history: PropTypes.array.isRequired, // eslint-disable-line
};

GameServiceDataListItem.defaultProps = {
	controlsEnabled: true,
};

export default GameServiceDataListItem;
