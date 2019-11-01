'use strict';

var mongoose = require('mongoose'),
  Medition = mongoose.model('Medition');
const http = require('http');

exports.getMeditions = function(){
/*  http.get('http://192.168.1.111/ HTTP/1.1', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    //console.log(chunk);
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
  console.log("Error: " + err.stack);

});*/
http.get('http://192.168.1.111/', (res) => {
const { statusCode } = res;
const contentType = res.headers['content-type'];

let error;
if (statusCode !== 200) {
  error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
} else if (!/^application\/json/.test(contentType)) {
  error = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`);
}
if (error) {
  console.error(error.message);
  // Consume response data to free up memory
  res.resume();
  return;
}

res.setEncoding('utf8');
let rawData = '';
res.on('data', (chunk) => { rawData += chunk; });
res.on('end', () => {
  try {
    const parsedData = JSON.parse(rawData);
    console.log(parsedData);
  } catch (e) {
    console.error(e.message);
  }
});
}).on('error', (e) => {
console.error(`Got error: ${e.message}`);
});
};
