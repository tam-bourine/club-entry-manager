import Response from "../../shared/Response";
import RegistInterface from "../../shared/types/RegistInterface";
import RegistView from "../../views/Club/RegistView";

export default class RegistModel {
  private res = new Response();

  private view = new RegistView();

  addClub(params: RegistInterface) {
    const { club, captain, members } = params;
    try {
      const sheetTabName = PropertiesService.getScriptProperties().getProperty("SHEET_TAB_NAME");
      const slackWorkspaceUrl = PropertiesService.getScriptProperties().getProperty("SLACK_WORKSPACE_URL");
      if (sheetTabName) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTabName);
        const today = new Date();
        /* 
        appendRow()用に配列形式に変更
        appendRow()の仕様: https://developers.google.com/apps-script/reference/spreadsheet/sheet#appendRow(Object)
        カラム定義: /docs/columns/clubs.json, /docs/columns/clubs.png
        */
        const id = Utilities.getUuid();
        const slackChannelUrl = `${slackWorkspaceUrl}/archives/${club.channelId}`;
        const slackChannel = `=HYPERLINK("${slackChannelUrl}", "${club.channelId}")`;
        // FIX: #162 型定義で、列番号がどのカラムに対応しているのか分かるようにする。
        const newClub = [
          id,
          club.name,
          club.description,
          club.budgetUse,
          club.kibelaUrl,
          slackChannel,
          today.toISOString(),
          false,
          "", // 承認者_SlackID
          "", // 承認者
          captain.slackId,
          captain.name,
        ];

        // メンバーの数だけ繰り返し
        members.forEach((member) => {
          newClub.push(member.slackId, member.name);
        });

        // TODO: ResponseInterfaceの型修正 clubでもclubsでも他のデータでも可変にできるように修正
        // issue: #160 #161
        sheet?.appendRow(newClub);
        const header = this.res.created;
        return this.view.provide({ ...header, club: { id: id, name: club.name } });
      }
      return this.view.provide(this.res.internalServer);
    } catch (error) {
      console.error({ error });
      return this.view.provide(this.res.internalServer);
    }
  }
}
