import React from 'react';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';
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

const DashboardView = () => (
  <MainTemplate>
    <StyledHeader>
      <h2>Produkty</h2>
      <Button>Dodaj nowy</Button>
    </StyledHeader>
    {produkty.map(({ title, data, renter, id }) => (
      <ListItem listType="products" key={id} title={title} data={data} renter={renter} />
    ))}
    {/* <Modal>siema</Modal> */}
  </MainTemplate>
);

export default DashboardView;
