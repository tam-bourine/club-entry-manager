import RegistInterface from "../../types/RegistInterface";
import Utils from "../../shared/Response";
import RegistModel from "../../models/RegistModel";

export default class RegistController {
  constructor() {}

  private util = new Utils();

  private regist = new RegistModel();

  create(params: RegistInterface) {
    return this.regist.addClub(params);
  }
}
