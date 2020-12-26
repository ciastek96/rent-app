const FETCH_ACCOUNT = 'FETCH_ACCOUNT';
const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';

const accountReducer = (account = [], { type, payload }) => {
  switch (type) {
    case FETCH_ACCOUNT:
      return payload;
    case FETCH_ACCOUNTS:
      return payload;
    case UPDATE_ACCOUNT:
      return payload;
    default:
      return account;
  }
};

export default accountReducer;
