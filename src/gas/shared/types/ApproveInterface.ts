export default interface ApproveInterface {
  club: {
    id: string;
  };
  authorizer: {
    slackId: string;
    name: string;
  };
  isApproved: boolean;
}
