import ActionTypes from '../actions/ActionTypes.js';
import policyAgentRelationshipAPI from '../api/PolicyAgentRelationshipAPI';

export function retrieveFRsForComponent(productContractNumber, componentType, startDate) {
    return (dispatch) => {
        dispatch({ type: ActionTypes.SEARCH_PAR_COMPONENT_DETAILS });
        
        policyAgentRelationshipAPI.getSingleComponentForProductContract(productContractNumber, componentType, startDate)
                .then(component => {
                    dispatch({
                        type: ActionTypes.PAR_COMPONENT_DETAIL_COMPONENT_RETRIEVED,
                        component});
                });

        policyAgentRelationshipAPI.getFRsForComponent(productContractNumber, componentType, startDate)
                .then(frDetails => {
                    dispatch({
                        type: ActionTypes.PAR_COMPONENT_DETAIL_DATA_RETRIEVED,
                        frDetails
                    });
                });

    };
}
