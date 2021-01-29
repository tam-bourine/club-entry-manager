import { ResponseInterface } from "../types/ResponseInterface.ts";

export default class Util {
  makeSuccess(response: ResponseInterface) {
    response.success = true;
    return response;
  }

  makeError(response: ResponseInterface) {
    response.success = false;
    return response;
  }
}
