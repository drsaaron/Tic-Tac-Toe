/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// A tic-tac-toe game, based on demo code at https://codepen.io/gaearon/pen/gWWZgR?editors=0100

import Game from './Game';
import { Provider } from 'react-redux';
import store from '../store/TicTacToeStore';

const App = (props) => {
    return (
        <Provider store={store}>
            <Game />
        </Provider>
    );
};

export default App;
