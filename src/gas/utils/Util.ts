import ResponseInterface from "../types/ResponseInterface";

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
