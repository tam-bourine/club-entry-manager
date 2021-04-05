import ApproveController from "../../../gas/controllers/Club/ApproveController";
import ApproveModel from "../../../gas/models/Club/ApproveModel";
import ApproveInterface from "../../../gas/shared/types/ApproveInterface";

describe("ApproveController", () => {
  const controller = new ApproveController();
  const model = new ApproveModel();
  const params: ApproveInterface = {
    slackChannelId: "SLACK_CHANNEL_ID",
    authorizer: {
      slackId: "SLACK_ID",
      name: "NAME",
    },
    isApproved: true,
  };
  test("update", () => {
    expect(controller.update(params)).toBe(model.approveClub(params));
  });
});
