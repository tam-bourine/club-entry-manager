// example : @see https://hasura.io/learn/graphql/typescript-react-apollo/codegen/
require("dotenv").config();

module.exports = {
  schema: [
    {
      [`https://${process.env.KIBELA_TEAM}.kibe.la/api/v1`]: {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.KIBELA_TOKEN}`,
        },
      },
    },
  ],
  overwrite: true,
  generates: {
    "./@types/kibela.d.ts": {
      plugins: ["typescript"],
    },
  },
};
