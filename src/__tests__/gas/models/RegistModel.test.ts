import RegistModel from "../../../gas/models/Club/RegistModel";
import Response from "../../../gas/shared/Response";
import RegistView from "../../../gas/views/Club/RegistView";

describe("RegistModel", () => {
  const model = new RegistModel();
  const view = new RegistView();
  const res = new Response();
  test("add club", () => {
    const header = res.created;
    expect(
      model.addClub({
        club: {
          name: "CLUB_NAME",
          description: "DESCRIPTION",
          budgetUse: "BUDGET_USE",
          kibelaUrl: "https://example.kibe.la",
          channelId: "CHANNEL_ID",
        },
        captain: {
          slackId: "CAPTAIN_SLACK_ID",
          name: "CAPTAIN_NAME",
        },
        members: [
          { slackId: "SLACK_ID", name: "NAME" },
          { slackId: "SLACK_ID", name: "NAME" },
        ],
      })
    ).toBe(view.provide({ ...header, club: { id: "ID", name: "CLUB_NAME" } }));
  });
});
