/*
 * Title: To send notification to client
 * Description: To notify the client if there link goes up or down
 * Author : Sabbir Arnob
 * Date : 11/07/2023
 */

//dependencies
const https = require("https");
const queryString = require("querystring");
const { twilio } = require("./evironment");

//module sacffolding
const notifications = {};

//send SMS to user using twilio api

notifications.sendTwilioSms = (phone, msg, callback) => {
  //input validation
  const userPhone =
    typeof phone === "string" && phone.trim().length === 11
      ? phone.trim()
      : false;

  const userMsg =
    typeof msg === "string" &&
    msg.trim().length > 0 &&
    msg.trim().length <= 1600
      ? msg.trim()
      : false;

  if (userPhone && userMsg) {
    //configure the request payload
    const payLoad = {
      From: twilio.fromPhone,
      To: `+88${userPhone}`,
      Body: userMsg,
    };

    //stringify the payload
    const stringifyPayload = queryString.stringify(payLoad);

    //configure the request details of https
    const requestDetailes = {
      hostname: "api.twilio.com",
      method: "POST",
      path: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
      auth: `${twilio.accountSid}:${twilio.authToken}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    //instantiate the request object
    const req = https.request(requestDetailes, (res) => {
      //get the status of send request
      const status = res.statusCode;

      //check the request success or not

      if (status === 200 || status === 201) {
        callback(false);
      } else {
        callback(`Status code return to ${status}`);
      }
    });

    req.on("error", (e) => {
      callback(e);
    });

    req.write(stringifyPayload);
    req.end();
  } else {
    callback("Can't send the message there have a problem in request");
  }
};

//export the module

module.exports = notifications;
