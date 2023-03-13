import { CustomNotification } from "../UI/Notification/components/CustomNotification";
import { HttpStatusCode } from "./HttpStatusCode";

export class HandleError {
    constructor(error) {
        this.handleError(error);
    }

    handleError(error) {
        let noti = new CustomNotification();

        if(!error.response) {
            noti.show("danger", "Error", HttpStatusCode[404].description);
            return;
        }

        let status = error.response.status;
        let data = error.response.data;
        console.log(status, data)
        switch(status.toString()) {
            case HttpStatusCode[404].code:
                noti.show("danger", "Error", HttpStatusCode[404].phrase);
                break;
            case HttpStatusCode[400].code:
                let message = data.message || JSON.stringify(data);
                noti.show("danger", "Error", message);
                break;
            case HttpStatusCode[401].code:
                noti.show("danger", "Error", "Unauthorized! Login again");
        }

        
    }

}