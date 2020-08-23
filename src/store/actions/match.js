import {SET_MATCHES, ADD_TO_BASKET, SET_USER_DETAILS} from './types';

export const fetchMatches = (matches) => ({
  type: SET_MATCHES,
  matches,
});

export const addToBasket = (match, odd) => ({
  type: ADD_TO_BASKET,
  match,
  odd,
});

export const setUserDetails = (userDetails) => ({
  type: SET_USER_DETAILS,
  userDetails,
});
