import ActionTypes from '../actions/ActionTypes';
import { STATUS_STARTING, STATUS_ACTIVE, STATUS_DRAW, STATUS_WINNER } from '../constants/Constants';

const initialState = {
    history: [
        {
            squares: Array(9).fill(null)
        }
    ],
    stepNumber: 0,
    xIsNext: true,
    currentSquares: Array(9).fill(null),
    winner: null,
    status: STATUS_STARTING
};

export default function ticTacToeReducer(state = initialState, action) {
    switch (action.type) {

        case ActionTypes.HISTORY_UPDATE:
            return {
                ...state,
                history: action.history
            }

        case ActionTypes.WINNER_UPDATE:
            return {
                ...state,
                winner: action.winner
            }

        case ActionTypes.GAME_STATUS_UPDATE:
            return {
                ...state,
                status: action.status
            }

        case ActionTypes.STEP_NUMBER_UPDATE:
            return {
                ...state,
                stepNumber: action.stepNumber,
                xIsNext: (action.stepNumber % 2) === 0
            }

        case ActionTypes.CURRENT_SQUARES_UPDATE:
            return {
                ...state,
                currentSquares: action.squares
            }

        default:
            return {
                ...state
            }
}
};

