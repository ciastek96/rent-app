const FETCH_ACCOUNT_REQUEST = 'FETCH_ACCOUNT_REQUEST';
const FETCH_ACCOUNT_SUCCESS = 'FETCH_ACCOUNT_SUCCESS';
const FETCH_ACCOUNT_FAILURE = 'FETCH_ACCOUNT_FAILURE';

const UPDATE_ACCOUNT_REQUEST = 'UPDATE_ACCOUNT_REQUEST';
const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';
const UPDATE_ACCOUNT_FAILURE = 'UPDATE_ACCOUNT_FAILURE';

const LOGOUT_USER = 'LOGOUT_USER';

const initialState = {
  loading: false,
  error: null,
  success: null,
};

const accountReducer = (accounts = initialState, { type, payload, error }) => {
  switch (type) {
    case LOGOUT_USER:
      return {
        accounts: initialState,
      };
    case FETCH_ACCOUNT_SUCCESS:
      return {
        ...payload,
        error: false,
        loading: false,
      };
    case FETCH_ACCOUNT_REQUEST:
      return {
        ...accounts,
        error: null,
        loading: true,
      };
    case FETCH_ACCOUNT_FAILURE:
      return {
        error,
        loading: false,
      };
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...payload,
        loading: false,
        error: null,
        success: true,
      };
    case UPDATE_ACCOUNT_REQUEST:
      return {
        ...accounts,
        loading: true,
        error: null,
        success: null,
      };
    case UPDATE_ACCOUNT_FAILURE:
      return {
        ...accounts,
        loading: false,
        success: null,
        error,
      };
    default:
      return accounts;
  }
};

export default accountReducer;
