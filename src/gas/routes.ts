/* global MembersController ClubsController ParameterInterface */
// eslint-disable-next-line no-unused-vars
const doGet = (e) => {
  const { action } = e.parameter;
  let res: object;
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
      console.error(res);
      break;
    }
  }
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
};

// eslint-disable-next-line no-unused-vars
const doPost = (e) => {
  const { action } = e.parameter;

  const params: ParameterInterface = JSON.parse(e.postData.getDataAsString());
  let res: object;
  switch (action) {
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
      console.error(res);
      break;
    }
  }
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
};
