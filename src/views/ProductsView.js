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

  const filteredData = productsList.filter((value) => value.name.toLowerCase().includes(inputValue));
  console.log(productsList);
  return (
    <MainTemplate>
      <ItemsTemplate title="Produkty" value={inputValue} handleChange={handleChange} path={routes.newProduct} />
      {filteredData.map(({ name, data, renter, id }) => (
        <ListItem listType="products" key={id} title={name} data={data} renter={renter} />
      ))}
      {filteredData <= 0 && <p>Brak wyników...</p>}
    </MainTemplate>
  );
};

export default ProductsView;
