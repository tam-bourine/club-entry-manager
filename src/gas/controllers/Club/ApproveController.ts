import Response from "../../shared/Response";
import ApproveInterface from "../../types/ApproveInterface";

export default class ApproveController {
  private res = new Response();

  create(params: ApproveInterface) {
    return this.res.ok;
  }

  update(params: ApproveInterface) {
    return this.res.ok;
  }
}
