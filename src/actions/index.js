import axios from 'axios';

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/products');
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
    const { data } = await axios.patch(`http://localhost:4000/products/${id}`, { ...values });
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
    const { data } = await axios.patch(`http://localhost:4000/clients/${id}`, { values });
    dispatch({ type: 'UPDATE_CLIENT', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const removeClient = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`http://localhost:4000/clients/${id}`);
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

export const getRents = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/rents');
    dispatch({ type: 'FETCH_RENTS', payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const addRent = (values) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:4000/rents/add', { values });
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
    const { data } = await axios.delete(`http://localhost:4000/rents/${id}`);
    dispatch({ type: 'REMOVE_RENT', payload: id });
  } catch (err) {
    console.log(err);
  }
};
