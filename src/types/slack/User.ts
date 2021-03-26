/* eslint-disable camelcase */
export interface SlackUser {
  id: string;
  name?: string;
  real_name: string;
  profile: {
    email: string;
    display_name?: string;
    image_original?: string;
  };
}
