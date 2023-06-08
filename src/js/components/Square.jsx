/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const Square = (props) => {

    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
};

export default Square;
