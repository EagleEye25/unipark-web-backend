var http = require("http");
var emp = require("../controllers/employee");
var settings = require("../settings")
var httpMsgs = require("../core/httpMsgs");
var personel = require("../controllers/personel");
var db_func = require("./db_functions");

http.createServer(function(req, resp) {
  switch (req.method) {
    // GET
    case "GET":
      db_func.getUrlInfo(req, resp);
      break;
    // INSERT
    case "POST":
      db_func.insert(req, resp);
      break;
    // UPDATE
    case "PUT":
      db_func.update(req, resp);
      break;
  }
}).listen(settings.webPort, function() {
  console.log("Started listening at: " + settings.webPort);
});