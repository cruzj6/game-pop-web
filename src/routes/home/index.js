import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TopForServiceCard from '../../components/topForServiceCard';
import constants from '../../constants';

const TopGamesSummaryDiv = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

const Home = ({ history }) => (
	<TopGamesSummaryDiv>
		<TopForServiceCard
			history={history}
			serviceName={constants.SERVICE_NAMES.TWITCH}
		/>
		<TopForServiceCard
			history={history}
			topGames={[]}
			serviceName={constants.SERVICE_NAMES.YOUTUBE}
		/>
	</TopGamesSummaryDiv>
);

Home.propTypes = {
	history: PropTypes.object.isRequired, // eslint-disable-line
};

export default Home;
