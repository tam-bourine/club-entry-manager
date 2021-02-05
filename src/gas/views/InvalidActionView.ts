import Response from "../shared/Response";
import ResponseInterface from "../types/ResponseInterface";

export default class InvalidActionView {
  private res = new Response();

  provide(params: ResponseInterface) {
    switch (params.status) {
      case this.res.notFound.status:
        return this.res.error(params);
      case this.res.internalServer.status:
        return this.res.error(params);
      default:
        return this.res.error(params);
    }
  }
}
