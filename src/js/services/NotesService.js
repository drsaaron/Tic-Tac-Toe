/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import ActionTypes from '../actions/ActionTypes';
import request from 'superagent';
import { DATA_URL_ROOT } from '../constants/Constants';

const NotesService = store => next => action => {
            next(action);
            switch (action.type) {
                case ActionTypes.RETRIEVE_NOTES_DATA:
                    request
                            .get(DATA_URL_ROOT + "/productContractNotes/" + action.productContractNumber)
                            .then(res => {
                                return JSON.parse(res.text);
                            })
                            .then(notes => {
                                store.dispatch({
                                    type: ActionTypes.NOTES_DATA_RETRIEVED,
                                    notes
                                });
                                return notes;
                            });

                    break;
            }
        };

export default NotesService;

