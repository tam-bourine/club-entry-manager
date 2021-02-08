import Response from "../../shared/Response";
import RegistInterface from "../../shared/types/RegistInterface";
import RegistView from "../../views/Club/RegistView";

export default class RegistModel {
  private res = new Response();

  private view = new RegistView();

  addClub(params: RegistInterface) {
    const { club, collaborators, captain } = params;
    try {
      const sheetTabName = PropertiesService.getScriptProperties().getProperty("SHEET_TAB_NAME");
      if (sheetTabName) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTabName);
        const today = new Date();
        sheet?.appendRow([
          club.id,
          club.name,
          // FIXME: #109
          /**
           * 変更の可能性あり
           * members: [
           *  {
           *    id: string,
           *    name: string,
           *    post: "captain" | "collaborator" | "member"
           *  },
           *  {},
           *  {}
           * ]
           */
          captain.name,
          collaborators[0].name, // 発起人1
          collaborators[1].name, // 発起人2
          today.toISOString(),
          "",
          captain.slackId,
          collaborators[0].slackId, // 発起人1
          collaborators[1].slackId, // 発起人2
        ]);
        return this.view.provide(this.res.created);
      } else return this.view.provide(this.res.internalServer);
    } catch (error) {
      console.error({ error });
      return this.view.provide(this.res.internalServer);
    }
  }
}
