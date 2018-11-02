import ActionTypes from '../actions/ActionTypes.js';
import policyAgentRelationshipAPI from '../api/PolicyAgentRelationshipAPI';

const PolicyAgentRelationshipService = store => next => action => {
            next(action);
            switch (action.type) {
                case ActionTypes.RETRIEVE_PAR_DATA:
                    var productContractNumber = action.productContractNumber;
                    policyAgentRelationshipAPI.getComponentsForProductContract(productContractNumber)
                            .then(data => {
                                store.dispatch({
                                    type: ActionTypes.PAR_DATA_RETRIEVED,
                                    data
                                });
                                return data;
                            });

                    break;
            }
        };

export default PolicyAgentRelationshipService;
