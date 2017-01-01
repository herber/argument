const argument = require('../..');
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const join = require('array-path-join');

argument.option('port', 'The http port', '3000');

argument.command('serve', 'Start a http server');

const args = argument.parse(process.argv.slice(2));
const port = args.port || 3000;

if (args.serve) {
  http.createServer(function(request, response) {
    const uri = url.parse(request.url).pathname
    let filename = path.join(process.cwd(), uri);

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    if (fs.existsSync(filename)) {
      fs.readFile(filename, "binary", function(err, file) {
        if(err) {
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(err + "\n");
          response.end();
          return;
        }

        response.writeHead(200);
        response.write(file, "binary");
        response.end();
      });
    } else {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 - Not Found");
      response.end();
      return;
    }
  }).listen(parseInt(port, 10));

  console.log("Server running on port " + port);
}
