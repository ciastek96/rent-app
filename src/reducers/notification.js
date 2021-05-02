// const RESET_NOTIFICATION = 'RESET_NOTIFICATION';
const RESET_NOTIFICATION = 'RESET_NOTIFICATION';
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

const initialState = {
  type: null,
  content: null,
};

const notificationReducer = (notifications = initialState, { type, payload }) => {
  switch (type) {
    case ADD_NOTIFICATION:
      return {
        type: payload.type,
        content: payload.content,
      };
    // case RESET_NOTIFICATION:
    //   return notifications.filter((notification) => notification.id !== payload.id);
    case RESET_NOTIFICATION:
      return initialState;
    default:
      return notifications;
  }
};

export default notificationReducer;
