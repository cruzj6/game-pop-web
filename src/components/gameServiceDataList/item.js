import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import shapes from '../shapes';
import StringUtils from '../../stringUtils';
import GameButtons from '../gameButtons';
import StyledListItem from '../../styledComponents/styledListItem';

const Viewers = styled.span`
	&.game-list-item-viewers {
		padding-right: 5px;
		font-weight: bold;
		white-space: nowrap;
	}
`;

const StyledGameName = styled.span`
	flex: 1 1 auto;
	white-space: nowrap;
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
		<Viewers>{`Viewers: ${hits}`}</Viewers>
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
};

GameServiceDataListItem.defaultProps = {
	controlsEnabled: true,
};

export default GameServiceDataListItem;
