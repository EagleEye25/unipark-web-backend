var settings = require("../settings");

exports.show404 = function(req, resp) {
  resp.writeHead(405, "Resource Not Found", { "Content-Type": "application/json" });
  resp.write(JSON.stringify({data: " Resource Not Found"}));
  resp.end();
};

exports.show405 = function(req, resp) {
  resp.writeHead(405, "Method Not Supported", { "Content-Type": "application/json" });
  resp.write(JSON.stringify({data: " Method Not Supported"}));
  resp.end();
};

exports.show413 = function(req, resp) {
  resp.writeHead(413, "Request Entity Too Large", { "Content-Type": "application/json" });
  resp.write(JSON.stringify({data: " Request Entity Too Large"}));
  resp.end();
};

exports.show500 = function(req, resp, err) {
  resp.writeHead(500, "Internal Error Occurred", { "Content-Type": "application/json" });
  resp.write(JSON.stringify({data: " Error OCCURRED: " + err}));
  resp.end();
};

exports.send200 = function(req, resp) {
  resp.writeHead(200, { "Content-Type": "application/json" });
  resp.write(JSON.stringify({data: " SUCCESS "}))
  resp.end();
}

exports.sendJson = function(req, resp, data) {
  resp.writeHead(200, { "Content-Type": "application/json" });
  if(data) {
    resp.write(JSON.stringify(data));
  }
  resp.end();
}

exports.showHome = function(req, resp) {
  resp.writeHead(200, { "Content-Type": "application/json" });
  resp.write(JSON.stringify([{url: "/personnel", operation: "GET", description: "Gets list of all personnel"},
  {url: "/personnel/specified/'personnelID'", operation: "GET", description: "Gets all personnel info"},
  {url: "/personnel/login/'personnelID'", operation: "GET", description: "Gets personnel login info"}
  ]));
  resp.end();
};
