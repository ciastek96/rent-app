import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
// import RemoveIcon from '../../assets/icons/svg/interfaces/close-a.svg';

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.lightGray};
  border-radius: 5px;
  margin: 25px;
`;

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

const Heading = styled(GridWrapper)``;

const Body = styled.div``;

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

// const RemoveButton = styled.button`
//   width: 28px;
//   height: 28px;
//   border: none;
//   background: none;
//   background-image: url(${RemoveIcon});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: 50%;
//   background-position: 50% 50%;
//   cursor: pointer;
// `;

const ProductsCard = ({ values }) => {
  const productsList = useSelector(({ products }) => products);
  const selectedProducts = values.map((value) => productsList.filter((item) => item._id === value._id));

  return (
    <Wrapper>
      <Heading>
        <p>&nbsp;</p>
        <p>Produkt</p>
        <p>Ilość</p>
        <p>Jednostka</p>
        <p>Dostępność</p>
        <p>Kwota</p>
        <p>&nbsp;</p>
      </Heading>
      <Body>
        {selectedProducts.map(([product]) => (
          <Item key={product._id}>
            <ProductImage image={product.selectedFile} />
            <p>{product.productName}</p>
            <p>{product.quantity}</p>
            <p>{product.unit}</p>
            <p>{product.quantity}</p>
            <p>{`${product.price} zł`}</p>
            {/* <RemoveButton /> */}
          </Item>
        ))}
      </Body>
    </Wrapper>
  );
};

ProductsCard.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductsCard;
