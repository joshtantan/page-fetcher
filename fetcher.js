const net = require('net');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

if (url && filePath) {
  console.log(url);
  console.log(filePath);

  const conn = net.createConnection({ 
    host: url,
    port: 80
  });
  
  conn.setEncoding('UTF8');

  conn.on('connect', () => {
    console.log(`Connected to server!`);

    conn.write(`GET / HTTP/1.1\r\n`);
    conn.write(`Host: ${url}\r\n`);
    conn.write(`\r\n`);
  });

  conn.on('data', (data) => {
    console.log("Webpage Data:", data);

    fs.writeFile(filePath, data, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    
    conn.end();
  });
}
