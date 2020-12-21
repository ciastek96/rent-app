import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MainTemplate from '../templates/MainTemplate';
import Box from '../components/Box/Box';
import { routes } from '../routes/routes';
import MyCalendar from '../components/MyCalendar/MyCalendar';
import { ReactComponent as PersonIcon } from '../assets/icons/svg/interfaces/male.svg';
import { ReactComponent as ProductIcon } from '../assets/icons/svg/interfaces/archive.svg';
import { ReactComponent as RentIcon } from '../assets/icons/svg/interfaces/key.svg';

const BoxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 45px;

  .icon {
    width: 30px;
    fill: ${({ theme }) => theme.green};
  }
`;

const DashboardView = () => {
  const productsListLen = useSelector((state) => state.products.length);
  const clientListLen = useSelector((state) => state.clients.length);
  const rentsList = useSelector((state) => state.rents);
  const events = rentsList.map((item, i) => ({
    id: i,
    title: item.client.label,
    start: new Date(item.dateOfRent),
    end: new Date(item.dateOfReturn),
  }));

  return (
    <MainTemplate>
      <h2>Baza danych</h2>
      <BoxGrid>
        <Box path={routes.rents} title="Wypożyczenia" value={rentsList.length}>
          <RentIcon className="icon" />
        </Box>
        <Box path={routes.products} title="Produkty" value={productsListLen}>
          <ProductIcon className="icon" />
        </Box>
        <Box path={routes.clients} title="Klienci" value={clientListLen}>
          <PersonIcon className="icon" />
        </Box>
      </BoxGrid>

      <h2>Kalendarz</h2>
      <MyCalendar events={events} />
    </MainTemplate>
  );
};

export default DashboardView;
