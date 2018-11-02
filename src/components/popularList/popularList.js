import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import shapes from '../shapes';
import constants from '../../constants';
import GameListItem from '../gameServiceDataList/item';

const StyledPopularList = styled.ul`
	margin: 0;
	padding: 0px;
`;

const PopularList = ({
	className,
	listItems,
	serviceName,
	onGameClick,
}) => (
	<StyledPopularList className={className}>
		{
			listItems.map(
				item => (
					<GameListItem
						{...item}
						key={item.game.name}
						onGameClick={onGameClick}
						name={item.game.name}
						serviceName={serviceName}
					/>
				),
			)
		}
	</StyledPopularList>
);

PopularList.propTypes = {
	listItems: PropTypes.arrayOf(PropTypes.shape(shapes.ServiceData)),
	onGameClick: PropTypes.func.isRequired,
	serviceName: PropTypes.oneOf(Object.values(constants.SERVICE_NAMES)).isRequired,
	className: PropTypes.string,
};

PopularList.defaultProps = {
	listItems: [],
	className: '',
};

const EnhancedPopularList = compose(
	withRouter,
	withHandlers({
		onGameClick({ history }) {
			return (name, serviceName) => history.push(`/gamehistory/${name}/${serviceName}`);
		},
	}),
)(PopularList);

EnhancedPopularList.fragments = gql`
fragment topGameServiceData on ServiceDataItem {
	game {
		name
	},
	hits
}
`;

export default EnhancedPopularList;
