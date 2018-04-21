import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PopularList from './components/popularList';
import Home from './components/home';
import constants from './constants';

const App = () => (
	<Router>
		<div>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/twitch">Twitch</Link>
				</li>
			</ul>

			<Route exact path="/" component={Home} />
			<Route path="/twitch" render={props => <PopularList {...props} serviceName={constants.SERVICE_NAMES.TWITCH} />} />
		</div>
	</Router>
);

export default App;
