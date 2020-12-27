const SET_CURRENT_USER = 'SET_CURRENT_USER';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_ERROR = 'REGISTER_ERROR';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: [],
  success: [],
};

const usersReducer = (users = initialState, { type, payload }) => {
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
        success: [],
      };
    case REGISTER_SUCCESS:
      return {
        ...users,
        error: [],
        success: payload,
      };
    case LOGIN_ERROR:
      return {
        ...users,
        error: payload,
        success: [],
      };
    case LOGIN_SUCCESS:
      return {
        ...users,
        error: [],
        success: payload,
      };
    case UPDATE_PASSWORD:
      return users.map((user) => (user.userID === payload.userID ? payload : user));
    default:
      return users;
  }
};

export default usersReducer;
