import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import messageBundle from '../../messageBundle';
import PopularList from '../popularList';
import Card from '../card';

const TopCard = styled(Card)`
	width: 800px;
	padding: 0;
`;

const TopForServiceUl = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const TopSummaryHeadingContainer = styled.div`
	vertical-align: middle;
	height: 50px;
	display: flex;
	align-items: center;
	padding: 0 10px;
`;

const TopSummaryHeading = styled.h3`
	margin: 0;
	text-align: center;
	vertical-align: middle;
`;

const TopForServiceCard = ({ serviceName }) => (
	<TopCard>
		<TopSummaryHeadingContainer>
			<TopSummaryHeading>
				Top games on {messageBundle.SERVICE_NAME_STRINGS[serviceName]} this week
			</TopSummaryHeading>
		</TopSummaryHeadingContainer>
		<TopForServiceUl>
			<PopularList max={15} serviceName={serviceName} />
		</TopForServiceUl>
		<a>See More</a>
	</TopCard>
);

TopForServiceCard.propTypes = {
	serviceName: PropTypes.string,
};

TopForServiceCard.defaultProps = {
	serviceName: '',
};

const EnhancedTopForServiceCard = compose(
	withRouter,
	withHandlers({
		onGameClick({ history }) {
			return (name, serviceName) => () => history.push(`/gamehistory/${name}/${serviceName}`);
		},
	}),
)(TopForServiceCard);

export default EnhancedTopForServiceCard;
