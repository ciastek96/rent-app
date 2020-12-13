import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getRents } from '../actions';
import MainTemplate from '../templates/MainTemplate';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RentalView = () => {
  const rentsList = useSelector(({ rents }) => rents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRents());
  }, [dispatch]);

  console.log(rentsList);

  return (
    <MainTemplate>
      <Header>
        <h2>Wypożyczalnia</h2>
      </Header>

      {rentsList.map((rent) => rent.clientId)}
    </MainTemplate>
  );
};

export default RentalView;
