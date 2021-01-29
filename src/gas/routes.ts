import { Util } from "./utils/Util";
import { ClubsController } from "./controllers/ClubsController";
import { MembersController } from "./controllers/MembersController";
import { ParameterInterface } from "./types/ParameterInterface";
import { ResponseInterface } from "./types/ResponseInterface";

interface DoGetParams extends GoogleAppsScript.Events.DoGet {
  parameter: {
    action: "get";
  };
}

interface DoPostParams extends GoogleAppsScript.Events.DoPost {
  parameter: {
    action: "approve" | "join";
  };
}

export const doGet = (e: DoGetParams) => {
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

export const doPost = (e: DoPostParams) => {
  const { action } = e.parameter;

  const params = JSON.parse(e.postData.getDataAsString());
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
