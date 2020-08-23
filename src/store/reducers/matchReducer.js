import {SET_MATCHES, ADD_TO_BASKET, SET_USER_DETAILS} from '../actions/types';

const initialState = {
  userDetails: {},
  matches: [],
  basket: {},
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {...state, userDetails: action.userDetails};

    case SET_MATCHES:
      return {...state, matches: action.matches};

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
