import { messageArg } from "../type/postMessage";

const title = "申請内容";
const clubName = "部活動名";
const description = "活動内容";
const kibelaUrl = "Kibela URL"
const captain = "部長名";
const subCaptain = "副部長名";
const collaborator = "初期メンバー";

export const postMessageBlock = (({ clubInfo }: messageArg) => {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: title,
        emoji: true
      }
    },
    {
      type: "divider"
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${clubName}*`
      }
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: `${clubInfo.name}`,
        emoji: true
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${description}*`
      }
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: `${clubInfo.description}`,
        emoji: true
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${kibelaUrl}*`
      }
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: `${clubInfo.kibela}`,
        emoji: true
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${captain}*`
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*<@${clubInfo.captainId}>*`,
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${subCaptain}*`
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*<@${clubInfo.subCaptainId}>*`,
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${collaborator}*`
      }
    },
    {
      type: "section",
      fields: clubInfo.membersId
    }
  ]
})