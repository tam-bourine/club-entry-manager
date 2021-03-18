import JoinModel from "../../../gas/models/Club/JoinModel";
import Response from "../../../gas/shared/Response";
import JoinView from "../../../gas/views/Club/JoinView";

describe("JoinModel", () => {
  const model = new JoinModel();
  const view = new JoinView();
  const res = new Response();
  const header = res.created;
  test("add member", () => {
    expect(
      model.addMember({
        slackChannelId: "SLACK_CHANNEL_ID",
        member: {
          slackId: "SLACK_ID",
          name: "NAME",
        },
      })
    ).toBe(view.provide({ ...header, club: { id: "ID", kibelaUrl: "https://example.kibe.la", name: "NAME" } }));
  });
});
