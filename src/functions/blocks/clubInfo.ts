import { messageArg } from "../types/getMessage";
import { clubLabel } from "../clubConfig";
import { header, divider } from "../blocks/generalComponent";

export const getMessageBlocks = ({ clubInfo }: messageArg) => {
  return [
    header(clubLabel.title),
    divider,
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${clubLabel.clubName}*`,
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
        text: `*${clubLabel.description}*`,
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
        text: `*${clubLabel.kibelaUrl}*`,
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
        text: `*${clubLabel.captain}*`,
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
        text: `*${clubLabel.subCaptain}*`,
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
        text: `*${clubLabel.member}*`,
      },
    },
    {
      type: "section",
      fields: clubInfo.membersId,
    },
  ];
};
