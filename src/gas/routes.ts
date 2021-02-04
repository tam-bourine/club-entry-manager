import Utils from "./shared/Response";
import ParameterInterface from "./types/ParameterInterface";

import GetController from "./controllers/Clubs/GetController";
import RegistController from "./controllers/Club/RegistController";
import ApproveController from "./controllers/Club/ApproveController";
import JoinController from "./controllers/Club/JoinController";

interface DoGetParams extends GoogleAppsScript.Events.DoGet {
  parameter: ParameterInterface;
}

interface DoPostParams extends GoogleAppsScript.Events.DoPost {
  parameter: ParameterInterface;
}

const doGet = (e: DoGetParams) => {
  const { action } = e.parameter;

  const get = new GetController();
  const utils = new Utils();

  switch (action) {
    case "get": {
      return utils.createOutput(get.show());
    }
    default: {
      return utils.createOutput(utils.makeError({ status: 404, message: "404 Not Found" }));
    }
  }
};

const doPost = (e: DoPostParams) => {
  const { action } = e.parameter;
  // FIXME: これで取れる？
  const params = JSON.parse(e.postData.getDataAsString());

  const regist = new RegistController();
  const approve = new ApproveController();
  const join = new JoinController();
  const utils = new Utils();

  switch (action) {
    case "regist": {
      return utils.createOutput(regist.create(params));
    }
    // WIP
    case "approve": {
      return utils.createOutput(approve.create(params));
    }
    // WIP
    case "join": {
      return utils.createOutput(join.update(params));
    }
    default: {
      return utils.createOutput(utils.makeError({ status: 404, message: "404 Not Found" }));
    }
  }
};
