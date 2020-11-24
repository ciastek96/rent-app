import React, { useState } from 'react';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Card from '../components/Card/Card';
import LayoutButtons from '../components/LayoutButtons/LayoutButtons';
import ListItem from '../components/ListItem/ListItem';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 45px;
`;

const data = [
  {
    id: 0,
    name: 'Tomasz Hajto',
    city: 'Gliwice',
    phone: '570 761 948',
  },
  {
    id: 1,
    name: 'Adam Małysz',
    city: 'Warszawa',
    phone: '450 228 570',
  },
  {
    id: 2,
    name: 'Jeam Beam',
    city: 'Los Angeles',
    phone: '550 228 322',
  },
];

const ClientsView = () => {
  const [inputValue, setInputValue] = useState('');
  const GRID = 'grid';

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredData = data.filter((value) => value.name.toLowerCase().includes(inputValue));

  const [activeView, setActiveView] = useState('list');
  return (
    <MainTemplate>
      <StyledHeader>
        <h2>Klienci</h2>
        <Input search placeholder="Szukaj..." value={inputValue} onChange={handleChange} />
        <Button>Dodaj nowy</Button>
      </StyledHeader>
      <LayoutButtons setActiveView={setActiveView} />
      {activeView === GRID ? (
        <StyledGrid>
          {filteredData.map(({ name, city, phone, id }) => (
            <Card key={id} name={name} city={city} phone={phone} />
          ))}
        </StyledGrid>
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
