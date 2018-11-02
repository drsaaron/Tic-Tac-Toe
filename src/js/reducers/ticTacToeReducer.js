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
        case ActionTypes.SQUARE_CLICKED:
            var square = action.square;
            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();

            // Are we clicking on a square already chosen?  If yes just return current state
            if (squares[square]) {
                return {
                    ...state
                };
            }

            // set the square value.
            squares[square] = state.xIsNext ? "X" : "O";

            // update state values.
            var winner = calculateWinner(squares);
            var stepNumber = ++state.stepNumber;
            var status = determineStatus(winner, stepNumber);

            // return new state
            return {
                ...state,
                stepNumber: stepNumber,
                xIsNext: !state.xIsNext,
                history: history.concat([
                    {
                        squares: squares
                    }
                ]),
                currentSquares: squares,
                winner: winner,
                status: status
            };

        case ActionTypes.JUMP:
            var step = action.step;
            var squares = state.history[step].squares;
            var winner = calculateWinner(squares);
            var status = determineStatus(winner, step);
            return {
                ...state,
                stepNumber: step,
                xIsNext: (step % 2) === 0,
                currentSquares: squares,
                winner: winner,
                status: status
            };

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