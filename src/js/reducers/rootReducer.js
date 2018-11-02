/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import { combineReducers } from 'redux';
import ticTacToeReducer from './ticTacToeReducer';

const rootReducer = combineReducers(
        {
            gameState: ticTacToeReducer
        }
);

export default rootReducer;