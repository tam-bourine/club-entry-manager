import JoinController from "../../controllers/Club/JoinController";
import Response from "../../shared/Response";

export default class JoinView {
  private res = new Response();

  private join = new JoinController();

  provide(params: any) {
    return this.res.success(this.join.update(params));
  }
}
