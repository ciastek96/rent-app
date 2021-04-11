import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import ListItem from './ListItem';

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 3fr 2fr 1fr;
  text-align: center;
  padding: 15px;

  p:nth-child(2) {
    margin-left: 10px;
    text-align: left;
  }
`;

const PRODUCTS = 'products';
const CLIENTS = 'clients';

const List = ({ items, listType }) => (
  <div>
    <Header>
      {listType === PRODUCTS ? (
        <>
          <p>&nbsp;</p>
          <p>Nazwa</p>
          <p>Ilość</p>
          <p>Cena</p>
          <p>&nbsp;</p>
        </>
      ) : (
        <>
          <p>&nbsp;</p>
          <p>Klient</p>
          <p>Telefon</p>
          <p>Rabat</p>
          <p>&nbsp;</p>
        </>
      )}
    </Header>
    {items.map(({ _id, ...props }) => (
      <ListItem listType={listType} key={_id} id={_id} values={props} />
    ))}
  </div>
);

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      productName: PropTypes.string,
      companyName: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string,
      phone: PropTypes.string,
      nip: PropTypes.string,
      selectedFile: PropTypes.string,
    }),
  ).isRequired,
  listType: PropTypes.oneOf([PRODUCTS, CLIENTS]),
};

List.defaultProps = {
  listType: PRODUCTS,
};

export default List;
