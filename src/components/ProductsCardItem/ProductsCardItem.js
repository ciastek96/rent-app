import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
// import RemoveIcon from '../../assets/icons/svg/interfaces/close-a.svg';

const GridWrapper = styled.div`
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 1fr 2fr 1fr;
  align-items: center;
  text-align: center;

  p:nth-child(2) {
    text-align: left;
    margin-left: 15px;
  }
`;

const Item = styled(GridWrapper)``;

const ProductImage = styled.div`
  min-height: 65px;
  max-height: 65px;
  min-width: 65px;
  max-width: 65px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.default};
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
`;

const Counter = styled.div`
  border: 1px solid ${({ theme }) => theme.lightGray};
  width: 94px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.darkGray};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-family: 'Roboto', sans-serif;
  border-radius: 5px;
  overflow: hidden;

  button {
    border: none;
    background: ${({ theme }) => theme.white};
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.default};
    }
  }
`;

const ProductsCardItem = ({ rentValue, setRentValue, product: { _id, selectedFile, productName, quantity: availableQuantity, unit, price } }) => {
  const [quantity, setQuantity] = useState(1);
  const value = (quantity * price).toFixed(2);

  const increment = () => {
    if (quantity < availableQuantity) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Item key={_id}>
      <ProductImage image={selectedFile} />
      <p>{productName}</p>
      <Counter>
        <button type="button" onClick={decrement}>
          -
        </button>
        {quantity}
        <button type="button" onClick={increment}>
          +
        </button>
      </Counter>
      <p>{unit}</p>
      <p>{availableQuantity}</p>
      <p>{`${value} zł`}</p>
      {/* <RemoveButton /> */}
    </Item>
  );
};

ProductsCardItem.propTypes = {
  rentValue: PropTypes.string,
  setRentValue: PropTypes.func,
  product: PropTypes.oneOf([PropTypes.array, PropTypes.object]).isRequired,
  _id: PropTypes.string.isRequired,
  selectedFile: PropTypes.string,
  productName: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  price: PropTypes.string,
};

ProductsCardItem.defaultProps = {
  rentValue: null,
  setRentValue: null,
  selectedFile: null,
  price: '',
};

export default ProductsCardItem;
