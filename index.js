/*
 * Title: Project intial file
 * Description: intial file to start node server and workers
 * Author : Sabbir Arnob
 * Date : 12/07/2023
 */

//Dependencies
const server = require("./lib/server");
const worker = require("./lib/workers");

//app object - module scaffoling
const app = {};

app.init = () => {
  //start the server
  server.init();
  //start the workers
  worker.init();
};

app.init();

//export the app
module.exports = app;
