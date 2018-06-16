import React, { Fragment } from 'react';
import StyledButton from '../../styledComponents/styledButton';
import constants from '../../constants';
import gameServiceUtils from '../../utils/gameServiceUtils';

const getButtonsForService = (serviceName, props) => {
	switch (serviceName) {
	case constants.SERVICE_NAMES.TWITCH:
		return (
			<Fragment>
				<a href={gameServiceUtils.getGameLinkForService(props.name, serviceName)}>
					<StyledButton>Watch</StyledButton>
				</a>
				<StyledButton disabled title="coming soon...">Track</StyledButton>
			</Fragment>
		);
	default:
		return '';
	}
};

const GameButtons = ({ serviceName, ...props }) => (
	getButtonsForService(serviceName, props)
);

export default GameButtons;
