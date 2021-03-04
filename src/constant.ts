import * as dotenv from "dotenv";

const config = dotenv.config().parsed!;

Object.keys(config).forEach((key) => {
  process.env[key] = config[key];
});

export namespace Config {
  export namespace Kibela {
    export const TEAM_NAME = (process.env.KIBELA_TEAM as string) || "tambourine";
    export const TOKEN = process.env.KIBELA_TOKEN as string;
    export const END_POINT = `https://${TEAM_NAME}.kibe.la/api/v1` as string;
    export const USER_AGENT = "club-manager/1.0.0";
    export const HOME_GROUP_ID = (process.env.KIBELA_HOME_GROUP_ID as string) || "R3JvdXAvMQ";
  }

  export namespace Slack {
    export const APP_TOKEN = process.env.SLACK_APP_TOKEN as string;
    export const BOT_TOKEN = process.env.SLACK_BOT_TOKEN as string;
    export const USER_TOKEN = process.env.SLACK_USER_TOKEN as string;
    export const SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET as string;
    export const APPROVAL_CHANNEL_ID = (process.env.SLACK_APPROVAL_CHANNEL_ID as string) || "C01F6HWUGUA";
    export const DEBUG_CHANNEL_ID = (process.env.SLACK_DEBUG_CHANNEL_ID as string) || "C01P2BADCNB";

    export namespace Bolt {
      export const SERVE_PORT = parseInt(process.env.PORT || "3000", 10);
      export const DEBUG_USER = process.env.BOLT_DEBUG_USER_ID as string;
    }
  }

  export namespace Gas {
    export const END_POINT = process.env.GAS_ENDPOINT as string;
  }

  export namespace General {
    export const { APP_ENV } = process.env;
    export const APP_ENV_TYPE = {
      LOCAL: "LOCAL",
      DEV: "DEV",
      PRD: "PRD",
    };
    // NOTE: Union Types いらないかな？、一旦書いとく（いらないなら消しておk）
    // export type DETECTED_APP_ENV = typeof APP_ENV_TYPE[keyof typeof APP_ENV_TYPE];
  }
}
