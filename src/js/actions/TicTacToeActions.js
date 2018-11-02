import ActionTypes from './ActionTypes.js';
import { STATUS_STARTING, STATUS_ACTIVE, STATUS_DRAW, STATUS_WINNER } from '../constants/Constants';

export function squareChosen(square) {
    return (dispatch, getState) => {
        var gameState = getState().gameState;
        var history = gameState.history.slice(0, gameState.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // Are we clicking on a square already chosen?  If yes just return 
        if (squares[square]) {
            return;
        }

        // set the square value.
        squares[square] = gameState.xIsNext ? "X" : "O";

        // update state values.
        var winner = calculateWinner(squares);
        var stepNumber = ++gameState.stepNumber;
        var status = determineStatus(winner, stepNumber);

        // new squares
        history = history.concat([
            {
                squares: squares
            }
        ]);

        dispatch({type: ActionTypes.HISTORY_UPDATE, history});
        dispatch({type: ActionTypes.CURRENT_SQUARES_UPDATE, squares});
        dispatch({type: ActionTypes.STEP_NUMBER_UPDATE, stepNumber});
        dispatch({type: ActionTypes.GAME_STATUS_UPDATE, status});
        dispatch({type: ActionTypes.WINNER_UPDATE, winner});
    };
}

export function jumpTo(step) {
    return (dispatch, getState) => {
        var state = getState().gameState;
        var squares = state.history[step].squares;
        var winner = calculateWinner(squares);
        var status = determineStatus(winner, step);
        
        var stepNumber = step;
        
        dispatch({type: ActionTypes.CURRENT_SQUARES_UPDATE, squares});
        dispatch({type: ActionTypes.STEP_NUMBER_UPDATE, stepNumber});
        dispatch({type: ActionTypes.GAME_STATUS_UPDATE, status});
        dispatch({type: ActionTypes.WINNER_UPDATE, winner});
    };
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function determineStatus(winner, stepNumber) {
    if (winner) {
        return STATUS_WINNER;
    } else if (stepNumber === 0) {
        return STATUS_STARTING;
    } else if (stepNumber === 9) {
        // we've had 9 choices and no winner, so it's a draw
        return STATUS_DRAW;
    } else {
        return STATUS_ACTIVE;
    }
}