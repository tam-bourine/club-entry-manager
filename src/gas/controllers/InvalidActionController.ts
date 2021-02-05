import ResponseInterface from "../shared/types/ResponseInterface";
import InvalidActionView from "../views/InvalidActionView";

export default class InvalidActionController {
  private view = new InvalidActionView();

  throwError() {
    return this.view.provide();
  }
}
