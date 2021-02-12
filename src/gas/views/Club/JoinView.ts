import Response from "../../shared/Response";
import ResponseInterface from "../../shared/types/ResponseInterface";

export default class JoinView {
  private res = new Response();

  provide(params: ResponseInterface) {
    switch (params.status) {
      case this.res.ok.status:
        return this.res.success(params);
      case this.res.created.status:
        return this.res.success(params);
      case this.res.notFound.status:
        return this.res.error(params);
      case this.res.internalServer.status:
        return this.res.error(params);
      default:
        return this.res.error(params);
    }
  }
}
