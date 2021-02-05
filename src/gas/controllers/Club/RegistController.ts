import RegistModel from "../../models/Club/RegistModel";
import RegistInterface from "../../types/RegistInterface";

export default class RegistController {
  private model = new RegistModel();

  /**
   * Add New Club（CreateClub 3, 4）
   */
  create(params: RegistInterface) {
    return this.model.addClub(params);
  }
}
