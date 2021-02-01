import Utils from "../../shared/Response";
import ParameterInterface from "../../types/ParameterInterface";

export default class ApproveController {
  constructor() {}

  utils = new Utils();

  create(params: ParameterInterface) {
    return this.utils.makeSuccess({
      status: 200,
      message: "200 OK",
    });
  }

  update(params: ParameterInterface) {
    return this.utils.makeSuccess({
      status: 200,
      message: "200 OK",
    });
  }
}
