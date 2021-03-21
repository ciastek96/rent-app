import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoResults = () => (
  <Wrapper>
    <h2>Brak wyników</h2>
  </Wrapper>
);

export default NoResults;
