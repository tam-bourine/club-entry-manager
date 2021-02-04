// import Constants from "../../shared/Constants";

import GetModel from "../../models/Clubs/GetModel";

export default class GetController {
  private get = new GetModel();

  show() {
    return this.get.fetchClubs();
  }
}
