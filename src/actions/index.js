import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';

const api = 'https://my-rent-app.herokuapp.com';
// const api = 'http://localhost:5000';

export const getProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const { data } = await axios.get(`${api}/products`);
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const addProduct = (values) => async (dispatch) => {
  dispatch({ type: 'ADD_PRODUCT_REQUEST' });
  try {
    const { data } = await axios.post(`${api}/products/add`, values);
    dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: data });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Dane zostały dodane pomyślnie.' } });
  } catch (error) {
    dispatch({ type: 'ADD_PRODUCT_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const updateProduct = (id, values) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PRODUCT_REQUEST' });
  try {
    const { data } = await axios.patch(`${api}/products/${id}`, values);
    dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: data });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Dane zostały zaaktualizowane pomyślnie.' } });
  } catch (error) {
    dispatch({ type: 'UPDATE_PRODUCT_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const removeProduct = (id) => async (dispatch) => {
  dispatch({ type: 'REMOVE_PRODUCT_REQUEST' });
  try {
    await axios.delete(`${api}/products/${id}`);
    dispatch({ type: 'REMOVE_PRODUCT_SUCCESS', payload: id });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Dane zostały usunięte pomyślnie.' } });
  } catch (error) {
    dispatch({ type: 'REMOVE_PRODUCT_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const getClients = () => async (dispatch) => {
  // dispatch({ type: 'RESET_NOTIFICATION' });
  dispatch({ type: 'FETCH_CLIENTS_REQUEST' });
  try {
    const { data } = await axios.get(`${api}/clients`);
    dispatch({ type: 'FETCH_CLIENTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_CLIENTS_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const updateClient = (id, values) => async (dispatch) => {
  // dispatch({ type: 'RESET_NOTIFICATION' });
  dispatch({ type: 'UPDATE_CLIENT_REQUEST' });
  try {
    const { data } = await axios.patch(`${api}/clients/${id}`, values);
    dispatch({ type: 'UPDATE_CLIENT_SUCCESS', payload: data });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Dane zostały zaaktualizowane pomyślnie.' } });
  } catch (error) {
    dispatch({ type: 'UPDATE_CLIENT_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const removeClient = (id) => async (dispatch) => {
  // dispatch({ type: 'RESET_NOTIFICATION' });
  dispatch({ type: 'REMOVE_CLIENT_REQUEST' });
  try {
    await axios.delete(`${api}/clients/${id}`);
    dispatch({ type: 'REMOVE_CLIENT_SUCCESS', payload: id });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Dane zostały usunięte pomyślnie.' } });
  } catch (error) {
    dispatch({ type: 'REMOVE_CLIENT_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const addClient = (values) => async (dispatch) => {
  dispatch({ type: 'ADD_CLIENT_REQUEST' });
  try {
    const { data } = await axios.post(`${api}/clients/add`, values);
    dispatch({ type: 'ADD_CLIENT_SUCCESS', payload: data });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Dane zostały zapisane pomyślnie.' } });
  } catch (error) {
    dispatch({ type: 'ADD_CLIENT_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const getRents = () => async (dispatch) => {
  dispatch({ type: 'FETCH_RENTS_REQUEST' });
  try {
    const { data } = await axios.get(`${api}/rents`);
    dispatch({ type: 'FETCH_RENTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_RENTS_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const addRent = (values) => async (dispatch) => {
  dispatch({ type: 'ADD_RENT_REQUEST' });
  try {
    const { data } = await axios.post(`${api}/rents/add`, values);
    dispatch({ type: 'ADD_RENT_SUCCESS', payload: data });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Dane zostały zapisane pomyślnie.' } });
  } catch (error) {
    dispatch({ type: 'ADD_RENT_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const updateRent = (id, values) => async (dispatch) => {
  dispatch({ type: 'UPDATE_RENT_REQUEST' });
  try {
    const { data } = await axios.patch(`${api}/rents/${id}`, values);
    dispatch({ type: 'UPDATE_RENT_SUCCESS', payload: data });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Dane zostały zaaktualizowane pomyślnie.' } });
  } catch (error) {
    dispatch({ type: 'UPDATE_RENT_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const finishRent = (id, values) => async (dispatch) => {
  dispatch({ type: 'FINISH_RENT_REQUEST' });
  try {
    const { data } = await axios.patch(`${api}/rents/finish/${id}`, values);
    dispatch({ type: 'FINISH_RENT_SUCCESS', payload: data });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Zapisano jako ukończone' } });
  } catch (error) {
    dispatch({ type: 'FINISH_RENT_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const removeRent = (id) => async (dispatch) => {
  dispatch({ type: 'REMOVE_RENT_REQUEST' });
  try {
    await axios.delete(`${api}/rents/${id}`);
    dispatch({ type: 'REMOVE_RENT_SUCCESS', payload: id });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Dane zostały usunięte pomyślnie.' } });
  } catch (error) {
    dispatch({ type: 'REMOVE_RENT_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const setCurrentUser = (user) => async (dispatch) => {
  dispatch({ type: 'SET_CURRENT_USER', payload: user });
};

export const signIn = (values) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const { data } = await axios.post(`${api}/users/signin`, values);
    const { token } = data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: jwt.decode(token) });
    dispatch({ type: 'SET_CURRENT_USER', payload: jwt.decode(token) });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Zalogowano pomyślnie.' } });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const signOut = () => async (dispatch) => {
  dispatch({ type: 'LOGOUT_USER_REQUEST' });
  try {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch({ type: 'LOGOUT_USER_SUCCESS' });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Wylogowano pomyślnie.' } });
  } catch (err) {
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie. signOut' } });
    console.log(err);
  }
};

export const signUp = (values) => async (dispatch) => {
  dispatch({ type: 'REGISTER_REQUEST' });
  try {
    const { data } = await axios.post(`${api}/users/register`, values);
    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Zarejestrowano pomyślnie.' } });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie. SignUp' } });
    console.log(error.message);
  }
};

export const getAccount = () => async (dispatch) => {
  dispatch({ type: 'FETCH_ACCOUNT_REQUEST' });
  try {
    const { data } = await axios.post(`${api}/accounts`);
    dispatch({ type: 'FETCH_ACCOUNT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_ACCOUNT_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const updateAccount = (values) => async (dispatch) => {
  dispatch({ type: 'UPDATE_ACCOUNT_REQUEST' });
  try {
    const { data } = await axios.patch(`${api}/accounts`, values);
    dispatch({ type: 'UPDATE_ACCOUNT_SUCCESS', payload: data });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Dane zostały zaaktualizowane pomyślnie.' } });
  } catch (error) {
    dispatch({ type: 'UPDATE_ACCOUNT_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const updatePassword = (values) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PASSWORD_REQUEST' });
  try {
    const { data } = await axios.patch(`${api}/users/updatePassword`, values);
    dispatch({ type: 'UPDATE_PASSWORD_SUCCESS', payload: data });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'SUCCESS', content: 'Hasło zostało zaaktualizowane pomyślnie.' } });
  } catch (error) {
    dispatch({ type: 'UPDATE_PASSWORD_FAILURE', error });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'ERROR', content: 'Wystąpił błąd. Spróbuj ponownie.' } });
    console.log(error);
  }
};

export const addNotification = (values) => async (dispatch) => {
  dispatch({ type: 'ADD_NOTIFICATION', payload: values });
};

export const resetNotification = () => async (dispatch) => {
  dispatch({ type: 'RESET_NOTIFICATION' });
};
