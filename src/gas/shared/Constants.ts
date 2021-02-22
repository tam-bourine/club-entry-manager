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
    CLUB: {
      MEMBER: {
        NAME: "部員名",
        SLACK_ID: "部員_SlackID",
        ROLE: "役割",
        JOINED_DATE: "入部日",
        LEFT_DATE: "退部日",
      },
    },
    CLUBS: {
      CLUB_NAME_COLUMN_NUMBER: 2, // 部活名
      APPLICATION_DATE_COLUMN_NUMBER: 7, // 申請日
      APPROVED_COLUMN_NUMBER: 8, // 公認
      MEMBER: {
        SLACK_ID_1: 11,
        NAME_1: 12,
        SLACK_ID_2: 13,
        NAME_2: 14,
        SLACK_ID_3: 15,
        NAME_3: 16,
      },
    },
  };
}
