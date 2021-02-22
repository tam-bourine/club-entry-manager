// FIXME: #113 https://github.com/tam-bourine/club-manager/issues/113
// import * as dotenv from "dotenv";
// const config = dotenv.config().parsed;

// for (const key in config) {
//   process.env[key] = config[key];
// }

export default class Constants {
  USER_ACTIONS = {
    DO_GET: {
      GET: "get",
    },
    DO_POST: {
      REGIST: "regist",
      APPROVE: "approve",
      JOIN: "join",
    },
  };

  SPREAD_SHEET = {
    CLUB_NAME_COLUMN_NUMBER: 2,
    APPROVED_COLUMN_NUMBER: 8, // 公認列
  };
}
