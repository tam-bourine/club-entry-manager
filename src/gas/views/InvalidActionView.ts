import Response from "../shared/Response";

export default class InvalidActionView {
  private res = new Response();

  provide() {
    return this.res.error(this.res.notFound);
  }
}
