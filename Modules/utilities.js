/*
 * Title: Utilities
 * Description: Important utilities functions
 * Author : Sabbir Arnob
 * Date : 06/07/2023
 */

//dependencies
const crypto = require("crypto");
const evironment = require("./evironment");

//module sacffolding
const utilities = {};

//parse JSON string to object
utilities.parseJSON = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch (error) {
    output = {};
  }

  return output;
};

//hashing password so we can't see client password
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    console.log(evironment, process.env.NODE_ENV);
    const hash = crypto
      .createHmac("sha256", evironment.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  }
  return false;
};

//Create random string for token
utilities.createRandomString = (strLength) => {
  let length = strLength;
  length = typeof strLength === "number" && strLength > 0 ? strLength : false;

  if(length){
     let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
     let output = '';
     for(let i = 1; i < length; i+=1){
         let randomCharacters = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
         output += randomCharacters;
     }
     return output;
  }else{
    return false
  }
};

//export module
module.exports = utilities;
