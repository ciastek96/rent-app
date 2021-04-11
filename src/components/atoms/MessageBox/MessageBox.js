import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../assets/icons/svg/interfaces/close-a.svg';
import { ReactComponent as SuccessIcon } from '../../assets/icons/svg/interfaces/check.svg';

const Wrapper = styled.div`
  width: 380px;
  height: 100px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.white};
  position: fixed;
  bottom: 45px;
  right: 45px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: background-color 0.25s ease-in-out;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 990;

  &::before {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 6px;
    background-color: ${({ theme, type }) => (type === 'error' ? theme.error : theme.green)};
  }

  @media (max-width: 500px) {
    max-width: 90%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Value = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 500;
  margin: 0 auto 0 15px;
`;

const CloseButton = styled.button`
  padding: 8px;
  cursor: pointer;
  border: none;
  background: none;
`;

const StyledCloseIcon = styled(CloseIcon)`
  width: 14px;
  height: 14px;
  fill: ${({ theme }) => theme.lightGray};
  transition: fill 0.25s ease-in-out;
  margin-right: 15px;

  ${CloseButton}:hover & {
    fill: ${({ theme }) => theme.darkGray};
  }
`;

const StyledSuccesIcon = styled(SuccessIcon)`
  height: 22px;
  width: 22px;
  margin-left: 25px;
  fill: ${({ theme }) => theme.green};
`;

const MessageBox = ({ type, value, setIsOpen }) =>
  ReactDOM.createPortal(
    <Wrapper type={type}>
      {type === 'success' && <StyledSuccesIcon />}
      <Value>{value}</Value>
      <CloseButton type="submit" onClick={() => setIsOpen(false)}>
        <StyledCloseIcon />
      </CloseButton>
    </Wrapper>,
    document.getElementById('portal'),
  );

MessageBox.propTypes = {
  type: PropTypes.oneOfType(['error', 'success']),
  value: PropTypes.number.isRequired,
};

export default MessageBox;
