import { Util } from "./utils/Util.ts";
import { ClubsController } from "./controllers/ClubsController.ts";
import { MembersController } from "./controllers/MembersController.ts";
import { ParameterInterface } from "./types/ParameterInterface.ts";

export const doGet = (e) => {
  const { action } = e.parameter;
  let response: object;
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
