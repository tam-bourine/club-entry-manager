import Response from "./shared/Response";
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
      // ここのres.successをswitchに置き換えるのはviewsの責務
      return res.success(get.show());
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

  const regist = new RegistController();
  const approve = new ApproveController();
  const join = new JoinController();
  const res = new Response();

  switch (action) {
    case "regist": {
      return res.success(regist.create(params));
    }
    // WIP
    case "approve": {
      return res.success(approve.create(params));
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
