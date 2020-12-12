import axios from 'axios';

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/products');
    dispatch({ type: 'FETCH_PRODUCTS', payload: data });
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
