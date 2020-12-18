const FETCH_RENTS = 'FETCH_RENTS';
const ADD_RENT = 'ADD_RENT';
const REMOVE_RENT = 'REMOVE_RENT';

const rentsReducer = (rents = [], { type, payload }) => {
  switch (type) {
    case FETCH_RENTS:
      return payload;
    case REMOVE_RENT:
      return rents.filter((rent) => rent._id !== payload);
    case ADD_RENT:
      return [...rents];
    default:
      return rents;
  }
};

export default rentsReducer;
