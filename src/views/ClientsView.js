import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getClients } from '../actions';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import Card from '../components/Card/Card';
import LayoutButtons from '../components/LayoutButtons/LayoutButtons';
import ListItem from '../components/ListItem/ListItem';
import Spinner from '../components/Spinner/Spinner';
import { routes } from '../routes/routes';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 45px;
`;

const ClientsView = () => {
  const GRID = 'grid';
  const dispatch = useDispatch();
  const clientsList = useSelector(({ clients }) => clients);
  const [activeView, setActiveView] = useState(GRID);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredData = clientsList.filter((value) => value.name.toLowerCase().includes(inputValue));

  return (
    <MainTemplate>
      <ItemsTemplate title="Klienci" value={inputValue} handleChange={handleChange} path={routes.newClient} />
      <LayoutButtons setActiveView={setActiveView} />
      {activeView === GRID ? (
        <GridWrapper>
          {filteredData.map(({ _id, ...props }) => (
            <Card key={_id} id={_id} values={props} />
          ))}
        </GridWrapper>
      ) : (
        filteredData.map(({ _id, ...props }) => <ListItem listType="clients" key={_id} id={_id} values={props} />)
      )}
      {filteredData <= 0 && <p>Brak wyników...</p>}
    </MainTemplate>
  );
};

export default ClientsView;
