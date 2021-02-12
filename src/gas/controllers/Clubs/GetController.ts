// import Constants from "../../shared/Constants";

import GetModel from "../../models/Clubs/GetModel";

export default class GetController {
  private model = new GetModel();

  show() {
    return this.model.fetchClubs();
  }
}
