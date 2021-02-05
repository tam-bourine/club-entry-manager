import RegistModel from "../../models/Club/RegistModel";
import RegistInterface from "../../types/RegistInterface";

export default class RegistController {
  private regist = new RegistModel();

  create(params: RegistInterface) {
    return this.regist.addClub(params);
  }
}
