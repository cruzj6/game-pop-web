import PropTypes from 'prop-types';
import styled from 'styled-components';
import styleConstants from '../components/styleConstants';

const small = {
	'min-width': '60px',
	height: '20px',
};

const large = {
	'min-width': '90px',
	height: '50px',
	fontSize: '20px',
};

const StyledButton = styled.button`
	height: ${props => (props.large ? large.height : small.height)};
	width:  ${props => (props.large ? large.width : small.width)};
	font-size: ${props => (props.large ? large.fontSize : undefined)};
	cursor: ${({ disabled }) => (disabled ? 'arrow' : 'pointer')};
	border: 0px;
	color: ${styleConstants.PRIMARY_TEXT_COLOR};
	background-color: ${({ disabled, unselected }) => ((disabled || unselected) ? 'gray' : styleConstants.BUTTON_COLOR)};
	outline: none;

	&:hover {
		background-color: ${({ disabled }) => (disabled ? 'gray' : styleConstants.BUTTON_HOVER_COLOR)};
	}
`;

StyledButton.propTypes = {
	height: PropTypes.string,
	width: PropTypes.string,
};

export default StyledButton;
