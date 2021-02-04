import Response from "../../shared/Response";
import JoinInterface from "../../types/JoinInterface";

export default class JoinController {
  private res = new Response();

  update(params: JoinInterface) {
    return this.res.ok;
  }
}
