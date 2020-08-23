import {
  SET_MATCHES,
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  SET_USER_DETAILS,
  CLEAR_BASKET,
} from '../actions/types';

const initialState = {
  userDetails: null,
  matches: [],
  basket: {},
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {...state, userDetails: action.userDetails};

    case SET_MATCHES:
      let newBasketSet = {...state.basket};
      Object.keys(state.basket).map((basketMatchId) => {
        const match = action.matches.find(
          (match) => match._id === basketMatchId,
        );
        if (!match) {
          delete newBasketSet[basketMatchId];
        }
      });
      return {...state, matches: action.matches, basket: newBasketSet};

    case ADD_TO_BASKET:
      let newBasket = {...state.basket};
      const matchId = action.match._id;

      if (matchId in newBasket && newBasket[matchId] === action.odd) {
        delete newBasket[matchId];
      } else {
        newBasket[matchId] = action.odd;
      }

      return {...state, basket: newBasket};

    case REMOVE_FROM_BASKET:
      let newRemoveBasket = {...state.basket};
      delete newRemoveBasket[action.id];

      return {...state, basket: newRemoveBasket};

    case CLEAR_BASKET:
      return {...state, basket: {}};

    default:
      return {...state};
  }
};

export default matchReducer;
