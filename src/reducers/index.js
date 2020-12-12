const initialState = {
  products: [
    {
      id: 0,
      title: 'Odkurzacz piorący Karcher k7',
      data: '05 Paź',
      renter: 'Jeam Beam',
    },
    {
      id: 1,
      title: 'Wiertnica do betonu Dedra',
      data: '02 Paź',
      renter: 'Tomasz Hajto',
    },
    {
      id: 2,
      title: 'Wiertarka Makita',
      data: '29 Wrz',
      renter: 'Jeam Beam',
    },
    {
      id: 3,
      title: 'Szalunki systemowe',
      data: '20 Wrz',
      renter: 'Adam Małysz',
    },
  ],
};

const rootReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return action.payload;
    case 'REMOVE_PRODUCT':
      return state;
    case 'ADD_PRODUCT':
      return state;
    case 'FETCH_CLIENTS':
      return action.payload;
    default:
      return state;
  }
};

export default rootReducer;
