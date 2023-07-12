/*
 * Title: Enveronment variable
 * Description: Enveronment variable
 * Author : Sabbir Arnob
 * Date : 06/07/2023
 */

//dependencies

//module sacffolding
const evironment = {};

evironment.staging = {
  port: 3000,
  envName: "staging",
  secretKey: "Thisisstaging",
  maxChecks: 5,
  twilio: {
    fromPhone: "+12342399656",
    accountSid: "AC0b8f9eb977302444e046acad01330b42",
    authToken: "3781e98183f4b5f382d6fde84f7c530b",
  },
};

evironment.production = {
  port: 5000,
  envName: "production",
  secretKey: "Thisisproduction",
  maxChecks: 5,
  twilio: {
    fromPhone: "+12342399656",
    accountSid: "AC0b8f9eb977302444e046acad01330b42",
    authToken: "3781e98183f4b5f382d6fde84f7c530b",
  },
};

//determine which evironment has passed
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

//export corresponding environment object

const environmentExports =
  typeof evironment[currentEnvironment] === "object"
    ? evironment[currentEnvironment]
    : evironment.staging;

//export module
module.exports = environmentExports;
