import { app } from "../../../index";
import { Config } from "../../../constant";
import { SlackUser } from "../../../types/slack/User";

export const getById = async (user: string) => {
  const data = await app.client.users.info({
    user,
    token: Config.Slack.BOT_TOKEN,
  });
  if (!data.ok) {
    throw new Error(`not ok: undefined user (id: ${user})`);
  }
  console.info({ data });
  return data.user as SlackUser;
};
