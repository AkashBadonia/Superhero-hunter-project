// Import the required modules
var readline = require("readline-sync");
var MD5 = require("crypto-js/md5");

// Hash the input using MD5
var hash = MD5("1d39b7da8cf74c6f747ff161774913e037abd8ee90fef2c5e0f7688fcc0be776bc8b0afc9").toString();
a7d4e8e00ff94c58956b6f590e7ef441
console.log(`MD5 hash of the input is: ${hash}`);
