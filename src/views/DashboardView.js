import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MainTemplate from '../templates/MainTemplate';
import Modal from '../components/Modal/Modal';
import Box from '../components/Box/Box';
import ItemList from '../components/ListItem/ListItem';
import { routes } from '../routes/routes';

const BoxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 45px;
`;

const DashboardView = () => {
  const productsListLen = useSelector((state) => state.products.length);
  const clientListLen = useSelector((state) => state.clients.length);
  const rentsListLen = useSelector((state) => state.rents.length);
  return (
    <MainTemplate>
      <h2>Dashboard</h2>
      <p>Dashboard</p>
      <BoxGrid>
        <Box path={routes.products} title="produkty" value={productsListLen} />
        <Box path={routes.clients} title="klienci" value={clientListLen} />
        <Box path={routes.rents} title="wypożyczenia" value={rentsListLen} />
      </BoxGrid>
    </MainTemplate>
  );
};

export default DashboardView;
