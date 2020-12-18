class Sheet {
  constructor(name)  {
    this.sheet = SpreadSheetApp.getActiveSpreadSheet.getSheetByName(name);
  }

  get() {
    /*
    values = 全レコード全カラムで取得
    keys = レコードのうち、1行目を配列として取得
    values = arrayToObjects(keys, values);
    return values;
    */
  }

  select(columns) {
    /*
    values = 全レコード全カラムで取得
    keys = レコードのうち、1行目を配列として取得
    values = arrayToObjects(keys, values);
    value = valuesのうち配列に入っているカラム名と一致するものだけ取得
    return value;
    */
  }

  insert(values) {
    /*
    valuesを配列に変換
    行を追加して挿入
    return 成功したらtrue, 失敗したらfalse
    */
  }

  update(id, values) {
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