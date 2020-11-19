import React from 'react';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FinancesView = () => (
  <MainTemplate>
    <StyledHeader>
      <h2>Finanse</h2>
    </StyledHeader>
  </MainTemplate>
);

export default FinancesView;
