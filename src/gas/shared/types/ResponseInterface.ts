import { InsertInitialValuesParams } from "../../models/Club/ApproveModel";

export default interface ResponseInterface {
  status: number;
  message: string;
  success?: boolean;
  clubs?: {
    id: string;
    name: string;
  }[];
  club?: Partial<{
    id: string;
    name: string;
    kibelaUrl: string;
    members: InsertInitialValuesParams["members"];
  }>;
}
