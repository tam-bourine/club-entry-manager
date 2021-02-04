export default interface ParameterInterface {
  clubId: string;
  authorizer?: {
    slackId: string;
    name: string;
  };
  member?: {
    slackId: string;
    name: string;
  };
  action: string;
}
