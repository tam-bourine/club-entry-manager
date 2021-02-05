import ResponseInterface from "../types/ResponseInterface";
import InvalidActionView from "../views/InvalidActionView";

export default class InvalidActionController {
  private invalidAction = new InvalidActionView();

  throwError(params: ResponseInterface) {
    return this.invalidAction.provide(params);
  }
}
