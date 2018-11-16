import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import messageBundle from '../../messageBundle';
import PopularList from '../popularList';
import Card from '../card';

const TopCard = styled(Card)`
	padding: 0;
	flex: 1 1 400px;
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

const SeeMoreAnchor = styled.a`
	padding: .5rem;
	display: inline-block;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

const TopForServiceCard = ({ onSeeMore, serviceName }) => (
	<TopCard>
		<TopSummaryHeadingContainer>
			<TopSummaryHeading>
				Top games on {messageBundle.SERVICE_NAME_STRINGS[serviceName]} this week (Highest Peak)
			</TopSummaryHeading>
		</TopSummaryHeadingContainer>
		<TopForServiceUl>
			<PopularList max={15} serviceName={serviceName} />
		</TopForServiceUl>
		<SeeMoreAnchor onClick={onSeeMore}>See More</SeeMoreAnchor>
	</TopCard>
);

TopForServiceCard.propTypes = {
	serviceName: PropTypes.string,
	onSeeMore: PropTypes.func.isRequired,
};

TopForServiceCard.defaultProps = {
	serviceName: '',
};

const EnhancedTopForServiceCard = compose(
	withRouter,
	withHandlers({
		onGameClick({ history, serviceName }) {
			return name => () => history.push(`/gamehistory/${name}/${serviceName}`);
		},
		onSeeMore({ history, serviceName }) {
			return () => history.push(`/${serviceName}`);
		},
	}),
)(TopForServiceCard);

export default EnhancedTopForServiceCard;
