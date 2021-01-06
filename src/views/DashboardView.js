import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainTemplate from '../templates/MainTemplate';
import Box from '../components/Box/Box';
import Spinner from '../components/Spinner/Spinner';
import MessageBox from '../components/MessageBox/MessageBox';
import { routes } from '../routes/routes';
import MyCalendar from '../components/MyCalendar/MyCalendar';
import { ReactComponent as PersonIcon } from '../assets/icons/svg/interfaces/male.svg';
import { ReactComponent as ProductIcon } from '../assets/icons/svg/interfaces/archive.svg';
import { ReactComponent as RentIcon } from '../assets/icons/svg/interfaces/key.svg';

const BoxGrid = styled.div`
  display: grid;
  margin: 30px auto 15px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(50px, 300px));
  justify-content: space-evenly;

  .icon {
    width: 30px;
    fill: ${({ theme }) => theme.green};
  }
`;

const DashboardView = () => {
  const rent = useSelector((state) => state.rent);
  const productsListLen = useSelector((state) => state.product.products?.length);
  const clientListLen = useSelector((state) => state.client.clients?.length);
  const rentsList = useSelector((state) => state.rent.rents?.filter((i) => i.isFinished === false));
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(true);
  const history = useHistory();
  const events = rentsList.map((item, i) => ({
    id: i,
    title: item.client.label,
    start: new Date(item.dateOfRent),
    end: new Date(item.dateOfReturn),
  }));

  if (history.location && history.location.state && history.location.state.from) {
    const state = { ...history.location.state };
    delete state.from;
    history.replace({ ...history.location, state });
    history.go(0);
  }

  return (
    <MainTemplate>
      {rent.loading && <Spinner />}
      {rent.error && isMessageBoxOpen && <MessageBox type="error" value="Wystąpił błąd. Spróbuj ponownie." setIsOpen={setIsMessageBoxOpen} />}
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
