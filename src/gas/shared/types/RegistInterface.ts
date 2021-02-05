export default interface RegistInterface {
  clubId: {
    name: string;
    description: string;
  };
  captain: {
    slackId: string;
    name: string;
  };
  collaborators: [
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
