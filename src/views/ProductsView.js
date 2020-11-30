import React, { useState } from 'react';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import ListItem from '../components/ListItem/ListItem';

const produkty = [
  {
    id: 0,
    title: 'Odkurzacz piorący Karcher k7',
    data: '05 Paź',
    renter: 'Jeam Beam',
  },
  {
    id: 1,
    title: 'Wiertnica do betonu Dedra',
    data: '02 Paź',
    renter: 'Tomasz Hajto',
  },
  {
    id: 2,
    title: 'Wiertarka Makita',
    data: '29 Wrz',
    renter: 'Jeam Beam',
  },
  {
    id: 3,
    title: 'Szalunki systemowe',
    data: '20 Wrz',
    renter: 'Adam Małysz',
  },
];

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProductsView = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredData = produkty.filter((value) => value.title.toLowerCase().includes(inputValue));

  return (
    <MainTemplate>
      <ItemsTemplate
        title="Produkty"
        value={inputValue}
        handleChange={handleChange}
        path="/produkty/nowy"
      />
      {filteredData.map(({ title, data, renter, id }) => (
        <ListItem listType="products" key={id} title={title} data={data} renter={renter} />
      ))}
      {filteredData <= 0 && <p>Brak wyników...</p>}
    </MainTemplate>
  );
};

export default ProductsView;
