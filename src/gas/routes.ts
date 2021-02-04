import Response from "./shared/Response";
import ParameterInterface from "./types/ParameterInterface";

import GetController from "./controllers/Clubs/GetController";
import RegistController from "./controllers/Club/RegistController";
import ApproveController from "./controllers/Club/ApproveController";
import JoinController from "./controllers/Club/JoinController";
import GetView from "./views/Clubs/GetView";
import ApproveView from "./views/Club/ApproveView";
import RegistView from "./views/Club/RegistView";

interface DoGetParams extends GoogleAppsScript.Events.DoGet {
  parameter: ParameterInterface;
}

interface DoPostParams extends GoogleAppsScript.Events.DoPost {
  parameter: ParameterInterface;
}

const doGet = (e: DoGetParams) => {
  const { action } = e.parameter;

  const get = new GetView();
  const res = new Response();

  switch (action) {
    case "get": {
      return get.provide();
    }
    default: {
      return res.error(res.notFound);
    }
  }
};

const doPost = (e: DoPostParams) => {
  const { action } = e.parameter;
  // FIXME: これで取れる？
  const params = JSON.parse(e.postData.getDataAsString());

  const regist = new RegistView();
  const approve = new ApproveView();
  const join = new JoinController();
  const res = new Response();

  switch (action) {
    case "regist": {
      return regist.provide(params);
    }
    // WIP
    case "approve": {
      return approve.provide(params);
    }
    // WIP
    case "join": {
      return res.success(join.update(params));
    }
    default: {
      return res.error(res.notFound);
    }
  }
};
