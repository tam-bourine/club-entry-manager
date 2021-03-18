import ApproveModel from "../../../gas/models/Club/ApproveModel";
import ApproveView from "../../../gas/views/Club/ApproveView";
import Response from "../../../gas/shared/Response";

describe("ApproveModel", () => {
  const model = new ApproveModel();
  const res = new Response();
  const view = new ApproveView();
  test("approve club", () => {
    const header = res.created;
    expect(
      model.approveClub({
        slackChannelId: "SLACK_CHANNEL_ID",
        authorizer: {
          slackId: "SLACK_ID",
          name: "NAME",
        },
        isApproved: true,
      })
    ).toBe(
      view.provide({
        ...header,
        club: {
          name: "CLUB_NAME",
          kibelaUrl: "https://example.kibe.la",
          members: [{ name: "NAME", slackId: "SLACK_ID", role: "ROLE", joinedDate: "YYYY/MM/DD", leftDate: "" }],
        },
      })
    );
  });
});
