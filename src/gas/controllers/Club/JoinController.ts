import Utils from "../../shared/Response";
import JoinInterface from "../../types/JoinInterface";

export default class JoinController {
  utils = new Utils();

  update(params: JoinInterface) {
    return this.utils.makeSuccess({
      status: 200,
      message: "200 OK",
    });
  }
}
