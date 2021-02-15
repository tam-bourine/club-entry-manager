import { messageArg } from "../types/getMessage";
import { Club } from "../clubConfig";
import * as generalComponents from "./generalComponent";

export const getMessageBlocks = ({ clubInfo }: messageArg) => {
  return [
    generalComponents.header(Club.Label.title),
    generalComponents.divider,
    generalComponents.sectionPlainText({ title: Club.Label.clubName, text: clubInfo.name }),
    generalComponents.sectionPlainText({ title: Club.Label.description, text: clubInfo.description }),
    generalComponents.sectionPlainText({ title: Club.Label.kibelaUrl, text: clubInfo.kibela }),
    generalComponents.sectionMrkdwn({ title: Club.Label.captain, text: clubInfo.captainId }),
    generalComponents.sectionMrkdwn({ title: Club.Label.subCaptain, text: clubInfo.subCaptainId }),
    generalComponents.sectionFields({ title: Club.Label.member, text: clubInfo.membersId }),
  ];
};
