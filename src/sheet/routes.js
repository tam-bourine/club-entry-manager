function doGet(e) {
  const action = e.parameter.action;
  let res;
  switch(action) {
    case 'get': {
      res = ClubsController.get(e);
      break;
    }
    default: {
      res = {
        status: 404,
        message: '404 Not Found',
        success: false
      }
      break;
    }
  }
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const action = e.parameter.action;
  let res;
  switch(action) {
    case 'regist': {
      res = ClubsController.regist(e);
      break;
    }
    case 'approve': {
      res = ClubsController.approve(e);
      break;
    }
    case 'join': {
      res = ClubsController.join(e);
      break;
    }
    default: {
      res = {
        status: 404,
        message: '404 Not Found',
        success: false
      }
      break;
    }
  }
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
}
