import {ADD_TO_BASKET} from '../actions/types';

const initialState = {
  basket: {},
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      let newBasket = {...state.basket};
      const matchId = action.match._id;

      if (matchId in newBasket && newBasket[matchId] === action.odd) {
        delete newBasket[matchId];
      } else {
        newBasket[matchId] = action.odd;
      }

      return {...state, basket: newBasket};

    default:
      return {...state};
  }
};

export default matchReducer;
