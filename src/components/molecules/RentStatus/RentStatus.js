import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ReactComponent as GreenIcon } from '../../assets/icons/svg/interfaces/hourglass-half.svg';
import { ReactComponent as RedIcon } from '../../assets/icons/svg/interfaces/hourglass-end.svg';
import { ReactComponent as YellowIcon } from '../../assets/icons/svg/interfaces/hourglass-start.svg';
import { ReactComponent as FinishedIcon } from '../../assets/icons/svg/interfaces/check.svg';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-family: 'Roboto', sans-serif;

  .icon {
    width: 18px;
    margin-bottom: 12px;
  }

  .green {
    fill: ${({ theme }) => theme.green};
    color: ${({ theme }) => theme.green};
  }

  .yellow {
    fill: #e78c00;
    color: #e78c00;
  }

  .red {
    fill: #bf1e29;
    color: #bf1e29;
  }
`;

const RentStatus = ({ status }) => {
  const ACTIVE = 'active';
  const COMING = 'coming';
  const ENDED = 'ended';
  const FINISHED = 'finished';

  switch (status) {
    case ACTIVE:
      return (
        <Wrapper>
          <GreenIcon className="icon green" />
          <span className="green">w trakcie</span>
        </Wrapper>
      );
    case COMING:
      return (
        <Wrapper>
          <YellowIcon className="icon yellow" />
          <span className="yellow">nadchodzące</span>
        </Wrapper>
      );
    case ENDED:
      return (
        <Wrapper>
          <RedIcon className="icon red" />
          <span className="red">nieoddane</span>
        </Wrapper>
      );
    case FINISHED:
      return (
        <Wrapper>
          <FinishedIcon className="icon green" />
          <span className="green">zakończone</span>
        </Wrapper>
      );
    default:
      return (
        <Wrapper>
          <GreenIcon className="icon green" />
          <span className="green">w trakcie</span>
        </Wrapper>
      );
  }
};

RentStatus.propTypes = {
  status: PropTypes.oneOf(['active', 'coming', 'ended', 'finished']).isRequired,
};

export default RentStatus;
