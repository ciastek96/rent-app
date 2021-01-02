import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';

export const getProducts = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/products/${id}`);
    dispatch({ type: 'FETCH_PRODUCTS', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getProduct = (value) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/products/product/${value}`);
    dispatch({ type: 'FETCH_PRODUCT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const addProduct = (values) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:4000/products/add', values);
    dispatch({ type: 'ADD_PRODUCT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = (id, values) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`http://localhost:4000/products/${id}`, values);
    dispatch({ type: 'UPDATE_PRODUCT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const removeProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:4000/products/${id}`);
    dispatch({ type: 'REMOVE_PRODUCT', payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const getClients = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/clients/${id}`);
    dispatch({ type: 'FETCH_CLIENTS', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getClient = (value) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:4000/clients/client', value);
    dispatch({ type: 'FETCH_CLIENT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updateClient = (id, values) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`http://localhost:4000/clients/${id}`, { values });
    dispatch({ type: 'UPDATE_CLIENT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const removeClient = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:4000/clients/${id}`);
    dispatch({ type: 'REMOVE_CLIENT', payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const addClient = (values) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:4000/clients/add', values);
    dispatch({ type: 'ADD_CLIENT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getRents = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/rents/${id}`);
    dispatch({ type: 'FETCH_RENTS', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const addRent = (values) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:4000/rents/add', values);
    dispatch({ type: 'ADD_RENT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updateRent = (id, values) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`http://localhost:4000/rents/${id}`, values);
    dispatch({ type: 'UPDATE_RENT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const finishRent = (id, values) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`http://localhost:4000/rents/finish/${id}`, values);
    dispatch({ type: 'FINISH_RENT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const removeRent = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:4000/rents/${id}`);
    dispatch({ type: 'REMOVE_RENT', payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const setCurrentUser = (user) => ({ type: 'SET_CURRENT_USER', user });

export const signIn = (values) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:4000/users/signin', values);
    const { token } = data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch({ type: 'SET_CURRENT_USER', payload: jwt.decode(token) });
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', payload: 'Wpisano niepoprawne dane.' });
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
  try {
    const { data, status } = await axios.post('http://localhost:4000/users/register', values);

    if (status === 201) {
      dispatch({ type: 'SIGNUP_USER', payload: data });
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: 'REGISTER_ERROR', payload: 'Podana nazwa użytkownika jest już zajęta.' });
  }
};

export const getAccount = (id) => async (dispatch) => {
  try {
    const { data } = await axios.post(`http://localhost:4000/accounts/${id}`);
    dispatch({ type: 'FETCH_ACCOUNT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updateAccount = (userID, values) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`http://localhost:4000/accounts/${userID}`, values);
    dispatch({ type: 'UPDATE_ACCOUNT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getAccounts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/accounts');
    dispatch({ type: 'FETCH_ACCOUNTS', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updatePassword = (id, values) => async (dispatch) => {
  try {
    console.log(id);
    const { data } = await axios.patch(`http://localhost:4000/users/updatePassword/${id}`, values);
    dispatch({ type: 'UPDATE_PASSWORD', payload: data });
  } catch (err) {
    console.log(err);
  }
};
