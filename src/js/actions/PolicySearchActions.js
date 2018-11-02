import ActionTypes from "./ActionTypes.js";

export function searchProductContract(productContractNumber) {
    var actions = [
        { type: ActionTypes.SEARCH_PRODUCT_CONTRACT, productContractNumber },
        { type: ActionTypes.RETRIEVE_PAR_DATA, productContractNumber },
        { type: ActionTypes.RETRIEVE_TRANSACTION_HISTORY_DATA, productContractNumber },
        { type: ActionTypes.RETRIEVE_COMPONENT_SPLITS_DATA, productContractNumber },
        { type: ActionTypes.RETRIEVE_NOTES_DATA, productContractNumber }
    ];
    
    return (dispatch) => {
        actions.map( (action) => { dispatch(action); });
    };
}

