import Utils from "../../shared/Response";
import ApproveInterface from "../../types/ApproveInterface";

export default class ApproveController {
  constructor() {}

  utils = new Utils();

  create(params: ApproveInterface) {
    return this.utils.makeSuccess({
      status: 200,
      message: "200 OK",
    });
  }

  update(params: ApproveInterface) {
    return this.utils.makeSuccess({
      status: 200,
      message: "200 OK",
    });
  }
}
