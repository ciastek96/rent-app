const FETCH_CLIENTS = 'FETCH_CLIENTS';
const ADD_CLIENT = 'ADD_CLIENT';
const REMOVE_CLIENT = 'REMOVE_CLIENT';

const clientsReducer = (clients = [], { type, payload }) => {
  switch (type) {
    case FETCH_CLIENTS:
      return payload;
    case REMOVE_CLIENT:
      return clients;
    case ADD_CLIENT:
      return clients;
    default:
      return clients;
  }
};

export default clientsReducer;
