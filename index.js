let http = require("http");
let url = require("url");
let fs = require("fs");

const PORT = 8080;

http
  .createServer((req, res) => {
    let q = url.parse(req.url, true);

    let filename =
      q.pathname === "/" ? "./index.html" : "./" + q.pathname + ".html";

    const path404 = "./404.html";
    fs.readFile(filename, function (err, data) {
      if (err) {
        fs.readFile(path404, function (err404, data404) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(data404);
          return res.end();
        });
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(PORT);
