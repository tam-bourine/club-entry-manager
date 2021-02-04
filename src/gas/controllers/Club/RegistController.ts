import RegistInterface from "../../types/RegistInterface";
import RegistModel from "../../models/Club/RegistModel";

export default class RegistController {
  private regist = new RegistModel();

  create(params: RegistInterface) {
    return this.regist.addClub(params);
  }
}
