import ActionTypes from '../actions/ActionTypes';
import { calculateWinner } from '../actions/calculateWinner';

const initialState = {
    history: [
        {
            squares: Array(9).fill(null)
        }
    ],
    stepNumber: 0,
    xIsNext: true
};

export default function ticTacToeReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SQUARE_CLICKED:
            var square = action.square;
            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[square]) {
                return;
            }
            squares[square] = state.xIsNext ? "X" : "O";
            return {
                ...state,
                stepNumber: ++state.stepNumber,
                xIsNext: !state.xIsNext,
                history: history.concat([
                    {
                        squares: squares
                    }
                ]),
            };

        case ActionTypes.JUMP:
            var step = action.step;
            return {
                ...state,
                stepNumber: step,
                xIsNext: (step % 2) === 0
            };

        default:
            return {
                ...state
            }
}
};


