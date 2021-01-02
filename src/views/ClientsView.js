import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import Card from '../components/Card/Card';
import LayoutButtons from '../components/LayoutButtons/LayoutButtons';
import List from '../components/List/List';
import { routes } from '../routes/routes';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 300px));
  justify-content: space-evenly;
  grid-gap: 35px;
`;

const ClientsView = () => {
  const GRID = 'grid';
  // const LIST = 'list';
  const clientsList = useSelector(({ clients }) => clients);
  const [activeView, setActiveView] = useState(GRID);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredData = clientsList.filter((value) => value.name.concat(` ${value.surname}`).toLowerCase().includes(inputValue));

  return (
    <MainTemplate>
      <ItemsTemplate title="Klienci" value={inputValue} handleChange={handleChange} path={routes.newClient} />
      {clientsList.length > 0 ? (
        <>
          <LayoutButtons setActiveView={setActiveView} />
          {activeView === GRID ? (
            <GridWrapper>
              {filteredData.map(({ _id, ...props }) => (
                <Card key={_id} id={_id} values={props} />
              ))}
            </GridWrapper>
          ) : (
            <List listType="clients" items={filteredData} />
          )}
        </>
      ) : (
        <p>Brak wyników...</p>
      )}
    </MainTemplate>
  );
};

export default ClientsView;
