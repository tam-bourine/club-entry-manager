import { ResponseInterface } from "../types/ResponseInterface.ts";

export default class Util {
  makeError(response: ResponseInterface) {
    response.success = false;
    return response;
  }
}
