/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
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

class Game extends Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }

    handleClick(i) {
        if (this.props.gameState.status == STATUS_STARTING || this.props.gameState.status == STATUS_ACTIVE) {
            this.props.squareChosen(i);
        } else {
            console.log("game is already over");
        }
    }

    jumpTo(step) {
        this.props.jumpTo(step);
    }

    render() {
        const history = this.props.gameState.history;
        const current = this.props.gameState.currentSquares;
        const winner = this.props.gameState.winner;

        const moves = history.map((step, move) => {
            const desc = move ?
                    'Go to move #' + move :
                    'Go to game start';
            return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                    );
        });

        var gameStatus = this.props.gameState.status;
        let status;
        switch (gameStatus) {
            case STATUS_WINNER:
                status = "Winner: " + winner;
                break;
            case STATUS_DRAW:
                status = 'Draw';
                break;
            default:
                status = "Next player: " + (this.props.gameState.xIsNext ? "X" : "O");
                break;
        }

        return (
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current}
                            onClick={i => this.handleClick(i)}
                            />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
                );
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
