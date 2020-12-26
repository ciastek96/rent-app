import { combineReducers } from 'redux';
import products from './products';
import clients from './clients';
import account from './account';
import rents from './rents';
import users from './users';

export default combineReducers({
  products,
  clients,
  rents,
  users,
  account,
});
