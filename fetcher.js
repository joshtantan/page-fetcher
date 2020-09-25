const fs = require('fs');
const request = require('request');

const url = process.argv[2];
const filePath = process.argv[3];

if (url && filePath) {
  request(url, (error, response, body) => {
    const statusCode = response.statusCode;

    if (error) {
      console.log(error);
      console.log("Status code:", statusCode);
    } else if (statusCode !== 200) {
      console.log("No error, but page not found with status code:", statusCode);
    } else {
      fs.writeFile(filePath, body, function (err) {
        if (err) throw err;

        const byteSize = Buffer.byteLength(body, 'utf8');
        console.log(`Downloaded and saved ${byteSize} bytes to ${filePath}`);
      });
    }
  });
}

