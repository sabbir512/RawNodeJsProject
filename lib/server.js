/*
 * Title: server file
 * Description: Server related work will be here
 * Author : Sabbir Arnob
 * Date : 12/07/2023
 */

//Dependencies
const http = require("http");
const { handleReqRes } = require("../Modules/handleReqRes");
const environment = require('../Modules/evironment');


//app object - module scaffoling
const server = {};

//create server
server.createServer = () => {
  const createServerVariable = http.createServer(server.handleReqRes);
  createServerVariable.listen(environment.port, () => {
    console.log(`listing to port ${environment.port}`);
  });
};

//handle request and respons
server.handleReqRes = handleReqRes;

//Start the server
server.init = () =>{
    server.createServer();
};

//export 
module.exports = server;
