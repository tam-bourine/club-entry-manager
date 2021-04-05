import RegistController from "../../../gas/controllers/Club/RegistController";
import RegistModel from "../../../gas/models/Club/RegistModel";
import RegistInterface from "../../../gas/shared/types/RegistInterface";

describe("RegistController", () => {
  const controller = new RegistController();
  const model = new RegistModel();
  const params: RegistInterface = {
    club: {
      name: "NAME",
      description: "DESCRIPTION",
      budgetUse: "BUDGET_USE",
      kibelaUrl: "https://example.kibe.la",
      channelId: "CHANNEL_ID",
    },
    captain: {
      slackId: "SLACK_ID",
      name: "NAME",
    },
    members: [
      {
        slackId: "SLACK_ID",
        name: "NAME",
      },
      {
        slackId: "SLACK_ID",
        name: "NAME",
      },
    ],
  };
  test("create", () => {
    expect(controller.create(params)).toBe(model.addClub(params));
  });
});
