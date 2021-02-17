import * as dotenv from "dotenv";

dotenv.config();

export namespace Config {
  export namespace Kibela {
    export const TEAM_NAME = process.env.KIBELA_TEAM as string;
    export const TOKEN = process.env.KIBELA_TOKEN as string;
    export const END_POINT = `https://${TEAM_NAME}.kibe.la/api/v1` as string;
    export const USER_AGENT = "club-manager/1.0.0";
  }

  export namespace Slack {
    export namespace App {
      export const TOKEN = process.env.SLACK_APP_TOKEN as string;
    }
    export namespace Bot {
      export const TOKEN = process.env.SLACK_BOT_TOKEN as string;
    }
    export const APPROVAL_CHANNEL_ID = process.env.SLACK_APPROVAL_CHANNEL_ID as string;
  }

  export namespace Bolt {
    export const PORT = parseInt(process.env.BOLT_PORT!, 10);
  }
}
