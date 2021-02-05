import RegistModel from "../../models/Club/RegistModel";
import RegistInterface from "../../types/RegistInterface";

export default class RegistController {
  private model = new RegistModel();

  create(params: RegistInterface) {
    return this.model.addClub(params);
  }
}
