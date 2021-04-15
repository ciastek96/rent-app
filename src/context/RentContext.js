import React from 'react';

export const RentContext = React.createContext({
  productsList: [],
  rents: [],
  rentValues: [],
  clientsList: [],
  rentDuration: 1,
  setRentDuration: () => {},
  getRentDuration: () => {},
  cartItems: [],
  setCartItems: () => {},
  rentValue: 0,
  setRentValue: () => {},
  values: [],
  setFieldValue: () => {},
});
