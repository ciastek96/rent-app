import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../assets/icons/svg/interfaces/close-a.svg';

const Wrapper = styled.div`
  width: 380px;
  height: 100px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.white};
  position: absolute;
  bottom: 45px;
  right: 45px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: background-color 0.25s ease-in-out;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  &::before {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 6px;
    background-color: ${({ theme, type }) => (type === 'error' ? theme.error : theme.green)};
  }
`;

const Value = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 500;
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

  ${CloseButton}:hover & {
    fill: ${({ theme }) => theme.darkGray};
  }
`;

const MessageBox = ({ type, value, setIsOpen }) =>
  ReactDOM.createPortal(
    <Wrapper type={type}>
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
