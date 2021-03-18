import Response from "../../../gas/shared/Response";
import ApproveView from "../../../gas/views/Club/ApproveView";

describe("ApproveView", () => {
  const view = new ApproveView();
  const res = new Response();

  test.each([
    ["ok", res.ok, res.ok],
    ["created", res.created, res.created],
    ["not found", res.notFound, res.notFound],
    ["internal server error", res.internalServer, res.internalServer],
  ])("provider - %s", (_title, params, result) => {
    expect(view.provide(params)).toBe(res.success(result));
  });
});
