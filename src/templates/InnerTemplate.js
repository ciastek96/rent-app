import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1024px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-bottom: 65px;
  padding: 25px;
`;

const InnerTemplate = ({ children }) => <Wrapper>{children}</Wrapper>;

InnerTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default InnerTemplate;
