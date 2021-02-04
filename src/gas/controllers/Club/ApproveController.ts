import Response from "../../shared/Response";
import ApproveInterface from "../../types/ApproveInterface";

export default class ApproveController {
  res = new Response();

  create(params: ApproveInterface) {
    return this.res.success({
      status: 200,
      message: "200 OK",
    });
  }

  update(params: ApproveInterface) {
    return this.res.success({
      status: 200,
      message: "200 OK",
    });
  }
}
