const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// const FETCH_PRODUCT = 'FETCH_PRODUCT';

const REMOVE_PRODUCT_REQUEST = 'REMOVE_PRODUCT_REQUEST';
const REMOVE_PRODUCT_SUCCESS = 'REMOVE_PRODUCT_SUCCESS';
const REMOVE_PRODUCT_FAILURE = 'REMOVE_PRODUCT_FAILURE';

const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

const LOGOUT_USER = 'LOGOUT_USER';

const initialState = {
  loading: false,
  error: null,
  success: null,
  products: [],
};

const productsReducer = (product = initialState, { payload, type, error }) => {
  switch (type) {
    case LOGOUT_USER:
      return [];
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...product,
        loading: true,
        error: null,
        success: null,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        error: null,
        success: null,
        products: payload,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        loading: false,
        error,
        success: null,
        products: [],
      };
    case ADD_PRODUCT_REQUEST:
      return {
        ...product,
        loading: true,
        error: null,
        success: null,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        loading: false,
        error: null,
        success: null,
        products: [...product.products, payload],
      };
    case ADD_PRODUCT_FAILURE:
      return {
        ...product,
        loading: false,
        error,
        success: null,
      };
    case REMOVE_PRODUCT_REQUEST:
      return {
        ...product,
        loading: true,
        error: null,
        success: null,
      };
    case REMOVE_PRODUCT_SUCCESS:
      return {
        loading: false,
        error: null,
        success: null,
        products: product.products.filter((i) => i._id !== payload),
      };
    case REMOVE_PRODUCT_FAILURE:
      return {
        ...product,
        loading: false,
        error,
        success: null,
      };
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...product,
        loading: true,
        error: null,
        success: null,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
        products: product.products.map((i) => (i._id === payload._id ? payload : i)),
      };
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...product,
        loading: false,
        success: null,
        error,
      };
    // case FETCH_PRODUCT:
    //   return payload;
    // case REMOVE_PRODUCT:
    //   return product.filter((i) => i._id !== payload);
    // case ADD_PRODUCT:
    //   return [...product, payload];
    // case UPDATE_PRODUCT:
    //   return product.map((i) => (i._id === payload._id ? payload : i));
    default:
      return product;
  }
};

export default productsReducer;
