import React from 'react';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import Modal from '../components/Modal/Modal';
import ItemList from '../components/ItemList/ItemList';

const DashboardView = () => (
  <MainTemplate>
    <h1>Dashboard</h1>
    <h2>Nadchodzące</h2>
    <h2>Produkty</h2>
    <ItemList />
    {/* <Modal>siema</Modal> */}
  </MainTemplate>
);

export default DashboardView;
