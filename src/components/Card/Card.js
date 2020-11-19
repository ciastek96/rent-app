import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import EmailIcon from '../../assets/icons/svg/interfaces/at.svg';

const StyledWrapper = styled.div`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.white};
  min-height: 420px;
  display: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: pointer;

  &::before {
    content: '';
    height: 6px;
    width: 100%;
    background-color: ${({ theme }) => theme.green};
  }
`;

const StyledPhoto = styled.div`
  background-color: ${({ theme }) => theme.default};
  border-radius: 50%;
  height: 225px;
  width: 225px;
`;

const StyledInnerWrapper = styled.div`
  width: 100%;
  height: 125px;
  background-color: ${({ theme }) => theme.default};
  text-align: center;
  padding: 10px;
`;

const StyledInfo = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const Card = ({ name, phone, city }) => {
  if (!name) return <p>Brak pozycji. </p>;
  return (
    <StyledWrapper>
      <StyledPhoto />
      <StyledInnerWrapper>
        <h4>{name}</h4>
        <StyledInfo>
          <p>{phone}</p>
          <p>{city}</p>
        </StyledInfo>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default Card;
