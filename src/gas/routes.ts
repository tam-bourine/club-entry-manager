import Util from "./utils/Util";
import ClubsController from "./controllers/ClubsController";
import MembersController from "./controllers/MembersController";
import ParameterInterface from "./types/ParameterInterface";
import ResponseInterface from "./types/ResponseInterface";

interface DoGetParams extends GoogleAppsScript.Events.DoGet {
  parameter: ParameterInterface;
}

interface DoPostParams extends GoogleAppsScript.Events.DoPost {
  parameter: ParameterInterface;
}

const createOutput = (response?: ResponseInterface) => {
  return (
    response && ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON)
  );
};

function doGet(e: DoGetParams) {
  const { action } = e.parameter;
  const clubsController = new ClubsController();
  switch (action) {
    case "get": {
      return createOutput(clubsController.get());
    }
    default: {
      return createOutput(new Util().makeError({ status: 404, message: "404 Not Found" }));
    }
  }
}

function doPost(e: DoPostParams) {
  // FIXME: これで取れる？
  const params = JSON.parse(e.postData.getDataAsString());
  const { action } = e.parameter;
  const clubsController = new ClubsController();
  const membersController = new MembersController();
  switch (action) {
    case "approve": {
      return createOutput(clubsController.approve(params));
    }
    case "join": {
      return createOutput(membersController.join(params));
    }
    default: {
      return createOutput(new Util().makeError({ status: 404, message: "404 Not Found" }));
    }
  }
}
