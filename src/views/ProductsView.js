import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import ListItem from '../components/ListItem/ListItem';
import { routes } from '../routes/routes';

const ProductsView = () => {
  const productsList = useSelector(({ products }) => products);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  console.log('productsLIst', productsList);
  // const filteredData = productsList.filter((value) => value.name.toLowerCase().includes(inputValue));
  return (
    <MainTemplate>
      <ItemsTemplate title="Produkty" value={inputValue} handleChange={handleChange} path={routes.newProduct} />
      {productsList.map(({ productName, data, renter, _id }) => (
        <ListItem listType="products" key={_id} id={_id} title={productName} data={data} renter={renter} />
      ))}
      {productsList <= 0 && <p>Brak wyników...</p>}
    </MainTemplate>
  );
};

export default ProductsView;
