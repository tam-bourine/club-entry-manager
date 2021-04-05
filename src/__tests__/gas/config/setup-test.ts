/* global GoogleAppsScript */
global.PropertiesService = {} as GoogleAppsScript.Properties.PropertiesService;
global.ContentService = {} as GoogleAppsScript.Content.ContentService;
global.SpreadsheetApp = {} as GoogleAppsScript.Spreadsheet.SpreadsheetApp;

PropertiesService.getScriptProperties = () =>
  (({
    getProperty: () => {},
  } as unknown) as GoogleAppsScript.Properties.Properties);

ContentService.createTextOutput = () =>
  (({
    setMimeType: () => {},
  } as unknown) as GoogleAppsScript.Content.TextOutput);
ContentService.MimeType = ({
  JSON: {} as typeof GoogleAppsScript.Content.MimeType.JSON,
} as unknown) as typeof GoogleAppsScript.Content.MimeType;

SpreadsheetApp.getActiveSpreadsheet = () =>
  (({
    getSheetByName: () => ({
      getDataRange: () => ({
        getValues: (): any[][] => [[]],
      }),
      appendRow: () => ({}),
    }),
    insertSheet: () => {},
  } as unknown) as GoogleAppsScript.Spreadsheet.Spreadsheet);
