export default interface RegistInterface {
  club: {
    id: string;
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
