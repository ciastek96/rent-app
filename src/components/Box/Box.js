import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  border-radius: 5%;
  background-color: ${({ theme }) => theme.green};
  list-style: none;
  text-decoration: none;
  padding-top: 100%;
  position: relative;
  text-align: center;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: background-color 0.25s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.darkGreen};
  }
`;

const InnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 10fr 2fr;
`;

const Value = styled.h2`
  margin: auto;
  color: ${({ theme }) => theme.white};
`;

const Title = styled.p`
  color: ${({ theme }) => theme.white};
`;

const Box = ({ path, title, value }) => (
  <Wrapper as={Link} to={path}>
    <InnerWrapper>
      <Value>{value}</Value>
      <Title>{title}</Title>
    </InnerWrapper>
  </Wrapper>
);

Box.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Box;
