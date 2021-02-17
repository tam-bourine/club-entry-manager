// example : @see https://hasura.io/learn/graphql/typescript-react-apollo/codegen/
require("dotenv").config();

module.exports = {
  schema: [
    {
      "https://tambourine.kibe.la/api/v1": {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CODEGEN_AUTH_TOKEN}`,
        },
      },
    },
  ],
  overwrite: true,
  generates: {
    "./src/functions/types/kibela.d.ts": {
      plugins: ["typescript"],
    },
  },
};
