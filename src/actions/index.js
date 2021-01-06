import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';

export const getProducts = (id) => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const { data } = await axios.get(`http://localhost:4000/products/${id}`);
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', error });
    console.log(error);
  }
};

// export const getProduct = (value) => async (dispatch) => {
//   try {
//     const { data } = await axios.get(`http://localhost:4000/products/product/${value}`);
//     dispatch({ type: 'FETCH_PRODUCT', payload: data });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const addProduct = (values) => async (dispatch) => {
  dispatch({ type: 'ADD_PRODUCT_REQUEST' });
  try {
    const { data } = await axios.post('http://localhost:4000/products/add', values);
    dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'ADD_PRODUCT_FAILURE', error });
    console.log(error);
  }
};

export const updateProduct = (id, values) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PRODUCT_REQUEST' });
  try {
    const { data } = await axios.patch(`http://localhost:4000/products/${id}`, values);
    dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'UPDATE_PRODUCT_FAILURE', error });
    console.log(error);
  }
};

export const removeProduct = (id) => async (dispatch) => {
  dispatch({ type: 'REMOVE_PRODUCT_REQUEST' });
  try {
    await axios.delete(`http://localhost:4000/products/${id}`);
    dispatch({ type: 'REMOVE_PRODUCT_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'REMOVE_PRODUCT_FAILURE', error });
    console.log(error);
  }
};

export const getClients = (id) => async (dispatch) => {
  console.log('siema', id);
  dispatch({ type: 'FETCH_CLIENTS_REQUEST' });
  try {
    const { data } = await axios.get(`http://localhost:4000/clients/${id}`);
    console.log(data);
    dispatch({ type: 'FETCH_CLIENTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_CLIENTS_FAILURE', error });
    console.log(error);
  }
};

// export const getClient = (value) => async (dispatch) => {
//   try {
//     const { data } = await axios.post('http://localhost:4000/clients/client', value);
//     dispatch({ type: 'FETCH_CLIENT', payload: data });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const updateClient = (id, values) => async (dispatch) => {
  dispatch({ type: 'UPDATE_CLIENT_REQUEST' });
  try {
    const { data } = await axios.patch(`http://localhost:4000/clients/${id}`, values);
    console.log(data);
    dispatch({ type: 'UPDATE_CLIENT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'UPDATE_CLIENT_FAILURE', error });
    console.log(error);
  }
};

export const removeClient = (id) => async (dispatch) => {
  dispatch({ type: 'REMOVE_CLIENT_REQUEST' });
  try {
    await axios.delete(`http://localhost:4000/clients/${id}`);
    dispatch({ type: 'REMOVE_CLIENT_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'REMOVE_CLIENT_FAILURE', error });
    console.log(error);
  }
};

export const addClient = (values) => async (dispatch) => {
  dispatch({ type: 'ADD_CLIENT_REQUEST' });
  try {
    const { data } = await axios.post('http://localhost:4000/clients/add', values);
    dispatch({ type: 'ADD_CLIENT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'ADD_CLIENT_FAILURE' }, error);
    console.log(error);
  }
};

export const getRents = (id) => async (dispatch) => {
  dispatch({ type: 'FETCH_RENTS_REQUEST' });
  try {
    const { data } = await axios.get(`http://localhost:4000/rents/${id}`);
    dispatch({ type: 'FETCH_RENTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_RENTS_FAILURE', error });
    console.log(error);
  }
};

export const addRent = (values) => async (dispatch) => {
  dispatch({ type: 'ADD_RENT_REQUEST' });
  try {
    const { data } = await axios.post('http://localhost:4000/rents/add', values);
    dispatch({ type: 'ADD_RENT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'ADD_RENT_FAILURE', error });
    console.log(error);
  }
};

export const updateRent = (id, values) => async (dispatch) => {
  dispatch({ type: 'UPDATE_RENT_REQUEST' });
  try {
    const { data } = await axios.patch(`http://localhost:4000/rents/${id}`, values);
    dispatch({ type: 'UPDATE_RENT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'UPDATE_RENT_FAILURE', error });
    console.log(error);
  }
};

export const finishRent = (id, values) => async (dispatch) => {
  dispatch({ type: 'FINISH_RENT_REQUEST' });
  try {
    const { data } = await axios.patch(`http://localhost:4000/rents/finish/${id}`, values);
    dispatch({ type: 'FINISH_RENT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FINISH_RENT_FAILURE', error });
    console.log(error);
  }
};

export const removeRent = (id) => async (dispatch) => {
  dispatch({ type: 'REMOVE_RENT_REQUEST' });
  try {
    await axios.delete(`http://localhost:4000/rents/${id}`);
    dispatch({ type: 'REMOVE_RENT_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'REMOVE_RENT_FAILURE', error });
    console.log(error);
  }
};

export const setCurrentUser = (user) => ({ type: 'SET_CURRENT_USER', user });

export const signIn = (values) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const { data } = await axios.post('http://localhost:4000/users/signin', values);
    const { token } = data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: jwt.decode(token) });
    // dispatch({ type: 'SET_CURRENT_USER', payload: jwt.decode(token) });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', error });
    console.log(error);
  }
};

export const signOut = () => async (dispatch) => {
  try {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch({ type: 'LOGOUT_USER', payload: {} });
  } catch (err) {
    console.log(err);
  }
};

export const signUp = (values) => async (dispatch) => {
  dispatch({ type: 'REGISTER_REQUEST' });
  try {
    const { data } = await axios.post('http://localhost:4000/users/register', values);
    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', error });
    console.log(error.message);
  }
};

export const getAccount = (id) => async (dispatch) => {
  dispatch({ type: 'FETCH_ACCOUNT_REQUEST' });
  try {
    const { data } = await axios.post(`http://localhost:4000/accounts/${id}`);
    dispatch({ type: 'FETCH_ACCOUNT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_ACCOUNT_FAILURE', error });
    console.log(error);
  }
};

export const updateAccount = (userID, values) => async (dispatch) => {
  dispatch({ type: 'UPDATE_ACCOUNT_REQUEST' });
  try {
    const { data } = await axios.patch(`http://localhost:4000/accounts/${userID}`, values);
    dispatch({ type: 'UPDATE_ACCOUNT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'UPDATE_ACCOUNT_FAILURE', error });
    console.log(error);
  }
};

// export const getAccounts = (id) => async (dispatch) => {
//   try {
//     const { data } = await axios.post(`http://localhost:4000/accounts/${id}`);
//     dispatch({ type: 'FETCH_ACCOUNTS', payload: data });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const updatePassword = (id, values) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PASSWORD_REQUEST' });
  try {
    const { data } = await axios.patch(`http://localhost:4000/users/updatePassword/${id}`, values);
    dispatch({ type: 'UPDATE_PASSWORD_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'UPDATE_PASSWORD_FAILURE', error });
    console.log(error);
  }
};
