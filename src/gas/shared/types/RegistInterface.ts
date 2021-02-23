export default interface RegistInterface {
  club: {
    name: string;
    description: string;
    budgetUse: string;
    kibelaUrl: string;
    channelId: string;
  };
  captain: {
    slackId: string;
    name: string;
  };
  members: [
    {
      slackId: string;
      name: string;
    },
    {
      slackId: string;
      name: string;
    }
  ];
}
