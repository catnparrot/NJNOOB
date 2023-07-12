const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node</h1>");
    res.end("<h1>Hello Server</h1>");
  })
  .listen(8090, () => {
    console.log("8090번 포트에서 서버 대기 중입니다.");
  });
