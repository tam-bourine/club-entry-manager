import { messageArg } from "../types/getMessage";
import { Club } from "../clubConfig";
import { header, divider, fields, plainText, label, mrkdwn } from "./generalComponent";

export const getMessageBlocks = ({ clubInfo }: messageArg) => {
  return [
    header(Club.Label.title),
    divider,
    label({ text: Club.Label.clubName }),
    plainText({ text: clubInfo.name }),
    label({ text: Club.Label.description }),
    plainText({ text: clubInfo.description }),
    label({ text: Club.Label.kibelaUrl }),
    plainText({ text: clubInfo.kibela }),
    label({ text: Club.Label.captain }),
    mrkdwn({ text: clubInfo.captainId }),
    label({ text: Club.Label.subCaptain }),
    mrkdwn({ text: clubInfo.subCaptainId }),
    label({ text: Club.Label.member }),
    fields({ text: clubInfo.membersId }),
  ];
};
