import Response from "./shared/Response";
import ParameterInterface from "./types/ParameterInterface";
import RegistController from "./controllers/Club/RegistController";
import ApproveController from "./controllers/Club/ApproveController";
import JoinController from "./controllers/Club/JoinController";
import GetController from "./controllers/Clubs/GetController";
import InvalidActionController from "./controllers/InvalidActionController";

interface DoGetParams extends GoogleAppsScript.Events.DoGet {
  parameter: ParameterInterface;
}

interface DoPostParams extends GoogleAppsScript.Events.DoPost {
  parameter: ParameterInterface;
}

const doGet = (e: DoGetParams) => {
  const { action } = e.parameter;

  const get = new GetController();
  const invalidAction = new InvalidActionController();

  const res = new Response();

  switch (action) {
    case "get": {
      return get.show();
    }
    default: {
      return invalidAction.throwError(res.notFound);
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
  const invalidAction = new InvalidActionController();

  const res = new Response();

  switch (action) {
    case "regist": {
      return regist.create(params);
    }
    // WIP
    case "approve": {
      return approve.create(params);
    }
    // WIP
    case "join": {
      return join.update(params);
    }
    default: {
      return invalidAction.throwError(res.notFound);
    }
  }
};
