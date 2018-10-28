import styled from 'styled-components';
import styleConstants from '../components/styleConstants';

const StyledInput = styled.input`
	border: 1px solid ${styleConstants.PRIMARY_TEXT_COLOR};
	color: ${styleConstants.PRIMARY_TEXT_COLOR};
	background-color: ${styleConstants.SECONDARY_COLOR};
	height: 20px;
	padding: 3px;
	margin-bottom: 5px;
	outline: none;

	&:focus {
		border-color: ${styleConstants.ACCENT_COLOR};
	}
`;

export default StyledInput;
