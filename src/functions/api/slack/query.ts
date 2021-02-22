import { app } from "../..";

export const getUserById = async (userId: string) => {
  const user = await app.client.users.info({
    user: userId,
    include_locale: true,
  });
  if (!user) {
    throw new Error(`not ok: undefined user (id: ${userId})`);
  }
  return user;
};
