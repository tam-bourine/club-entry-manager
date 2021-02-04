import RegistInterface from "../../types/RegistInterface";
import RegistModel from "../../models/RegistModel";

export default class RegistController {
  constructor() {}

  private regist = new RegistModel();

  create(params: RegistInterface) {
    return this.regist.addClub(params);
  }
}
