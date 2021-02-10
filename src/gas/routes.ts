import ParameterInterface from "./shared/types/ParameterInterface";
import RegistController from "./controllers/Club/RegistController";
import ApproveController from "./controllers/Club/ApproveController";
import JoinController from "./controllers/Club/JoinController";
import GetController from "./controllers/Clubs/GetController";
import InvalidActionController from "./controllers/InvalidActionController";
import Constants from "./shared/Constants";

interface DoGetParams extends GoogleAppsScript.Events.DoGet {
  parameter: ParameterInterface;
}

interface DoPostParams extends GoogleAppsScript.Events.DoPost {
  parameter: ParameterInterface;
}

const doGet = (e: DoGetParams) => {
  const { action } = e.parameter;

  const constants = new Constants();
  const { USER_ACTIONS } = constants;

  const get = new GetController();
  const invalidAction = new InvalidActionController();

  switch (action) {
    case USER_ACTIONS.DO_GET.GET: {
      return get.show();
    }
    default: {
      return invalidAction.throwError();
    }
  }
};

const doPost = (e: DoPostParams) => {
  const { action } = e.parameter;

  const constants = new Constants();
  const { USER_ACTIONS } = constants;

  // FIXME: データ取れているが型がウソついているかも
  // #114 https://github.com/tam-bourine/club-manager/issues/114
  // @ts-ignore
  const params = JSON.parse(e.postData.getDataAsString());

  const regist = new RegistController();
  const approve = new ApproveController();
  const join = new JoinController();
  const invalidAction = new InvalidActionController();

  switch (action) {
    case USER_ACTIONS.DO_POST.REGIST: {
      return regist.create(params);
    }
    case USER_ACTIONS.DO_POST.APPROVE: {
      return approve.update(params);
    }
    // WIP
    case USER_ACTIONS.DO_POST.JOIN: {
      return join.update(params);
    }
    default: {
      return invalidAction.throwError();
    }
  }
};
