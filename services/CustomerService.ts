import { Auth, API } from "aws-amplify";
import apiConfig from "../config/api-config";

const CustomerDbService = {

    createCustomer: async (user: any, session: any) => {
        const init = getInit(session);    
        init.body = {
            firstName: user.attributes.given_name,
            lastName: user.attributes.family_name,
            email: user.attributes.email,
            status: true
        };

        return API.post(
            apiConfig.name,
            `/${apiConfig.env}/customers`,
            init
        );
    },

    getCustomer: async (user: any, session: any) => {
        const init = getInit(session);    

        return API.get(
            apiConfig.name,
            `/${apiConfig.env}/customers?email=${user.attributes.email}`,
            init
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

export default CustomerDbService;
