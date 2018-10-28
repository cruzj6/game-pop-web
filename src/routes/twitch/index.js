import React from 'react';
import constants from '../../constants';
import PopularList from '../../components/popularList';
import StyledHeader from '../../styledComponents/styledHeading';

const Twitch = () => (
	<div>
		<StyledHeader>
			Top Games on {constants.SERVICE_NAMES.TWITCH.toUpperCase()}
			(Highest peak players in last 7 days)
		</StyledHeader>
		<PopularList serviceName={constants.SERVICE_NAMES.TWITCH} />
	</div>
);

export default Twitch;
