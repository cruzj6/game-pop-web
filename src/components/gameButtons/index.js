import React, { Fragment } from 'react';
import styled from 'styled-components';
import StyledButton from '../../styledComponents/styledButton';
import constants from '../../constants';
import gameServiceUtils from '../../utils/gameServiceUtils';

const SpacedOutButton = styled(StyledButton)`
	margin-left: 10px;
`;

const getButtonsForService = (serviceName, props) => {
	const buttonSize = {
		[props.buttonSize]: true,
	};

	switch (serviceName) {
	case constants.SERVICE_NAMES.TWITCH:
		return (
			<Fragment>
				<a href={gameServiceUtils.getGameLinkForService(props.name, serviceName)}>
					<SpacedOutButton {...buttonSize} >Watch</SpacedOutButton>
				</a>
				<SpacedOutButton {...buttonSize} disabled title="coming soon...">Track</SpacedOutButton>
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
