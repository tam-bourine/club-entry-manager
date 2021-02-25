import { header, divider, sectionPlainText, sectionMrkdwn, sectionFields, sectionButton } from "../generalComponents";
import { ClubInfoArg } from "../../types/Messages";
import { Club } from "../../config/clubConfig";

export const getMessageBlocks = (args: ClubInfoArg) => {
  const { name, description, budgetUse, kibela, captainId, membersId, channelId, buttons } = args;

  return [
    header(Club.Label.title),
    divider,
    sectionPlainText({ title: Club.Label.clubName, text: name }),
    sectionPlainText({ title: Club.Label.description, text: description }),
    sectionPlainText({ title: Club.Label.budgetUse, text: budgetUse }),
    sectionMrkdwn({ title: Club.Label.channel, text: channelId }),
    sectionMrkdwn({ title: Club.Label.captain, text: captainId }),
    sectionFields({ title: Club.Label.member, text: membersId }),
    sectionPlainText({ title: Club.Label.kibelaUrl, text: kibela }),
    sectionButton(buttons),
  ];
};
