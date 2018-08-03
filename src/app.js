import React from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import PopularList from './components/popularList';
import Search from './components/search';
import constants from './constants';
import styleConstants from './components/styleConstants';
import GameHistory from './components/gameHistory';

const StyledMain = styled.div`
	display: flex;
`;

const StyledHeader = styled.div`
	height: 35px;
	background-color: ${styleConstants.PRIMARY_COLOR};
	margin-bottom: 25px;
	display: flex;
	align-items: center;
	padding: 0px 20px;
	border-bottom: 2px solid ${styleConstants.ACCENT_COLOR};
`;

const StyledNav = styled.ul`
	list-style: none;
	flex: 0 0 150px;
	padding: 0;
	margin: 0 20px;
	border: 1px solid ${styleConstants.ACCENT_COLOR};
	border-radius: 4px;
	height: fit-content;
`;

const StyledContent = styled.div`
	flex: 1 0 auto;
`;

const StyledNavLink = styled.li`
	background-color: ${styleConstants.PRIMARY_COLOR};
	color: ${styleConstants.PRIMARY_TEXT_COLOR};
	border-bottom: 1px solid ${styleConstants.ACCENT_COLOR};
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	&:hover {
		background-color: ${styleConstants.BUTTON_HOVER_COLOR};
	}

	> a {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: ${styleConstants.PRIMARY_TEXT_COLOR}
	}
`;

const App = () => (
	<Router>
		<div>
			<StyledHeader>GamePop</StyledHeader>
			<StyledMain>
				<StyledNav>
					<StyledNavLink>
						<Link to="/">Home</Link>
					</StyledNavLink>
					<StyledNavLink>
						<Link to="/search">Search</Link>
					</StyledNavLink>
					<StyledNavLink>
						<Link to="/twitch">Twitch</Link>
					</StyledNavLink>
				</StyledNav>

				<StyledContent>
					<Route exact path="/" component={() => <span>home</span>} />
					<Route exact path="/search" component={Search} />
					<Route path="/twitch" render={props => <PopularList {...props} serviceName={constants.SERVICE_NAMES.TWITCH} />} />
					<Route path="/gamehistory/:name/:serviceName" component={GameHistory} />
				</StyledContent>
			</StyledMain>
		</div>
	</Router>
);

export default App;
