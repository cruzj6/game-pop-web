import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, withState } from 'recompose';
import constants from '../../constants';
import GameSearch from '../gameSearch';
import ServiceHitsList from '../serviceHitsList';
import ServiceSelection from '../serviceSelection';

const Search = ({
	setCurrentGameName,
	currentGameName,
	setSelectedService,
	selectedService,
}) => (
	<Fragment>
		<GameSearch onSearch={setCurrentGameName} />
		<ServiceSelection onSelect={setSelectedService} />
		<ServiceHitsList gameName={currentGameName} serviceName={selectedService} />
	</Fragment>
);

Search.propTypes = {
	currentGameName: PropTypes.string,
	setCurrentGameName: PropTypes.func,
	setSelectedService: PropTypes.func,
	selectedService: PropTypes.oneOf(Object.values(constants.SERVICE_NAMES)),
};

Search.defaultProps = {
	currentGameName: '',
	setCurrentGameName: undefined,
	setSelectedService: undefined,
	selectedService: undefined,
};

export default compose(
	withState('currentGameName', 'setCurrentGameName', ''),
	withState('selectedService', 'setSelectedService', constants.SERVICE_NAMES.TWITCH),
)(Search);
