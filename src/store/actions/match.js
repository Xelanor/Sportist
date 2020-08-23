import {
  SET_MATCHES,
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  SET_USER_DETAILS,
  CLEAR_BASKET,
} from './types';

export const fetchMatches = (matches) => ({
  type: SET_MATCHES,
  matches,
});

export const addToBasket = (match, odd) => ({
  type: ADD_TO_BASKET,
  match,
  odd,
});

export const removeFromBasket = (id) => ({
  type: REMOVE_FROM_BASKET,
  id,
});

export const setUserDetails = (userDetails) => ({
  type: SET_USER_DETAILS,
  userDetails,
});

export const clearBasket = () => ({
  type: CLEAR_BASKET,
});
