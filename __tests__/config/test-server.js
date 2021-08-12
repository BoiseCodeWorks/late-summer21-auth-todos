import { colors } from './console-utils';
var http = require("http");
var fs = require("fs");
var path = require("path");
const port = 9090

let server = http.createServer(function (req, res) {
  try {
    var decoded = decodeURI(req.url);
    var filename = path.join(process.cwd(), '__report__', decoded);
    if (fs.statSync(filename).isDirectory()) filename += "/index.html";
    var exists = fs.existsSync(filename);

    if (!exists) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>404 Not Found</h1> <a href='/'>GO BACK</a>");
      res.end();
      return;
    }

    fs.readFile(filename, "binary", function (err, file) {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.write(err + "\n");
        res.end();
        return;
      }

      let type = getContentType(filename);

      res.writeHead(200, { "Content-Type": type });
      res.write(file, "binary");
      res.end();
    });
  } catch (e) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>404 Not Found</h1> <a href='/'>GO BACK</a>");
    res.end();
  }
});

function getContentType(filename) {
    let type = 'text/plain';
    const extension = filename.slice(filename.lastIndexOf('.') + 1);
    switch (extension.toLowerCase()) {
        case 'html':
            type = 'text/html';
            break;
        case 'js':
            type = 'text/javascript';
            break;
        case 'json':
            type = 'application/json';
            break;
        case 'css':
            type = 'text/css';
            break;
        case 'jpeg':
        case 'jpg':
            type = "image/jpeg";
            break;
        case 'png':
            type = "image/png";
            break;
        case 'gif':
            type = "image/gif";
            break;
    }
    return type;
}

function startServer() {
  server.listen(port, () => {

    console.log(
      `
${colors.FgGreen}---CODEWORKS TEST SERVER-------------------------------------------------------${colors.Reset}

  Test report on:  ${colors.FgCyan}http://localhost:${port}${colors.Reset}

  Quit: ${colors.FgMagenta}ctrl+c${colors.Reset}
`
    );
    import('./testLoader')
  });
}

startServer();
