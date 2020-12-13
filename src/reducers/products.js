const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';

const productsReducer = (products = [], { payload, type }) => {
  switch (type) {
    case FETCH_PRODUCTS:
      return payload;
    case REMOVE_PRODUCT:
      return products;
    case ADD_PRODUCT:
      return payload;
    default:
      return products;
  }
};

export default productsReducer;
