import { Util } from "./utils/Util";
import { ClubsController } from "./controllers/ClubsController";
import { MembersController } from "./controllers/MembersController";
import { ParameterInterface } from "./types/ParameterInterface";
import { ResponseInterface } from "./types/ResponseInterface";

interface DoGetParams extends GoogleAppsScript.Events.DoGet {
  parameter: ParameterInterface;
}

interface DoPostParams extends GoogleAppsScript.Events.DoPost {
  parameter: ParameterInterface;
}

const createOutput = (response?: ResponseInterface) => {
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
};

export const doGet = (e: DoGetParams) => {
  const { action } = e.parameter;
  switch (action) {
    case "get": {
      return createOutput(ClubsController.get());
    }
    default: {
      return createOutput(new Util().makeError({ status: 404, message: "404 Not Found" }));
    }
  }
};

export const doPost = (e: DoPostParams) => {
  const { action } = e.parameter;

  const params = e.parameter;
  switch (action) {
    case "approve": {
      return createOutput(ClubsController.approve(params));
    }
    case "join": {
      return createOutput(MembersController.join(params));
    }
    default: {
      return createOutput(new Util().makeError({ status: 404, message: "404 Not Found" }));
    }
  }
};
