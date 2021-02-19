import { header, divider, sectionPlainText, sectionMrkdwn, sectionFields, sectionButton } from "../generalComponents";
import { clubInfoArg } from "../../types/Messages";
import { Club } from "../../config/clubConfig";

export const getMessageBlocks = ({
  name,
  description,
  kibela,
  captainId,
  subCaptainId,
  membersId,
  button,
}: clubInfoArg) => [
  header(Club.Label.title),
  divider,
  sectionPlainText({ title: Club.Label.clubName, text: name }),
  sectionPlainText({ title: Club.Label.description, text: description }),
  sectionPlainText({ title: Club.Label.kibelaUrl, text: kibela }),
  sectionMrkdwn({ title: Club.Label.captain, text: captainId }),
  sectionMrkdwn({ title: Club.Label.subCaptain, text: subCaptainId }),
  sectionFields({ title: Club.Label.member, text: membersId }),
  sectionButton({ buttonOptions: button }),
];
