import ResponseInterface from "../types/ResponseInterface";
import Console from "./Console";

export default class Response {
  ok: ResponseInterface = { status: 200, message: "200 OK" };
  created: ResponseInterface = { status: 201, message: "201 Created" };
  notFound: ResponseInterface = { status: 404, message: "404 Not Found" };
  internalServer: ResponseInterface = { status: 500, message: "500 Internal Server Error" };

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
