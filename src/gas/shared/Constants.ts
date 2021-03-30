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
      ID_COLUMN_NUMBER: 1, // id
      CLUB_NAME_COLUMN_NUMBER: 2, // 部活名
      KIBELA_URL_COLUMN_NUMBER: 5, // Kibela Url
      SLACK_CHANNEL_ID_COLUMN_NUMBER: 6,
      APPLICATION_DATE_COLUMN_NUMBER: 7, // 申請日
      APPROVED_COLUMN_NUMBER: 8, // 公認
      AUTHORIZER_SLACK_ID_COLUMN_NUMBER: 9,
      AUTHORIZER_NAME_COLUMN_NUMBER: 10,
      MEMBER: {
        SLACK_ID_LEADER: 11,
        NAME_LEADER: 12,
        SLACK_ID_1: 13,
        NAME_1: 14,
        SLACK_ID_2: 15,
        NAME_2: 16,
      },
      ROLE: {
        CAPTAIN: "部長",
        SUB_CAPTAIN: "副部長",
        MEMBER: "部員",
      },
    },
  };
}
