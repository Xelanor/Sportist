import {ADD_TO_BASKET} from './types';

export const addToBasket = (match, odd) => ({
  type: ADD_TO_BASKET,
  match,
  odd,
});
