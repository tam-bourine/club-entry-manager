class Club {
  constructor() {
    this.sheet = SpreadSheetApp.getActiveSpreadSheet.getSheetByName('部活動一覧');
  }

  static all() {
    /* シート操作メモ
    values = 全レコード全カラムで取得
    keys = レコードのうち、1行目を配列として取得
    values = arrayToObjects(keys, values); オブジェクトが複数入った入れるに変更
    values = valuesのうち必要なカラム名だけ取得
    return values;
    */
  }

  static find(id) {
    /* values = 全レコード全カラムで取得
    keys = レコードのうち、1行目を配列として取得
    values = 引数idと一致するものだけ抽出 filterメソッドとか使う
    values = valuesのうち配列に入っているカラム名と一致するものだけ取得
    return value;
    */
  }

  static create(params) {
    /* 
    values = objectToArray(params) paramsをキーだけ無くした配列に変換
    行を追加して挿入
    return 成功したらtrue, 失敗したらfalse
    */
  }

  static update(id, params) {
    /*
    values = 全レコードを全カラム取得
    keys = レコードのうち、1行目を配列として取得
    values = arrayToObjects(keys, values);
    
    row = idから行番号を取得
    value = レコードの中で、idに一致するものだけに絞り込む
    value = 元のレコードのうち、values部分を更新したものを返す
    value = 配列の形式に変更
    行に新しいレコードを上書き(setValues)
    return 成功したらtrue, 失敗したらfalse
    */
  }
}