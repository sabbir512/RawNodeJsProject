/*
 * Title: Notfound handler
 * Description: Not Found handler
 * Author : Sabbir Arnob
 * Date : 06/07/2023
 */

//module scaffolding
const notFoundHandlers = {};

notFoundHandlers.notFoundHandler = (requestProperties, callback) => {
 callback(404, {
    massage: "your url not founded"
 })
};

module.exports = notFoundHandlers;
