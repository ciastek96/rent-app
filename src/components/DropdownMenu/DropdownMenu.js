import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const Wrapper = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  color: red;
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  z-index: 999;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const DropdownMenu = ({ children, top, right, isOpen }) => (
  <Wrapper top={top} right={right} isOpen={isOpen}>
    <List>{children}</List>
  </Wrapper>
);

DropdownMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  top: PropTypes.string,
  right: PropTypes.string,
  isOpen: PropTypes.func.isRequired,
};

DropdownMenu.defaultProps = {
  top: '50%',
  right: 0,
};

export default DropdownMenu;
