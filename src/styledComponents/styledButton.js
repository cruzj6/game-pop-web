import styled from 'styled-components';
import styleConstants from '../components/styleConstants';

const StyledButton = styled.button`
	height: 20px;
	width: 60px;
	cursor: ${({ disabled }) => (disabled ? 'arrow' : 'pointer')};
	border: 0px;
	color: ${styleConstants.PRIMARY_TEXT_COLOR};
	background-color: ${({ disabled }) => (disabled ? 'gray' : styleConstants.BUTTON_COLOR)};
	margin-left: 10px;

	&:hover {
		background-color: ${({ disabled }) => (disabled ? 'gray' : styleConstants.BUTTON_HOVER_COLOR)};
	}
`;

export default StyledButton;
