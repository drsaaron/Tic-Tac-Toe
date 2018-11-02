import { createStore, applyMiddleware } from 'redux';
import ticTacToeReducer from '../reducers/ticTacToeReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(ticTacToeReducer, {}, applyMiddleware(thunk, logger));

export default store;
