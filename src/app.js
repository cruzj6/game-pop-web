import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState } from 'recompose';
import GameSearch from './components/gameSearch';
import ServiceHitsList from './components/serviceHitsList';

const App = ({ currentGameName, setCurrentGameName }) => (
	<div>
		<GameSearch onSearch={setCurrentGameName} />
		<ServiceHitsList gameName={currentGameName} />
	</div>
);

App.propTypes = {
	currentGameName: PropTypes.string,
	setCurrentGameName: PropTypes.func,
};

App.defaultProps = {
	currentGameName: '',
	setCurrentGameName: undefined,
};

export default compose(
	withState('currentGameName', 'setCurrentGameName', ''),
)(App);
