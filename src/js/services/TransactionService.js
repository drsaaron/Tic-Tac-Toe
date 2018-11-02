import request from 'superagent';
import ActionTypes from '../actions/ActionTypes.js';
import { DATA_URL_ROOT } from '../constants/Constants.js';

const TransactionService = store => next => action => {
            next(action);
            switch (action.type) {
                case ActionTypes.RETRIEVE_TRANSACTION_HISTORY_DATA:
                    var productContractNumber = action.productContractNumber;
                    request
                            .get(DATA_URL_ROOT + "/transactions/" + productContractNumber)
                            .then(res => {
                                return JSON.parse(res.text);
                            })
                            .then(data => {
                                console.log("transactions retrieved.");
                                store.dispatch({type: ActionTypes.TRANSACTION_HISTORY_DATA_RETRIEVED, data});
                                return data;
                            })
                            .then(data => {
                                data.map(transaction => {
                                    console.log("getting status for " + transaction.number);
                                    store.dispatch({type: ActionTypes.RETRIEVE_TRANSACTION_STATUS, transaction});
                                });
                                return data;
                            });

                    break;

                case ActionTypes.RETRIEVE_TRANSACTION_STATUS:
                    var transaction = action.transaction;
                    request
                            .get(DATA_URL_ROOT + "/transactionStatus/" + transaction.number)
                            .query({productContractNumber: transaction.productContractNumber, transactionType: transaction.type})
                            .then(res => {
                                return JSON.parse(res.text);
                            })
                            .then(status => {
                                store.dispatch({
                                    type: ActionTypes.TRANSACTION_STATUS_RETRIEVED,
                                    status,
                                    transaction
                                });
                            });

                    break;
            }
        };

export default TransactionService;
