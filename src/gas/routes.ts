import { Util } from "./utils/Util";
import { ClubsController } from "./controllers/ClubsController";
import { MembersController } from "./controllers/MembersController";
import { ParameterInterface } from "./types/ParameterInterface";
import { ResponseInterface } from "./types/ResponseInterface";

export const doGet = (e) => {
  const { action } = e.parameter;
  let response: ResponseInterface;
  switch (action) {
    case "get": {
      response = ClubsController.get();
      break;
    }
    default: {
      response = new Util().makeError({ status: 404, message: "404 Not Found" });
      console.error({ response });
      break;
    }
  }
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
};

export const doPost = (e) => {
  const { action } = e.parameter;

  const params: ParameterInterface = JSON.parse(e.postData.getDataAsString());
  let response: object;
  switch (action) {
    case "approve": {
      response = ClubsController.approve(params);
      break;
    }
    case "join": {
      response = MembersController.join(params);
      break;
    }
    default: {
      response = new Util().makeError({ status: 404, message: "404 Not Found" });
      console.error({ response });
      break;
    }
  }
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
};
