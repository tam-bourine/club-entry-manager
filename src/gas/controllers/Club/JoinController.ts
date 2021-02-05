import JoinModel from "../../models/Club/JoinModel";
import JoinInterface from "../../types/JoinInterface";

export default class JoinController {
  private join = new JoinModel();

  update(params: JoinInterface) {
    return this.join.addMember(params);
  }
}
