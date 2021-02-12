import { messageArg } from "../types/getMessage";
import { Club } from "../clubConfig";
import { header, divider, section } from "./generalComponent";

export const getMessageBlocks = ({ clubInfo }: messageArg) => {
  return [
    header(Club.Label.title),
    divider,
    section({ text: Club.Label.clubName, textType: "label" }),
    section({ text: clubInfo.name, textType: "plain_text" }),
    section({ text: Club.Label.description, textType: "label" }),
    section({ text: clubInfo.description, textType: "plain_text" }),
    section({ text: Club.Label.kibelaUrl, textType: "label" }),
    section({ text: clubInfo.kibela, textType: "plain_text" }),
    section({ text: Club.Label.captain, textType: "label" }),
    section({ text: clubInfo.captainId, textType: "mrkdwn" }),
    section({ text: Club.Label.subCaptain, textType: "label" }),
    section({ text: clubInfo.subCaptainId, textType: "mrkdwn" }),
    section({ text: Club.Label.member, textType: "label" }),
    section({ text: clubInfo.membersId, textType: "fields" }),
  ];
};
