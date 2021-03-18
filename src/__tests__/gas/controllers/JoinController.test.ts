import JoinController from "../../../gas/controllers/Club/JoinController";
import JoinModel from "../../../gas/models/Club/JoinModel";
import JoinInterface from "../../../gas/shared/types/JoinInterface";

describe("JoinController", () => {
  const controller = new JoinController();
  const model = new JoinModel();
  const params: JoinInterface = {
    slackChannelId: "SLACK_CHANNEL_ID",
    member: {
      slackId: "SLACK_ID",
      name: "NAME",
    },
  };
  test("update", () => {
    expect(controller.update(params)).toBe(model.addMember(params));
  });
});
