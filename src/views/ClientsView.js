import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getClients } from '../actions';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import Card from '../components/Card/Card';
import LayoutButtons from '../components/LayoutButtons/LayoutButtons';
import ListItem from '../components/ListItem/ListItem';
import { routes } from '../routes/routes';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 45px;
`;

// const data = [
//   {
//     id: 0,
//     name: 'Tomasz Hajto',
//     city: 'Gliwice',
//     phone: '570 761 948',
//   },
//   {
//     id: 1,
//     name: 'Adam Małysz',
//     city: 'Warszawa',
//     phone: '450 228 570',
//   },
//   {
//     id: 2,
//     name: 'Jeam Beam',
//     city: 'Los Angeles',
//     phone: '550 228 322',
//   },
// ];

const ClientsView = () => {
  const clientsList = useSelector(({ clients }) => clients);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const GRID = 'grid';

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredData = clientsList.filter((value) => value.name.toLowerCase().includes(inputValue));

  const [activeView, setActiveView] = useState('list');
  return (
    <MainTemplate>
      <ItemsTemplate title="Klienci" value={inputValue} handleChange={handleChange} path={routes.newClient} />
      <LayoutButtons setActiveView={setActiveView} />
      {activeView === GRID ? (
        <GridWrapper>
          {filteredData.map(({ name, city, phone, id }) => (
            <Card key={id} name={name} city={city} phone={phone} />
          ))}
        </GridWrapper>
      ) : (
        filteredData.map(({ name, city, phone, id }) => (
          <ListItem listType="clients" key={id} name={name} city={city} phone={phone} />
        ))
      )}
      {filteredData <= 0 && <p>Brak wyników...</p>}
    </MainTemplate>
  );
};

export default ClientsView;
