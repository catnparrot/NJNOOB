const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node</h1>");
    res.write("<h2>Port 8090</h2>");
    res.end("<p>Hello Server</p>");
  })
  .listen(8090, () => {
    console.log("port 8090 prepared");
  });

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node</h1>");
    res.write("<h2>Port 8091</h2>");
    res.end("<p>Hello Server</p>");
  })
  .listen(8091, () => {
    console.log("port 8091 prepared");
  });
