/* global MembersController ClubsController ParameterInterface */
// eslint-disable-next-line no-unused-vars
const doGet = (e) => {
  const { action } = e.parameter;
  let response: object;
  switch (action) {
    case "get": {
      response = ClubsController.get();
      break;
    }
    default: {
      response = {
        status: 404,
        message: "404 Not Found",
        success: false,
      };
      console.error({ response });
      break;
    }
  }
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
};

// eslint-disable-next-line no-unused-vars
const doPost = (e) => {
  const { action } = e.parameter;

  const params: ParameterInterface = JSON.parse(e.postData.getDataAsString());
  let response: object;
  switch (action) {
    case "approve": {
      response = ClubsController.approve(params);
      break;
    }
    case "join": {
      response = MembersController.join(params);
      break;
    }
    default: {
      response = {
        status: 404,
        message: "404 Not Found",
        success: false,
      };
      console.error({ response });
      break;
    }
  }
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
};
