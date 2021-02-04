import ApproveController from "../../controllers/Club/ApproveController";
import Response from "../../shared/Response";

export default class ApproveView {
  private res = new Response();

  private approve = new ApproveController();

  provide(params: any) {
    return this.res.success(this.approve.create(params));
  }
}
