export default interface ApproveInterface {
  slackChannelId: string;
  authorizer: {
    slackId: string;
    name: string;
  };
  isApproved: boolean;
}
