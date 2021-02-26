export default interface ResponseInterface {
  status: number;
  message: string;
  success?: boolean;
  clubs?: {
    id: string;
    name: string;
  }[];
  club?: {
    id: string;
    name: string;
    kibelaUrl: string;
    userSlackIds: string[];
  };
}
