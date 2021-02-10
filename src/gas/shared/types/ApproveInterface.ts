export default interface ApproveInterface {
  clubId: string;
  authorizer: {
    slackId: string;
    name: string;
  };
  isApproved: boolean;
}
