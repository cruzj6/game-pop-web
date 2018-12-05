import styled from 'styled-components';
import styleConstants from '../styleConstants';

const StyledListItem = styled.li`
	color: ${styleConstants.PRIMARY_TEXT_COLOR};
	background-color: ${styleConstants.SECONDARY_COLOR};
	border: 1px solid ${styleConstants.PRIMARY_COLOR};
	height: 30px;
	display: flex;
	align-items: center;
	list-style: none;
	padding: 0px 20px;

	&:hover {
		background-color: ${styleConstants.ACCENT_COLOR};
		cursor: pointer;
	}
`;

export default StyledListItem;
