/*
 * Title: Handle Request and respons
 * Description: Handle Request and respons
 * Author : Sabbir Arnob
 * Date : 06/07/2023
 */

//Dependencies
const { StringDecoder } = require("string_decoder");
const url = require("url");
const routes = require("../routes");
const {
  notFoundHandler,
} = require("../handlers/routesHandlers/notFoundHandler");
const { parseJSON } = require("../Modules/utilities");

//module scaffolding
const handler = {};

//handle request and respons
handler.handleReqRes = (req, res) => {
  //request handle
  //get the url and parse it
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parseUrl.query;
  const headersObject = req.headers;

  //request property

  const requestProperties = {
    parseUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headersObject,
  };

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  const chooseHandle = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();

    requestProperties.body = parseJSON(realData);

    chooseHandle(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};
      const payloadString = JSON.stringify(payload);

      //return the final respons
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

module.exports = handler;
