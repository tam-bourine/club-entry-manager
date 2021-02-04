import RegistController from "../../controllers/Club/RegistController";
import Response from "../../shared/Response";

export default class RegistView {
  private res = new Response();

  private regist = new RegistController();

  provide(params: any) {
    return this.res.success(this.regist.create(params));
  }
}
