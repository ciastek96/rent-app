import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import List from '../components/organisms/List/List';
import MessageBox from '../components/atoms/MessageBox/MessageBox';
import NoResults from '../components/atoms/NoResults/NoResults';
import { routes } from '../routes/routes';
import Spinner from '../components/atoms/Spinner/Spinner';
import Loading from '../providers/Loading';

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
      {product.error && isMessageBoxOpen && <MessageBox type="error" value="Wystąpił błąd. Spróbuj ponownie." setIsOpen={setIsMessageBoxOpen} />}
      {product.success && isMessageBoxOpen && <MessageBox type="success" value="Dane zostały zapisane pomyślnie." setIsOpen={setIsMessageBoxOpen} />}
      <ItemsTemplate title="Produkty" value={inputValue} handleChange={handleChange} path={routes.newProduct} />
      <Loading
        render={({ isLoading }) => (
          <>{!isLoading && <>{productsList.length > 0 ? <List listType="products" items={filteredData} /> : <NoResults />}</>}</>
        )}
      />
    </MainTemplate>
  );
};

export default ProductsView;
