import ActionTypes from '../actions/ActionTypes';

const initialState = {
    history: [
        {
            squares: Array(9).fill(null)
        }
    ],
    stepNumber: 0,
    xIsNext: true,
    currentSquares: Array(9).fill(null),
    winner: null
};

export default function ticTacToeReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SQUARE_CLICKED:
            var square = action.square;
            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (squares[square]) {
                return {
                    ...state
                };
            }
            squares[square] = state.xIsNext ? "X" : "O";
            var winner = calculateWinner(squares);
            return {
                ...state,
                stepNumber: ++state.stepNumber,
                xIsNext: !state.xIsNext,
                history: history.concat([
                    {
                        squares: squares
                    }
                ]),
                currentSquares: squares,
                winner: winner
            };

        case ActionTypes.JUMP:
            var step = action.step;
            return {
                ...state,
                stepNumber: step,
                xIsNext: (step % 2) === 0,
                currentSquares: state.history[step].squares,
                winner: calculateWinner(state.history[step].squares)
            };

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
