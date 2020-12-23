const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const FETCH_PRODUCT = 'FETCH_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const productsReducer = (products = [], { payload, type }) => {
  switch (type) {
    case FETCH_PRODUCTS:
      return payload;
    case FETCH_PRODUCT:
      return payload;
    case REMOVE_PRODUCT:
      return products.filter((product) => product._id !== payload);
    case ADD_PRODUCT:
      return [...products, payload];
    case UPDATE_PRODUCT:
      return products.map((product) => (product._id === payload._id ? payload : product));
    default:
      return products;
  }
};

export default productsReducer;
