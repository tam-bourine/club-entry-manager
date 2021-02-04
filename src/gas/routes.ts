import Response from './shared/Response';
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
  const res = new Response();

  switch (action) {
    case "get": {
      return res.createOutput(get.show());
    }
    default: {
      return res.createOutput(res.makeError({ status: 404, message: "404 Not Found" }));
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
  const res = new Response();

  switch (action) {
    case "regist": {
      return res.createOutput(regist.create(params));
    }
    // WIP
    case "approve": {
      return res.createOutput(approve.create(params));
    }
    // WIP
    case "join": {
      return res.createOutput(join.update(params));
    }
    default: {
      return res.createOutput(res.makeError({ status: 404, message: "404 Not Found" }));
    }
  }
};
