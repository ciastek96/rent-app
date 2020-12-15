import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getRents } from '../actions';
import ItemsTemplate from '../templates/ItemsTemplate';
import ListItem from '../components/ListItem/ListItem';
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
      <ItemsTemplate title="Wypożyczenia" path={routes.newRent} />
      {/* {rentsList.map(({ productName, data, renter, _id }) => (
        <ListItem listType="products" key={_id} id={_id} title={productName} data={data} renter={renter} />
      ))} */}
      {rentsList <= 0 && <p>Brak wyników...</p>}
    </MainTemplate>
  );
};

export default RentsView;
