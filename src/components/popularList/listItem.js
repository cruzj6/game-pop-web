import React from 'react';
import styled from 'styled-components';
import shapes from '../shapes';

const StyledButton = styled.button`
	height: 20px;
	width: 60px;
	background-color: ${({ disabled }) => (disabled ? 'gray' : 'green')}
`;

const PopularListItem = ({ name, hits, link }) => (
	<li>
		<span>{name}</span>
		<span>{`Viewers: ${hits}`}</span>
		<a href={link}>
			<StyledButton>Watch</StyledButton>
		</a>
		<StyledButton disabled title="coming soon...">Track</StyledButton>
	</li>
);

PopularListItem.propTypes = {
	...shapes.PopularListItem,
};

export default PopularListItem;
