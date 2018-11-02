import ActionTypes from './ActionTypes.js';

export function squareChosen(square) {
    return (dispatch) => {
        dispatch({ type: ActionTypes.SQUARE_CLICKED, square });
    };
}

export function jumpTo(step) {
    return (dispatch) => {
        dispatch({ type: ActionTypes.JUMP, step });
    };
}