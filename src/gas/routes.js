function doGet(e) {
  const { action } = e.parameter;
  let res;
  switch (action) {
    case "get": {
      res = ClubsController.get();
      break;
    }
    default: {
      res = {
        status: 404,
        message: "404 Not Found",
        success: false,
      };
      break;
    }
  }
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  const { action } = e.parameter;
  const params = JSON.parse(e.postDataAsString());
  let res;
  switch (action) {
    case "regist": {
      res = ClubsController.regist(params);
      break;
    }
    case "approve": {
      res = ClubsController.approve(params);
      break;
    }
    case "join": {
      res = MembersController.join(params);
      break;
    }
    default: {
      res = {
        status: 404,
        message: "404 Not Found",
        success: false,
      };
      break;
    }
  }
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(
    ContentService.MimeType.JSON
  );
}
