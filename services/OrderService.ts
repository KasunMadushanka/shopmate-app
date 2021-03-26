import { Auth, API } from "aws-amplify";
import apiConfig from "../config/api-config";

const OrderDbService = {

    createOrder: async (order: any, session: any) => {
        const init = getInit(session);    
        init.body = order;

        return API.post(
            apiConfig.name, `/${apiConfig.env}/orders`, init
        );
    },

    updateOrder: async (order: any, session: any) => {
        const init = getInit(session);   
        init.body = order;

        return API.put(
            apiConfig.name, `/${apiConfig.env}/orders`, init
        );
    },
};

const getInit = (session: any) => {
    return {
        headers: {
            Authorization:
                "Bearer " + session.getIdToken().getJwtToken(),
        },
    };
};

export default OrderDbService;
