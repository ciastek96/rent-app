const FETCH_RENTS_REQUEST = 'FETCH_RENTS_REQUEST';
const FETCH_RENTS_SUCCESS = 'FETCH_RENTS_SUCCESS';
const FETCH_RENTS_FAILURE = 'FETCH_RENTS_FAILURE';

const ADD_RENT_REQUEST = 'ADD_RENT_REQUEST';
const ADD_RENT_SUCCESS = 'ADD_RENT_SUCCESS';
const ADD_RENT_FAILURE = 'ADD_RENT_FAILURE';

const REMOVE_RENT_REQUEST = 'REMOVE_RENT_REQUEST';
const REMOVE_RENT_SUCCESS = 'REMOVE_RENT_SUCCESS';
const REMOVE_RENT_FAILURE = 'REMOVE_RENT_FAILURE';

const UPDATE_RENT_REQUEST = 'UPDATE_RENT_REQUEST';
const UPDATE_RENT_SUCCESS = 'UPDATE_RENT_SUCCESS';
const UPDATE_RENT_FAILURE = 'UPDATE_RENT_FAILURE';

const FINISH_RENT_REQUEST = 'FINISH_RENT_REQUEST';
const FINISH_RENT_SUCCESS = 'FINISH_RENT_SUCCESS';
const FINISH_RENT_FAILURE = 'FINISH_RENT_FAILURE';

const LOGOUT_USER = 'LOGOUT_USER';

const initialState = {
  loading: false,
  error: null,
  success: null,
  rents: [],
};

const rentsReducer = (rent = initialState, { type, payload, error }) => {
  switch (type) {
    case LOGOUT_USER:
      return [];
    case FETCH_RENTS_REQUEST:
      return {
        ...rent,
        error: null,
        success: null,
        loading: true,
      };
    case FETCH_RENTS_SUCCESS:
      return {
        error: null,
        success: null,
        loading: false,
        rents: payload,
      };
    case FETCH_RENTS_FAILURE:
      return {
        success: null,
        loading: false,
        rents: [],
        error,
      };
    case ADD_RENT_REQUEST:
      return {
        ...rent,
        error: null,
        success: null,
        loading: true,
      };
    case ADD_RENT_SUCCESS:
      return {
        error: null,
        success: null,
        loading: false,
        rents: [...rent.rents, payload],
      };
    case ADD_RENT_FAILURE:
      return {
        ...rent,
        success: null,
        loading: false,
        error,
      };
    case REMOVE_RENT_REQUEST:
      return {
        ...rent,
        error: null,
        success: null,
        loading: true,
      };
    case REMOVE_RENT_SUCCESS:
      return {
        error: null,
        success: null,
        loading: false,
        rents: rent.rents.filter((i) => i._id !== payload),
      };
    case REMOVE_RENT_FAILURE:
      return {
        ...rent,
        success: null,
        loading: false,
        error,
      };
    case UPDATE_RENT_REQUEST:
      return {
        ...rent,
        error: null,
        success: null,
        loading: true,
      };
    case UPDATE_RENT_SUCCESS:
      return {
        error: null,
        success: true,
        loading: false,
        rents: rent.rents.map((i) => (i._id === payload._id ? payload : i)),
      };
    case UPDATE_RENT_FAILURE:
      return {
        ...rent,
        success: null,
        loading: false,
        error,
      };
    case FINISH_RENT_REQUEST:
      return {
        ...rent,
        error: null,
        success: null,
        loading: true,
      };
    case FINISH_RENT_SUCCESS:
      return {
        error: null,
        success: true,
        loading: false,
        rents: rent.rents.map((i) => (i._id === payload._id ? payload : i)),
      };
    case FINISH_RENT_FAILURE:
      return {
        ...rent,
        success: null,
        loading: false,
        error,
      };
    default:
      return rent;
  }
};

export default rentsReducer;
