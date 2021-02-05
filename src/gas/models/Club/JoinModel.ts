import JoinInterface from "../../types/JoinInterface";
import JoinView from "../../views/Club/JoinView";

export default class JoinModel {
  private join = new JoinView();

  addMember(params: JoinInterface) {
    // FIXME
    // @ts-ignore
    return this.join.provide(params);
  }
}
