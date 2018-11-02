import ActionTypes from '../actions/ActionTypes';
import { DATA_URL_ROOT } from '../constants/Constants';
import request from 'superagent';

export function retrieveTransactionDetails(productContractNumber, transactionNumber, transactionType) {

    return (dispatch) => {
        // dispatch an event to clear out the store
        dispatch({type: ActionTypes.SEARCH_TRANSACTION_DETAILS});

        // get the transaction itself
        request
                .get(DATA_URL_ROOT + "/transactions/" + productContractNumber + "/" + transactionNumber)
                .query({transactionType: transactionType})
                .then(res => {
                    return JSON.parse(res.text);
                })
                .then(transaction => {
                    dispatch({type: ActionTypes.TRANSACTION_DETAIL_TRANSACTION_RETRIEVED, transaction});
                    return transaction;
                });

        // now get the details
        request
                .get(DATA_URL_ROOT + "/transactionDetail/" + transactionNumber)
                .query({productContractNumber: productContractNumber, transactionType: transactionType})
                .then(res => {
                    return JSON.parse(res.text);
                })
                .then(detail => {
                    dispatch({
                        type: ActionTypes.TRANSACTION_DETAIL_DATA_RETRIEVED,
                        detail
                    });
                });
    };
}
