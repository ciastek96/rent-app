const SET_CURRENT_USER = 'SET_CURRENT_USER';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const REGISTER_ERROR = 'REGISTER_ERROR';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: null,
  success: null,
};

const usersReducer = (users = initialState, { type, payload, error }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: true,
        user: payload,
      };
    case LOGOUT_USER:
      return {
        isAuthenticated: false,
        user: payload,
      };
    case REGISTER_ERROR:
      return {
        ...users,
        error: payload,
        success: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...users,
        error: null,
        success: payload,
      };
    case LOGIN_FAILURE:
      return {
        ...users,
        error,
        success: null,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...users,
        isAuthenticated: true,
        user: payload,
        error: null,
        success: payload,
        loading: false,
      };
    case LOGIN_REQUEST:
      return {
        isAuthenticated: false,
        ...users,
        error: null,
        success: payload,
        loading: true,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...users,
        loading: false,
        error: null,
        success: payload,
      };
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...users,
        loading: true,
        error: null,
        success: null,
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...users,
        loading: false,
        error,
        success: null,
      };
    default:
      return users;
  }
};

export default usersReducer;
