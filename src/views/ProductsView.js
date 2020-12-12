import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import ListItem from '../components/ListItem/ListItem';
import { routes } from '../routes/routes';

// const produkty = [
//   {
//     id: 0,
//     title: 'Odkurzacz piorący Karcher k7',
//     data: '05 Paź',
//     renter: 'Jeam Beam',
//   },
//   {
//     id: 1,
//     title: 'Wiertnica do betonu Dedra',
//     data: '02 Paź',
//     renter: 'Tomasz Hajto',
//   },
//   {
//     id: 2,
//     title: 'Wiertarka Makita',
//     data: '29 Wrz',
//     renter: 'Jeam Beam',
//   },
//   {
//     id: 3,
//     title: 'Szalunki systemowe',
//     data: '20 Wrz',
//     renter: 'Adam Małysz',
//   },
// ];

const ProductsView = () => {
  const productsList = useSelector((state) => state);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredData = productsList.filter((value) => value.name.toLowerCase().includes(inputValue));

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

const mapStateToProps = ({ products }) => ({ products });

// export default connect(mapStateToProps)(ProductsView);
export default ProductsView;
