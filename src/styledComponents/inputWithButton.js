import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledInput from './styledInput';
import StyledButton from './styledButton';
import styleConstants from '../styleConstants';

const InputBox = styled(StyledInput)`
	border-right: 0;
`;

const InputButton = styled(StyledButton)`
	height: calc(
		(${styleConstants.DEFAULT_INPUT_HEIGHT}) 
		+ (${styleConstants.DEFAULT_INPUT_PADDING} * 2) 
		+ 2px
	);
	border: 1px solid white;
	border-left: 0;

	input:focus + & {
		border-color: ${styleConstants.ACCENT_COLOR};
	}
`;

const InputWithButton = ({
	buttonText,
	onSubmit,
	onChange,
	placeholder,
}) => (
	<Fragment>
		<InputBox onChange={onChange} placeholder={placeholder} />
		<InputButton onClick={onSubmit}>{buttonText}</InputButton>
	</Fragment>
);

InputWithButton.propTypes = {
	buttonText: PropTypes.string.isRequired,
	onSubmit: PropTypes.func,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
};

InputWithButton.defaultProps = {
	onSubmit: undefined,
	onChange: undefined,
	placeholder: undefined,
};

export default InputWithButton;
