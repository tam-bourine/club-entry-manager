class Sheet {
  constructor(name)  {
    this.sheet = SpreadSheetApp.getActiveSpreadSheet.getSheetByName(name);
  }

  static getValues() {
    
  }
}