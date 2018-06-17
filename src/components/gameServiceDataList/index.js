import React from 'react';
import PropTypes from 'prop-types';
import GameListItem from './item';
import constants from '../../constants';
import shapes from '../shapes';

const GameServiceDataList = ({ serviceData }) => (
	<ul>
		{
			serviceData.map(({ game: { name }, hits, date }) => (
				<GameListItem
					hits={hits}
					name={name}
					controlsEnabled={false}
					date={new Date(Number(date))}
					serviceName={constants.SERVICE_NAMES.TWITCH}
				/>
			))
		}
	</ul>
);

GameServiceDataList.propTypes = {
	serviceData: PropTypes.arrayOf(PropTypes.shape(shapes.ServiceData)).isRequired,
};

export default GameServiceDataList;
