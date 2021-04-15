const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

const initialState = {
  type: null,
  content: null,
};

const notificationReducer = (notifications = initialState, { type, payload }) => {
  switch (type) {
    case ADD_NOTIFICATION:
      return {
        type: payload,
        content: payload,
      };
    case CLEAR_NOTIFICATION:
      return {
        type: null,
        content: null,
      };
    default:
      return notifications;
  }
};

export default notificationReducer;
