class Member {
  constructor(clubName) {
    this.sheet = SpreadSheetApp.getActiveSpreadSheet.getSheetByName(clubName);
  }

  static create(params) {
    /*
    values = objectToArray(params) paramsをキーだけ無くした配列に変換
    行を追加して挿入
    return 成功したらtrue, 失敗したらfalse
    */
  }
}
