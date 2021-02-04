import ResponseInterface from "../types/ResponseInterface";

export default class Console {
  output(response?: ResponseInterface) {
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  }
}
