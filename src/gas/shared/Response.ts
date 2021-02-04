import ResponseInterface from "../types/ResponseInterface";
import Console from "./Console";

export default class Response {
  constructor() {}

  console = new Console();

  success(response: ResponseInterface) {
    response.success = true;
    return response && this.console.output(response);
  }

  error(response: ResponseInterface) {
    response.success = false;
    return response && this.console.output(response);
  }
}
