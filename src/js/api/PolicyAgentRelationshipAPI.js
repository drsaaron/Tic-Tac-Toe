/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import request from 'superagent';
import { DATA_URL_ROOT } from '../constants/Constants';

export default class PolicyAgentRelationshipAPI {
    static getComponentsForProductContract(productContractNumber) {
        return request
                .get(DATA_URL_ROOT + "/policyAgentRelationshipComponents/" + productContractNumber)
                .then(res => {
                    return JSON.parse(res.text)
                });
    }

    static getSingleComponentForProductContract(productContractNumber, componentType, startDate) {
        return request
                .get(DATA_URL_ROOT + "/policyAgentRelationshipComponents/" + productContractNumber)
                .query({componentType: componentType, startDate: startDate})
                .then(res => {
                    return JSON.parse(res.text);
                });
    }

    static getFRsForComponent(productContractNumber, componentType, startDate) {
        return request
                .get(DATA_URL_ROOT + "/policyAgentRelationshipComponentFRs/" + productContractNumber)
                .query({componentType: componentType, startDate: startDate})
                .then(res => {
                    return  JSON.parse(res.text);
                });
    }
}
