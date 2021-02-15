import { messageArg } from "../types/getMessage";
import { Club } from "../clubConfig";
import { header, divider, fields, plainText, mrkdwn } from "./generalComponent";

export const getMessageBlocks = ({ clubInfo }: messageArg) => {
  return [
    header(Club.Label.title),
    divider,
    plainText({ title: Club.Label.clubName, text: clubInfo.name }),
    plainText({ title: Club.Label.description, text: clubInfo.description }),
    plainText({ title: Club.Label.kibelaUrl, text: clubInfo.kibela }),
    mrkdwn({ title: Club.Label.captain, text: clubInfo.captainId }),
    mrkdwn({ title: Club.Label.subCaptain, text: clubInfo.subCaptainId }),
    fields({ title: Club.Label.member, text: clubInfo.membersId }),
  ];
};
