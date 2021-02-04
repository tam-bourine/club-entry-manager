import ResponseInterface from "../types/ResponseInterface";

export default class Console {
  constructor() {}

  notFound: ResponseInterface = { status: 404, message: "404 Not Found" };

  output(response?: ResponseInterface) {
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  }
}
