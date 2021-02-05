// import * as dotenv from "dotenv";
// const config = dotenv.config().parsed;

// for (const key in config) {
//   process.env[key] = config[key];
// }

export default class Constants {
  static USER_ACTIONS: {
    DO_GET: {
      GET: "get";
    };
    DO_POST: {
      REGIST: "regist";
      APPROVE: "approve";
      JOIN: "join";
    };
  };
}
