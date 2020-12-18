import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getRents } from '../actions';
import ItemsTemplate from '../templates/ItemsTemplate';
import Spinner from '../components/Spinner/Spinner';
import RentItem from '../components/RentItem/RentItem';
import MainTemplate from '../templates/MainTemplate';
import { routes } from '../routes/routes';

const RentsView = () => {
  const rentsList = useSelector(({ rents }) => rents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRents());
  }, [dispatch]);

  return (
    <MainTemplate>
      {console.log(rentsList)}
      <ItemsTemplate title="Wypożyczenia" path={routes.newRent} />
      {rentsList.map(({ _id, client, dateOfRent, dateOfReturn, isFinished }) => (
        <RentItem key={_id} id={_id} title={_id} dateOfRent={dateOfRent} dateOfReturn={dateOfReturn} client={client} isFinished={isFinished} />
      ))}
      {rentsList <= 0 && <p>Brak wyników...</p>}
    </MainTemplate>
  );
};

export default RentsView;
