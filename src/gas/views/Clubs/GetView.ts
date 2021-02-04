import GetController from "../../controllers/Clubs/GetController";
import Response from "../../shared/Response";

export default class GetView {
  private res = new Response();

  private get = new GetController();

  provide() {
    // WIP レスポンスの分岐必要
    return this.res.success(this.get.show());
  }
}
