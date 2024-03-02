const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath;
  if (req.url === '/') {
    filePath = path.join(__dirname, 'main.html');
  } else {
    filePath = path.join(__dirname, req.url);
  }

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.statusCode = 404;
      res.end('File not found');
    } else {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal server error');
        } else {
          const ext = path.extname(filePath);
          let contentType = 'text/plain';
          if (ext === '.html') {
            contentType = 'text/html';
          } else if (ext === '.css') {
            contentType = 'text/css';
          }

          res.setHeader('Content-Type', contentType);

          res.end(data);
        }
      });
    }
  });
});

const port = 80;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

