const { Requester, Validator } = require("@chainlink/external-adapter");
require("dotenv").config();
// Define custom error scenarios for the API.
// Return true for the adapter to retry.
const customError = (data) => {
  if (data.Response === "Error") return true;
  return false;
};

// Define custom parameters to be used by the adapter.
// Extra parameters can be stated in the extra object,
// with a Boolean value indicating whether or not they
// should be required.
const customParams = {
  orderId: ["orderId"],
  provider: ["provider"],
  endpoint: false,
};

const createRequest = (input, callback) => {
  // The Validator helps you validate the Chainlink request data
  const validator = new Validator(callback, input, customParams);
  const jobRunID = validator.validated.id;

  // const orderId = validator.validated.data.orderId;
  // const provider = validator.validated.data.provider;

  const orderId = input.data.orderId;
  const provider = input.data.provider;

  console.log(orderId, " ", provider);

  const url = `https://api.aftership.com/v4/last_checkpoint/${provider}/${orderId}`;

  const params = {
    provider,
    orderId,
  };

  const headers = {
    "aftership-api-key": process.env.API_KEY,
  };

  // This is where you would add method and headers
  // you can add method like GET or POST and add it to the config
  // The default is GET requests
  // method = 'get'
  // headers = 'headers.....'
  const config = {
    url,
    params,
    headers,
  };

  // The Requester allows API calls be retry in case of timeout
  // or connection failure
  Requester.request(config, customError)
    .then((response) => {
      // It's common practice to store the desired value at the top-level
      // result key. This allows different adapters to be compatible with
      // one another.

      if (Object.keys(response.data).length == 0) {
      }
      callback(response.status, Requester.success(jobRunID, response.data));
    })
    .catch((error) => {
      console.log(error.data);
      var resp = JSON.parse(JSON.stringify(error));
      resp.data = {
        tag: "notfound",
      };
      console.log("----------\n", resp);

      callback(200, Requester.success(jobRunID, resp));
    });
};

// This is a wrapper to allow the function to work with
// GCP Functions
exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data);
  });
};

// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data);
  });
};

// This is a wrapper to allow the function to work with
// newer AWS Lambda implementations
exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    });
  });
};

// This allows the function to be exported for testing
// or for running in express
module.exports.createRequest = createRequest;
