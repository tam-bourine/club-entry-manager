import ResponseInterface from "../types/ResponseInterface";

export default class Utils {
  constructor() {}

  makeSuccess(response: ResponseInterface) {
    response.success = true;
    return response;
  }

  makeError(response: ResponseInterface) {
    response.success = false;
    return response;
  }

  createOutput(response?: ResponseInterface) {
    return (
      response && ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON)
    );
  }
}
