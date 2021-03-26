import { Auth, API } from "aws-amplify";
import apiConfig from "../config/api-config";

const PaymentService = {

    authorizePayment: async (data: any, session: any) => {
        var init = getInit(session);
        init.body = data;

        return API.post(apiConfig.name, `/${apiConfig.env}/payments/authorize`, init)
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

export default PaymentService;
