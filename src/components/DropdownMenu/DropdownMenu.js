import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const StyledWrapper = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  right: 35px;
  color: red;
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  z-index: 999;
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
`;

const DropdownMenu = ({ children, top }) => (
  <StyledWrapper top={top}>
    <StyledList>{children}</StyledList>
  </StyledWrapper>
);

DropdownMenu.propTypes = {
  children: PropTypes.element.isRequired,
  top: PropTypes.string,
};

DropdownMenu.defaultProps = {
  top: '50%',
};

export default DropdownMenu;
