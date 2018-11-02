/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import ActionTypes from '../actions/ActionTypes';
import request from 'superagent';
import { DATA_URL_ROOT } from '../constants/Constants';

const ComponentSplitsService = store => next => action => {
            next(action);
            switch (action.type) {
                case ActionTypes.RETRIEVE_COMPONENT_SPLITS_DATA:
                    request
                            .get(DATA_URL_ROOT + "/componentSplits/" + action.productContractNumber)
                            .then(res => {
                                return JSON.parse(res.text);
                            })
                            .then(splits => {
                                store.dispatch({type: ActionTypes.COMPONENT_SPLITS_DATA_RETRIEVED, splits});
                                return splits;
                            });

                    break;
            }
        };

export default ComponentSplitsService;


