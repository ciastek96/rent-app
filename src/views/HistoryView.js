import React from 'react';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HistoryView = () => (
  <MainTemplate>
    <Header>
      <h2>Historia zamówień</h2>
    </Header>
    <p>Historia zamówień</p>
  </MainTemplate>
);

export default HistoryView;
