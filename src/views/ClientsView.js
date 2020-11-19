import React, { useState } from 'react';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Card from '../components/Card/Card';
import ListItem from '../components/ListItem/ListItem';
import GridIcon from '../assets/icons/svg/interfaces/nav-icon.svg';
import ListIcon from '../assets/icons/svg/interfaces/nav-icon-list.svg';

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

const StyledDisplayOptions = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledIcon = styled.button`
  border: 0;
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin: 15px 5px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  opacity: 0.3;
`;

const StyledGridIcon = styled(StyledIcon)`
  background-image: url(${GridIcon});
`;
const StyledListIcon = styled(StyledIcon)`
  background-image: url(${ListIcon});
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
  const GRID = 'grid';
  const LIST = 'list';
  const [activeView, setActiveView] = useState(GRID);
  return (
    <MainTemplate>
      <StyledHeader>
        <h2>Klienci</h2>
        <Input search placeholder="Szukaj..." />
        <Button>Dodaj nowy</Button>
      </StyledHeader>
      <StyledDisplayOptions>
        <StyledGridIcon onClick={() => setActiveView(GRID)} />
        <StyledListIcon onClick={() => setActiveView(LIST)} />
      </StyledDisplayOptions>
      {activeView === GRID ? (
        <StyledGrid>
          {data.map(({ name, city, phone, id }) => (
            <Card key={id} name={name} city={city} phone={phone} />
          ))}
        </StyledGrid>
      ) : (
        data.map(({ name, city, phone, id }) => (
          <ListItem listType="clients" key={id} name={name} city={city} phone={phone} />
        ))
      )}
    </MainTemplate>
  );
};

export default ClientsView;
