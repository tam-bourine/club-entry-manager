export interface ResponseInterface {
  status: number;
  message: string;
  success?: boolean;
  clubs?: {
    id: string;
    name: string;
  }[];
}
