import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import ListItem from '../components/ListItem/ListItem';
import Spinner from '../components/Spinner/Spinner';
import { routes } from '../routes/routes';

const ProductsView = () => {
  const productsList = useSelector(({ products }) => products);
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredData = productsList.filter((value) => value.productName.toLowerCase().includes(inputValue));

  return (
    <MainTemplate>
      <ItemsTemplate title="Produkty" value={inputValue} handleChange={handleChange} path={routes.newProduct} />
      {productsList.length <= 0 ? (
        <Spinner />
      ) : (
        filteredData.map(({ _id, ...props }) => (
          <ListItem isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} listType="products" key={_id} id={_id} values={props} />
        ))
      )}
    </MainTemplate>
  );
};

export default ProductsView;
