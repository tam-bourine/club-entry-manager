import { messageArg } from "../types/getMessage";
import { Club } from "../clubConfig";
import { header, divider } from "./generalComponent";

export const getMessageBlocks = ({ clubInfo }: messageArg) => {
  return [
    header(Club.Label.title),
    divider,
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${Club.Label.clubName}*`,
      },
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: `${clubInfo.name}`,
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${Club.Label.description}*`,
      },
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: `${clubInfo.description}`,
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${Club.Label.kibelaUrl}*`,
      },
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: `${clubInfo.kibela}`,
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${Club.Label.captain}*`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*<@${clubInfo.captainId}>*`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${Club.Label.subCaptain}*`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*<@${clubInfo.subCaptainId}>*`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${Club.Label.member}*`,
      },
    },
    {
      type: "section",
      fields: clubInfo.membersId,
    },
  ];
};
