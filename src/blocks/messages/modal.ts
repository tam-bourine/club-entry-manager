import { header, divider, sectionPlainText, sectionMrkdwn, sectionFields, sectionButton } from "../generalComponents";
import { ClubInfoArg } from "../../types/Messages";
import { Club } from "../../config/clubConfig";

export const getMessageBlocks = (args: ClubInfoArg) => {
  const { name, description, budgetUse, kibela, captainId, membersId, channelId, buttons } = args;

  return [
    header(Club.label.title),
    divider,
    sectionPlainText({ title: Club.label.clubName, text: name }),
    sectionPlainText({ title: Club.label.description, text: description }),
    sectionPlainText({ title: Club.label.budgetUse, text: budgetUse }),
    sectionMrkdwn({ title: Club.label.channel, text: channelId }),
    sectionMrkdwn({ title: Club.label.captain, text: captainId }),
    sectionFields({ title: Club.label.member, text: membersId }),
    sectionPlainText({ title: Club.label.kibelaUrl, text: kibela }),
    sectionButton(buttons),
  ];
};
