import { combineReducers } from 'redux';
import products from './products';
import clients from './clients';
import rents from './rents';

export default combineReducers({
  products,
  clients,
  rents,
});
