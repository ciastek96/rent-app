const FETCH_CLIENTS_REQUEST = 'FETCH_CLIENTS_REQUEST';
const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
const FETCH_CLIENTS_FAILURE = 'FETCH_CLIENTS_FAILURE';

// const FETCH_CLIENT = 'FETCH_CLIENT';

const ADD_CLIENT_REQUEST = 'ADD_CLIENT_REQUEST';
const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS';
const ADD_CLIENT_FAILURE = 'ADD_CLIENT_FAILURE';

const UPDATE_CLIENT_REQUEST = 'UPDATE_CLIENT_REQUEST';
const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS';
const UPDATE_CLIENT_FAILURE = 'UPDATE_CLIENT_FAILURE';

const REMOVE_CLIENT_REQUEST = 'REMOVE_CLIENT_REQUEST';
const REMOVE_CLIENT_SUCCESS = 'REMOVE_CLIENT_SUCCESS';
const REMOVE_CLIENT_FAILURE = 'REMOVE_CLIENT_FAILURE';

const LOGOUT_USER = 'LOGOUT_USER';

const initialState = {
  loading: false,
  error: null,
  success: null,
  clients: [],
};

const clientsReducer = (client = initialState, { type, payload, error }) => {
  switch (type) {
    case LOGOUT_USER:
      return [];
    case FETCH_CLIENTS_REQUEST:
      return {
        ...client,
        loading: true,
        success: false,
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        loading: false,
        clients: payload,
      };
    case FETCH_CLIENTS_FAILURE:
      return {
        error,
        success: null,
        clients: [],
      };
    case REMOVE_CLIENT_REQUEST:
      return {
        ...client,
        error: null,
        success: null,
        loading: true,
      };
    case REMOVE_CLIENT_SUCCESS:
      return {
        error: null,
        success: null,
        loading: false,
        clients: client.clients.filter((i) => i._id !== payload),
      };
    case REMOVE_CLIENT_FAILURE:
      return {
        ...client,
        loading: false,
        success: null,
        error,
      };
    case ADD_CLIENT_REQUEST:
      return {
        ...client,
        loading: true,
        error: null,
        success: null,
      };
    case ADD_CLIENT_SUCCESS:
      return {
        loading: false,
        clients: [...client.clients, payload],
      };
    case ADD_CLIENT_FAILURE:
      return {
        ...client,
        loading: false,
        success: null,
        error,
      };
    case UPDATE_CLIENT_REQUEST:
      return {
        ...client,
        loading: true,
        error: null,
        success: null,
      };
    case UPDATE_CLIENT_SUCCESS:
      return {
        loading: false,
        success: true,
        clients: client.clients.map((i) => (i._id === payload._id ? payload : i)),
      };
    case UPDATE_CLIENT_FAILURE:
      return {
        ...client,
        loading: false,
        success: null,
        error,
      };
    // case FETCH_CLIENT:
    //   return payload;
    // case UPDATE_CLIENT:
    //   return clients.map((client) => (client._id === payload._id ? payload : client));
    // case REMOVE_CLIENT:
    //   return clients.filter((client) => client._id !== payload);
    // case ADD_CLIENT:
    //   return [...client, payload];
    default:
      return client;
  }
};

export default clientsReducer;
