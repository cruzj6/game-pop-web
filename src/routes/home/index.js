import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TopForServiceCard from '../../components/topForServiceCard';
import constants from '../../constants';

const TopGamesSummaryDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
`;

const Home = () => (
	<TopGamesSummaryDiv>
		<TopForServiceCard
			serviceName={constants.SERVICE_NAMES.TWITCH}
		/>
		<TopForServiceCard
			topGames={[]}
			serviceName={constants.SERVICE_NAMES.YOUTUBE}
		/>
	</TopGamesSummaryDiv>
);

Home.propTypes = {
	history: PropTypes.object.isRequired, // eslint-disable-line
};

export default Home;
