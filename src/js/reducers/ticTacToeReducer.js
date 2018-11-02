import ActionTypes from '../actions/ActionTypes';

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
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (this.calculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = this.state.xIsNext ? "X" : "O";
            return {
                ...state,
                stepNumber: state.stepNumber++,
                xIsNext: !state.xIsNext,
                history: history.concat([
                    {
                        squares: squares
                    }
                ]),
            };

        default:
            return {
                ...state
            }
}
};


