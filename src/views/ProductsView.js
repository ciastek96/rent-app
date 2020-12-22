import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import List from '../components/List/List';
import Spinner from '../components/Spinner/Spinner';
import { routes } from '../routes/routes';

const ProductsView = () => {
  const productsList = useSelector(({ products }) => products);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredData = productsList.filter((value) => value.productName.toLowerCase().includes(inputValue));

  return (
    <MainTemplate>
      <ItemsTemplate title="Produkty" value={inputValue} handleChange={handleChange} path={routes.newProduct} />
      {productsList.length <= 0 ? <Spinner /> : <List listType="products" items={filteredData} />}
    </MainTemplate>
  );
};

export default ProductsView;
