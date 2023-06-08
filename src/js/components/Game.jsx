/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { connect } from 'react-redux';
import Board from './Board';
import { squareChosen, jumpTo } from '../actions/TicTacToeActions';
import { STATUS_STARTING, STATUS_ACTIVE, STATUS_DRAW, STATUS_WINNER } from '../constants/Constants';

const mapStateToProps = (state) => {
    return {
        gameState: state.gameState
    };
};

const mapDispatchToProps = (dispatch) => {
    return {    
        squareChosen: (square) => dispatch(squareChosen(square)),
        jumpTo: (step) => dispatch(jumpTo(step))
    };
};

const Game = (props) => {

    const handleClick = (i) => {
        if (props.gameState.status == STATUS_STARTING || props.gameState.status == STATUS_ACTIVE) {
            props.squareChosen(i);
        } else {
            console.log("game is already over");
        }
    }

    const jumpTo = (step) => {
        props.jumpTo(step);
    }

    const history = props.gameState.history;
    const current = props.gameState.currentSquares;
    const winner = props.gameState.winner;
    
    const moves = history.map((step, move) => {
        const desc = move ?
              'Go to move #' + move :
              'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    var gameStatus = props.gameState.status;
    let status;
    switch (gameStatus) {
    case STATUS_WINNER:
        status = "Winner: " + winner;
        break;
    case STATUS_DRAW:
        status = 'Draw';
        break;
    default:
        status = "Next player: " + (props.gameState.xIsNext ? "X" : "O");
        break;
    }
    
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current}
                    onClick={i => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
