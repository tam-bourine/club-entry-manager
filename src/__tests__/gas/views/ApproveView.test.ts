import Response from "../../../gas/shared/Response";
import ApproveView from "../../../gas/views/Club/ApproveView";

describe("ApproveView", () => {
  const view = new ApproveView();
  const res = new Response();
  test("ok", () => {
    expect(view.provide(res.ok)).toBe(res.success(res.ok));
  });
  test("created", () => {
    expect(view.provide(res.created)).toBe(res.success(res.created));
  });
  test("not found", () => {
    expect(view.provide(res.notFound)).toBe(res.error(res.notFound));
  });
  test("internal server error", () => {
    expect(view.provide(res.internalServer)).toBe(res.error(res.internalServer));
  });
});
