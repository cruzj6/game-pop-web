import React from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Search from './routes/search';
import styleConstants from './styleConstants';
import GameHistory from './components/gameHistory';
import Home from './routes/home';
import Twitch from './routes/twitch';

const StyledPageRoot = styled.div`
	height: 100%;
`;

const StyledMain = styled.div`
	display: flex;
	height: 100%;
`;

const StyledHeader = styled.div`
	height: 35px;
	background-color: ${styleConstants.PRIMARY_COLOR};
	display: flex;
	align-items: center;
	padding: 0px 20px;
	border-bottom: 2px solid ${styleConstants.ACCENT_COLOR};
`;

const StyledNav = styled.ul`
	list-style: none;
	flex: 0 0 150px;
	padding: 0;
	margin: 0;
	height: 100%;
	border: 1px solid ${styleConstants.ACCENT_COLOR};
	border-top: 0;
`;

const StyledContent = styled.div`
	flex: 1 1 auto;
	height: 100%;
	background-color: ${styleConstants.PRIMARY_COLOR};
	padding: 10px;
	margin-bottom: 20px;
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
		<StyledPageRoot>
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
					<Route exact path="/" component={Home} />
					<Route exact path="/search" component={Search} />
					<Route path="/twitch" component={Twitch} />
					<Route path="/gamehistory/:name/:serviceName" component={GameHistory} />
				</StyledContent>
			</StyledMain>
		</StyledPageRoot>
	</Router>
);

export default App;
