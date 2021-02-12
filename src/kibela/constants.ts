import * as dotenv from "dotenv";

dotenv.config();

export namespace Kibela {
  export const TEAM_NAME: string = process.env.KIBELA_TEAM;
  export const TOKEN: string = process.env.KIBELA_TOKEN;
  export const END_POINT: string = `https://${TEAM_NAME}.kibe.la/api/v1`;
}
