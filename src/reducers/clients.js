const FETCH_CLIENTS = 'FETCH_CLIENTS';
const FETCH_CLIENT = 'FETCH_CLIENT';
const UPDATE_CLIENT = 'UPDATE_CLIENT';
const ADD_CLIENT = 'ADD_CLIENT';
const REMOVE_CLIENT = 'REMOVE_CLIENT';

const clientsReducer = (clients = [], { type, payload }) => {
  switch (type) {
    case FETCH_CLIENTS:
      return payload;
    case FETCH_CLIENT:
      return payload;
    case UPDATE_CLIENT:
      return payload;
    case REMOVE_CLIENT:
      return clients.filter((client) => client._id !== payload);
    case ADD_CLIENT:
      return [...clients];
    default:
      return clients;
  }
};

export default clientsReducer;
