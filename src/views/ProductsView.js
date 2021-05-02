import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import List from '../components/organisms/List/List';
import NoResults from '../components/atoms/NoResults/NoResults';
import { routes } from '../routes/routes';
import Loading from '../providers/Loading';

const ProductsView = () => {
  const productsList = useSelector((state) => state.product.products);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredData = productsList.filter((value) => value.productName.toLowerCase().includes(inputValue.toLowerCase()));

  return (
    <MainTemplate>
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
