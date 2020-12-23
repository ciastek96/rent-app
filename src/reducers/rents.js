const FETCH_RENTS = 'FETCH_RENTS';
const ADD_RENT = 'ADD_RENT';
const REMOVE_RENT = 'REMOVE_RENT';
const UPDATE_RENT = 'UPDATE_RENT';
const FINISH_RENT = 'FINISH_RENT';

const rentsReducer = (rents = [], { type, payload }) => {
  switch (type) {
    case FETCH_RENTS:
      return payload;
    case UPDATE_RENT:
      return rents.map((rent) => (rent._id === payload._id ? payload : rent));
    case FINISH_RENT:
      return rents.map((rent) => (rent._id === payload._id ? payload : rent));
    case REMOVE_RENT:
      return rents.filter((rent) => rent._id !== payload);
    case ADD_RENT:
      return [...rents, payload];
    default:
      return rents;
  }
};

export default rentsReducer;
