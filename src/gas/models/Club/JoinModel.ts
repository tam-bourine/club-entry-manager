import Constants from "../../shared/Constants";
import Response from "../../shared/Response";
import JoinInterface from "../../shared/types/JoinInterface";
import JoinView from "../../views/Club/JoinView";

export default class JoinModel {
  private res = new Response();

  private view = new JoinView();

  private constants = new Constants();

  addMember({ slackChannelId, member }: JoinInterface) {
    // FIXME #111 https://github.com/tam-bourine/club-manager/issues/111
    // @ts-ignore

    try {
      const clubs = this.getClubs();
      if (!clubs) {
        throw new Error("部活動が見つかりませんでした");
      }

      const club: string[] = this.findClubBySlackChannelId(clubs, slackChannelId);

      const clubNameArrayNumber = this.constants.SPREAD_SHEET.CLUBS.CLUB_NAME_COLUMN_NUMBER - 1;
      const clubName = club[clubNameArrayNumber];

      const slackChannelIdArrayNumber = this.constants.SPREAD_SHEET.CLUBS.SLACK_CHANNEL_ID_COLUMN_NUMBER - 1;
      const kibelaUrlArrayNumber = this.constants.SPREAD_SHEET.CLUBS.KIBELA_URL_COLUMN_NUMBER - 1;
      this.createMember(member, clubName);
      return this.view.provide({
        ...this.res.created,
        club: {
          id: club[slackChannelIdArrayNumber],
          kibelaUrl: club[kibelaUrlArrayNumber],
          name: clubName,
        },
      });
    } catch ({ message }) {
      return this.view.provide({ ...this.res.internalServer, message });
    }
  }

  private getClubs() {
    const sheetTabName = PropertiesService.getScriptProperties().getProperty("SHEET_TAB_NAME");
    if (!sheetTabName) {
      return false;
    }
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTabName);
    const clubs = sheet?.getDataRange().getValues();
    return clubs;
  }

  private findClubBySlackChannelId(clubs: any[], slackChannelId: string) {
    const slackChannelIdArrayNumber = this.constants.SPREAD_SHEET.CLUBS.SLACK_CHANNEL_ID_COLUMN_NUMBER - 1;
    return clubs?.filter((club: Array<string | boolean>) => club[slackChannelIdArrayNumber] === slackChannelId)[0];
  }

  private createMember({ name, slackId }: JoinInterface["member"], clubName: string) {
    const today = new Date();
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(clubName);
    sheet?.appendRow(
      Object.values({
        name,
        slackId,
        role: "",
        joinDate: today.toISOString(),
        leftDate: "",
      })
    );
  }
}
