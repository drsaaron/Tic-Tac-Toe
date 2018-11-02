/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import ActionTypes from './ActionTypes';

export function retrieveTransactionStatus(transaction) {
    return {
        type: ActionTypes.RETRIEVE_TRANSACTION_STATUS,
        transaction
    };
};

