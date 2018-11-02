/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, {Component} from 'react';

export default class Square extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <button className="square" onClick={this.props.onClick}>
                    {this.props.value}
                </button>
                );
    }
}
