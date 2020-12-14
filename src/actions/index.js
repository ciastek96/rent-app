import axios from 'axios';

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/products');
    dispatch({ type: 'FETCH_PRODUCTS', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const addProduct = (values) => async (dispatch) => {
  try {
    console.log(values);
    const { data } = await axios.post('http://localhost:4000/products/add', values);
    dispatch({ type: 'ADD_PRODUCT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getClients = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/clients');
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
    console.log('action', { id }, values);
    const { data } = await axios.post('http://localhost:4000/clients/update', { id, values });

    dispatch({ type: 'UPDATE_CLIENT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const removeClient = (value) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:4000/clients/delete', value);
    dispatch({ type: 'REMOVE_CLIENT', payload: data });
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

export const getRents = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/rents');
    dispatch({ type: 'FETCH_RENTS', payload: data });
  } catch (err) {
    console.log(err);
  }
};
