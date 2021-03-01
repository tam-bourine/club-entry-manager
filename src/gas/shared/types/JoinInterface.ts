export default interface JoinInterface {
  slackChannelId: string;
  member: {
    slackId: string;
    name: string;
  };
}
