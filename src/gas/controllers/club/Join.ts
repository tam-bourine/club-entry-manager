import Utils from "../../shared/Utils";
import ParameterInterface from "../../types/ParameterInterface";

export default class Join {
  utils = new Utils();

  update(params: ParameterInterface) {
    return this.utils.makeSuccess({
      status: 200,
      message: "200 OK",
    });
  }
}
