import { combineReducers } from 'redux';
import product from './product';
import client from './client';
import account from './account';
import rent from './rent';
import users from './users';

export default combineReducers({
  product,
  client,
  rent,
  users,
  account,
});
