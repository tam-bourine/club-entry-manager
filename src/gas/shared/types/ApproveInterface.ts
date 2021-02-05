export default interface ApproveInterface {
  clubId: string;
  authorizer: {
    slackId: string;
    name: string;
  };
  is_approved: boolean;
}
