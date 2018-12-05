import styled from 'styled-components';
import styleConstants from '../styleConstants';

const StyledInput = styled.input`
	border: 1px solid ${styleConstants.PRIMARY_TEXT_COLOR};
	color: ${styleConstants.PRIMARY_TEXT_COLOR};
	background-color: ${styleConstants.SECONDARY_COLOR};
	height: ${styleConstants.DEFAULT_INPUT_HEIGHT};
	padding: ${styleConstants.DEFAULT_INPUT_PADDING};
	margin-bottom: 5px;
	outline: none;

	&:focus {
		border-color: ${styleConstants.ACCENT_COLOR};
	}
`;

export default StyledInput;
