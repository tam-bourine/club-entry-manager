import Utils from "./shared/Utils";
import Get from "./controllers/clubs/Get";
import Regist from "./controllers/club/Regist";
import Approve from "./controllers/club/Approve";
import Join from "./controllers/club/Join";

import ParameterInterface from "./types/ParameterInterface";
import ResponseInterface from "./types/ResponseInterface";

interface DoGetParams extends GoogleAppsScript.Events.DoGet {
  parameter: ParameterInterface;
}

interface DoPostParams extends GoogleAppsScript.Events.DoPost {
  parameter: ParameterInterface;
}

const doGet = (e: DoGetParams) => {
  const { action } = e.parameter;

  const get = new Get();
  const utils = new Utils();

  switch (action) {
    case "get": {
      return utils.createOutput(get.read());
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

  const regist = new Regist();
  const approve = new Approve();
  const join = new Join();
  const utils = new Utils();

  switch (action) {
    case "regist": {
      return utils.createOutput(regist.create(params));
    }
    case "approve": {
      return utils.createOutput(approve.create(params));
    }
    case "join": {
      return utils.createOutput(join.update(params));
    }
    default: {
      return utils.createOutput(utils.makeError({ status: 404, message: "404 Not Found" }));
    }
  }
};
