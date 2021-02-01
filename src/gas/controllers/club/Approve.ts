import Utils from "../../shared/Utils";
import ParameterInterface from "../../types/ParameterInterface";

export default class Approve {
  constructor() {}

  utils = new Utils();

  update(params: ParameterInterface) {
    return this.utils.makeSuccess({
      status: 200,
      message: "200 OK",
    });
  }

  create(params: ParameterInterface) {
    return this.utils.makeSuccess({
      status: 200,
      message: "200 OK",
    });
  }
}
