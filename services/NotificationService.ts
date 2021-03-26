import { Auth, API } from "aws-amplify";
import apiConfig from "../config/api-config";

const NotificationService = {
    notifyOrderPlacement: async (message: any, session: any) => {
        var init = getInit(session);
        init.body = {
            message: message
        };

        return API.post(
            apiConfig.name,
            `/${apiConfig.env}/notifications/notify-order-placement`,
            init
        );
    }
};

const getInit = (session: any) => {
    return {
        headers: {
            Authorization: "Bearer " + session.getIdToken().getJwtToken(),
        },
    };
};

export default NotificationService;
