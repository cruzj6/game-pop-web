import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState } from 'recompose';
import styled from 'styled-components';
import constants from '../../constants';
import GameSearch from '../../components/gameSearch';
import ServiceHitsList from '../../components/serviceHitsList';
import ServiceSelection from '../../components/serviceSelection';
import styleConstants from '../../components/styleConstants';
import Card from '../../components/card';

const SearchContainer = styled(Card)`
	background-color: ${styleConstants.PRIMARY_COLOR};
	height: 100%;
`;

const Search = ({
	setCurrentGameName,
	currentGameName,
	setSelectedService,
	selectedService,
}) => (
	<SearchContainer>
		<GameSearch onSearch={setCurrentGameName} />
		<ServiceSelection onSelect={setSelectedService} />
		<ServiceHitsList gameName={currentGameName} serviceName={selectedService} />
	</SearchContainer>
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
