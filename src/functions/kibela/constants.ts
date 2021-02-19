import * as dotenv from "dotenv";

dotenv.config();

export namespace Kibela {
  export const TEAM_NAME = process.env.KIBELA_TEAM as string;
  export const TOKEN = process.env.KIBELA_TOKEN as string;
  export const END_POINT = `https://${TEAM_NAME}.kibe.la/api/v1`;
}
