import { app } from "../..";
import { Config } from "../../../constant";
import { SlackUser } from "../../types/slack/user";

export const getUserById = async (user: string) => {
  const data = await app.client.users.info({
    user,
    token: Config.Slack.USER_TOKEN,
    include_locale: true,
  });
  if (!data.ok) {
    throw new Error(`not ok: undefined user (id: ${user})`);
  }
  return data.user as SlackUser;
};
