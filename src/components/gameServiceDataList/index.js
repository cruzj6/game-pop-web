import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import GameListItem from './item';
import constants from '../../constants';
import shapes from '../shapes';

const GameServiceDataList = ({ onItemClick, serviceData }) => (
	<ul>
		{
			serviceData.map(({ game: { name }, hits, date }) => (
				<GameListItem
					key={date}
					hits={hits}
					name={name}
					onGameClick={onItemClick}
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
	onItemClick: PropTypes.func,
};

GameServiceDataList.defaultProps = {
	onItemClick: undefined,
};

GameServiceDataList.fragments = gql`
	fragment gameListItem on ServiceDataItem {
		game {
			name
		}
		hits
		date
	}
`;
export default GameServiceDataList;
