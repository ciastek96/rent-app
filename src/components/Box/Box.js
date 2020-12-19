import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.white};
  position: relative;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: background-color 0.25s ease-in-out;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-decoration: none;

  &::before {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 6px;
    background-color: ${({ theme }) => theme.green};
  }

  &:hover {
    background-color: ${({ theme }) => theme.default};
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.default};
  }
`;

const Value = styled.p`
  font-size: 3.6rem;
  font-weight: 500;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

const Box = ({ path, title, value, children }) => (
  <Wrapper as={Link} to={path}>
    <InnerWrapper>{children}</InnerWrapper>
    <InnerWrapper>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </InnerWrapper>
  </Wrapper>
);

Box.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};

export default Box;
