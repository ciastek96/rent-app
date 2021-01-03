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

  h5 {
    display: none;
  }

  p:nth-child(2) {
    text-align: left;
    margin-left: 15px;
  }

  @media (max-width: 620px) {
    display: grid;
    /* grid-template-columns: 1fr 2fr 2fr; */
    grid-template-rows: 1fr 1fr;
    flex-direction: column;
    grid-template-columns: repeat(auto-fit, minmax(60px, 100px));
    justify-content: center;
    grid-gap: 15px;

    text-align: left;
    p:nth-child(2),
    p:nth-child(5) {
      margin-left: 0;
    }

    h5 {
      display: block;
    }
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
  margin: 0 auto;
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

const ProductsCardItem = ({
  cartItems,
  setFieldValue,
  values,
  product: { _id, selectedFile, productName, quantity: availableQuantity, unit, brutto },
}) => {
  const [quantity, setQuantity] = useState(1);
  const value = (quantity * brutto).toFixed(2);

  const onChangeQty = (qty) => {
    cartItems.forEach((product) => {
      const exist = values.find((item) => item._id === product._id);
      if (exist) {
        setFieldValue(
          'products',
          values.map((x) => (x._id === product._id ? { ...exist, qty } : x)),
        );
      } else {
        setFieldValue('products', [...values.products, { ...product, qty: 1 }]);
      }
    });
  };

  console.log(cartItems);

  const increment = () => {
    if (quantity < availableQuantity) {
      onChangeQty(quantity + 1);
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      onChangeQty(quantity - 1);
      setQuantity(quantity - 1);
    }
  };

  return (
    <Item key={_id}>
      <ProductImage image={selectedFile} />
      <p>
        <h5>Produkt</h5>
        {productName}
      </p>
      <Counter>
        <button type="button" onClick={decrement}>
          -
        </button>
        {quantity}
        <button type="button" onClick={increment}>
          +
        </button>
      </Counter>
      <p>
        <h5>Jednostka: </h5>
        {unit}
      </p>
      <p>
        <h5>Dostępność</h5>
        {availableQuantity}
      </p>
      <p>
        <h5>Kwota: </h5>
        {value}
      </p>
      {/* <RemoveButton /> */}
    </Item>
  );
};

ProductsCardItem.propTypes = {
  product: PropTypes.oneOf([PropTypes.array, PropTypes.object]).isRequired,
  _id: PropTypes.string.isRequired,
  selectedFile: PropTypes.string,
  productName: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  brutto: PropTypes.number.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.oneOf([PropTypes.array, PropTypes.object]).isRequired,
  cartItems: PropTypes.oneOf([PropTypes.array, PropTypes.object]).isRequired,
};

ProductsCardItem.defaultProps = {
  selectedFile: null,
};

export default ProductsCardItem;
