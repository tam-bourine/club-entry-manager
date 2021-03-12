export default interface ApproveInterface {
  club: {
    channelId: string;
  };
  authorizer: {
    slackId: string;
    name: string;
  };
  isApproved: boolean;
}
