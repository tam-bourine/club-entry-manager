import * as dotenv from "dotenv";
const config = dotenv.config().parsed;

for (const key in config) {
  process.env[key] = config[key];
}

export default class Constants {
  static SpreadSheet = {
    SHEET_TAB_NAME: process.env.SHEET_TAB_NAME as string,
  };
}
