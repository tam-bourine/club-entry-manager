import JoinModel from "../../models/Club/JoinModel";
import Response from "../../shared/Response";
import JoinInterface from "../../types/JoinInterface";

export default class JoinController {
  private res = new Response();

  private join = new JoinModel();

  update(params: JoinInterface) {
    return this.join.addMember(params);
  }
}
