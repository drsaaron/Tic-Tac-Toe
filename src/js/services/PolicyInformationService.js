import request from 'superagent';
import ActionTypes from '../actions/ActionTypes.js';
import { DATA_URL_ROOT } from '../constants/Constants.js';

const PolicyInformationService = store => next => action => {
            next(action);
            switch (action.type) {
                case ActionTypes.SEARCH_PRODUCT_CONTRACT:
                    var productContractNumber = action.productContractNumber;
                    request
                            .get(DATA_URL_ROOT + "/productContract/" + productContractNumber)
                            .then(res => {
                                return JSON.parse(res.text);
                            })
                            .then(data => {
                                store.dispatch({
                                    type: ActionTypes.PRODUCT_CONTRACT_DATA_RETRIEVED,
                                    data
                                });
                                return data;
                            });

                    break;
            }
        };

export default PolicyInformationService;
