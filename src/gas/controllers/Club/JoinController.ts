import Utils from "../../shared/Response";
import ParameterInterface from "../../types/ParameterInterface";

export default class JoinController {
  utils = new Utils();

  update(params: ParameterInterface) {
    return this.utils.makeSuccess({
      status: 200,
      message: "200 OK",
    });
  }
}
