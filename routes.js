/*
 * Title: Handle all the routes
 * Description: Handing the routes that where will clients go if they hit API then where they wanted to go
 * Author : Sabbir Arnob
 * Date : 06/07/2023
 */


//dependencies
const {sampleHandler} = require('./handlers/routesHandlers/sampleHandler');
const {userHandler} = require('./handlers/routesHandlers/userHandler');
const {tokenHandler} = require('./handlers/routesHandlers/tokenHandler');
const {checkHandler} = require('./handlers/routesHandlers/checkHandler');

//routes
const routes = {
    sample: sampleHandler,
    user: userHandler,
    token: tokenHandler,
    check: checkHandler
}

module.exports = routes;