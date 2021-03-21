import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
// import RemoveIcon from '../../assets/icons/svg/interfaces/close-a.svg';

const ProductsCardItem = ({
  // cartItems,
  setFieldValue,
  values,
  product: { _id, selectedFile, productName, quantity: availableQuantity, unit, brutto, qty: initialQty },
}) => {
  const [quantity, setQuantity] = useState(initialQty);
  const value = (initialQty * brutto).toFixed(2);

  const onChangeQty = (qty) => {
    // cartItems.forEach((product) => {
    //   const exist = values.find((item) => item._id === product._id);
    //   if (exist) {
    //     setFieldValue(
    //       'products',
    //       values.map((x) => (x._id === product._id ? { ...exist, qty } : x)),
    //     );
    //   } else {
    //     setFieldValue('products', [...values.products, { ...product, qty: 1 }]);
    //   }
    // });

    const currentItem = values.find((i) => i._id === _id);

    setFieldValue(
      'products',
      values.map((item) => (item._id === currentItem._id ? { ...currentItem, qty } : item)),
    );
  };

  const increment = () => {
    if (initialQty < availableQuantity) {
      const qty = initialQty + 1;
      setQuantity(qty);
      onChangeQty(qty);
    }
  };

  const decrement = () => {
    if (initialQty > 1) {
      const qty = initialQty - 1;
      setQuantity(qty);
      onChangeQty(qty);
    }
  };

  return (
    <Item key={_id}>
      <ProductImage image={selectedFile} />
      <div>
        <h5>Produkt</h5>
        <p>{productName}</p>
      </div>
      <Counter>
        <button type="button" onClick={decrement}>
          -
        </button>
        {initialQty}
        <button type="button" onClick={increment}>
          +
        </button>
      </Counter>
      <div>
        <h5>Jednostka: </h5>
        <p>{unit}</p>
      </div>
      <div>
        <h5>Dostępność</h5>
        <p>{availableQuantity}</p>
      </div>
      <div>
        <h5>Kwota: </h5>
        <p>{value}</p>
      </div>
      {/* <RemoveButton /> */}
    </Item>
  );
};

ProductsCardItem.propTypes = {
  product: PropTypes.arrayOf(PropTypes.any).isRequired,
  _id: PropTypes.string.isRequired,
  selectedFile: PropTypes.string,
  productName: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  brutto: PropTypes.number.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.oneOf([PropTypes.array, PropTypes.object]).isRequired,
  // cartItems: PropTypes.oneOf([PropTypes.array, PropTypes.object]).isRequired,
};

ProductsCardItem.defaultProps = {
  selectedFile: null,
};

const GridWrapper = styled.div`
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 1fr 2fr 1fr;
  align-items: center;
  text-align: center;

  h5 {
    display: none;
  }

  div:nth-child(2) {
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

    div:nth-child(2),
    div:nth-child(5) {
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
  background-size: cover;
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

export default ProductsCardItem;
