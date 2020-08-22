import {createStore, combineReducers} from 'redux';
import matchReducer from './reducers/matchReducer';

const rootReducer = combineReducers({
  matches: matchReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
