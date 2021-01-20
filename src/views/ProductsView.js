import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import List from '../components/List/List';
import Spinner from '../components/Spinner/Spinner';
import MessageBox from '../components/MessageBox/MessageBox';
import { routes } from '../routes/routes';

const ProductsView = () => {
  const product = useSelector((state) => state.product);
  const productsList = useSelector((state) => state.product.products);
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredData = productsList.filter((value) => value.productName.toLowerCase().includes(inputValue.toLowerCase()));

  const hideMessageBox = () => {
    setTimeout(() => {
      setIsMessageBoxOpen(false);
    }, 5000);
  };

  if (product.error && isMessageBoxOpen) hideMessageBox();

  return (
    <MainTemplate>
      {product.loading && <Spinner />}
      {product.error && isMessageBoxOpen && <MessageBox type="error" value="Wystąpił błąd. Spróbuj ponownie." setIsOpen={setIsMessageBoxOpen} />}
      {product.success && isMessageBoxOpen && <MessageBox type="success" value="Dane zostały zapisane pomyślnie." setIsOpen={setIsMessageBoxOpen} />}
      <ItemsTemplate title="Produkty" value={inputValue} handleChange={handleChange} path={routes.newProduct} />
      {productsList.length > 0 ? <List listType="products" items={filteredData} /> : <p>Brak wyników...</p>}
    </MainTemplate>
  );
};

export default ProductsView;
