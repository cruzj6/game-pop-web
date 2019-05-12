import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { compose, withStateHandlers } from 'recompose';
import { Transition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import GameDataPointList from '../gameDataPointList';
import shapes from '../shapes';
import styleConstants from '../../styleConstants';

const SLIDE_DURATION = 500;

const slideIn = keyframes`
	from {
		max-height: 0;
		opacity: 0;
	}

	to {
		max-height: 5000px;
		opacity: 1;
	}
`;

const slideOut = keyframes`
	from {
		max-height: 5000px;
		opacity: 1;
	}

	to {
		max-height: 0;
		opacity: 0;
	}
`;

const MonthHeader = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${styleConstants.SECONDARY_ACCENT_COLOR};
	margin: 10px;
`;

const MonthName = styled.h1`
	padding-left: 10px;
	display: inline-block;
	margin: 0;
`;

const SlideInContainer = styled.div`
	animation: ${props => (props.leaving ? slideOut : slideIn)} ${SLIDE_DURATION}ms;
	overflow: hidden;
`;

const GameHistoryDataPoints = ({
	month,
	dataPoints,
	isExpanded,
	toggleExpanded,
}) => (
		<div key={month}>
			<MonthHeader onClick={toggleExpanded}>
				<FontAwesomeIcon icon={isExpanded ? faCaretDown : faCaretRight} />
				<MonthName>{month}</MonthName>
			</MonthHeader>
			<Transition in={isExpanded} timeout={SLIDE_DURATION}>
				{
					state => (
						state !== 'exited' &&
						<SlideInContainer leaving={!['entering', 'entered'].includes(state)}>
							<GameDataPointList dataPoints={dataPoints} />
						</SlideInContainer>
					)
				}
			</Transition>
		</div>
	);

GameHistoryDataPoints.propTypes = {
	month: PropTypes.string.isRequired,
	dataPoints: PropTypes.arrayOf(PropTypes.shape(shapes.ServiceData)).isRequired,
	isExpanded: PropTypes.bool.isRequired,
	toggleExpanded: PropTypes.func.isRequired,
};

export default compose(
	withStateHandlers(({ initiallyExpanded = false }) => ({
		isExpanded: initiallyExpanded,
	}), {
			toggleExpanded: ({ isExpanded }) => () => ({
				isExpanded: !isExpanded,
			}),
		}),
)(GameHistoryDataPoints);
