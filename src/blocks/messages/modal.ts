import { header, divider, sectionPlainText, sectionMrkdwn, sectionFields, sectionButton } from "../generalComponents";
import { ClubInfoArg } from "../../types/Messages";
import { Club } from "../../config/clubConfig";

export const getMessageBlocks = (args: ClubInfoArg) => {
  const { name, description, budgetUse, kibela, captainId, membersId, channelId, buttons } = args;

  return [
    header(Club.label.TITLE),
    divider,
    sectionPlainText({ title: Club.label.CLUB_NAME, text: name }),
    sectionPlainText({ title: Club.label.DESCRIPTION, text: description }),
    sectionPlainText({ title: Club.label.BUDGET_USE, text: budgetUse }),
    sectionMrkdwn({ title: Club.label.CHANNEL, text: channelId }),
    sectionMrkdwn({ title: Club.label.CAPTAIN, text: captainId }),
    sectionFields({ title: Club.label.MEMBER, text: membersId }),
    sectionPlainText({ title: Club.label.KIBELA_URL, text: kibela }),
    sectionButton(buttons),
  ];
};
