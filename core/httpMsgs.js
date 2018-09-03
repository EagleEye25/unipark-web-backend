var settings = require("../settings");

exports.show404 = function(req, resp) {
  resp.writeHead(404, "Resource Not Found", { "Content-Type": "application/json" });
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
  resp.writeHead(500, "Internal Error Occurred", {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*" });
  resp.write(JSON.stringify({data: " Error OCCURRED: " + err}));
  resp.end();
};

exports.send200 = function(req, resp) {
  resp.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  resp.write(JSON.stringify({data: " SUCCESS "}));
  resp.end();
}

exports.sendJson = function(req, resp, data) {
  resp.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  if(data) {
    resp.write(JSON.stringify(data));
  }
  resp.end();
}

exports.sendOptions = function(req, resp, data) {
  resp.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "origin, x-csrftoken, content-type, accept"
  });
  if(data) {
    resp.write(JSON.stringify(data));
  }
  resp.end();
}

exports.showHome = function(req, resp) {
  resp.writeHead(200, { "Content-Type": "application/json" });
  resp.write(JSON.stringify([
  // personnel
  {url: "/personnel", operation: "GET", description: "Gets list of all personnel."},
  {url: "/personnel/specified/'personnelID'", operation: "GET", description: "Gets all personnel info."},
  {url: "/personnel/login/'personnelID'", operation: "POST", description: "'signs in' user from info entered."},
  {url: "/personnel/update", operation: "PUT", description: "Updates the user information.",
    info: "Please ensure that you use the operation PUT to push data that is entered."},
  // parking
  {url: "/parking/request/info/'personnelID'", operation: "GET", description: "Gets list of parking areas, spaces user is vaild to request."},
  {url: "/parking/assigned/'personnelID'", operation: "GET", description: "Gets parking assigned to user."},
  {url: "/parking/requests", operation: "GET", description: "Gets user requests in request parking."},
  {url: "/request-parking", operation: "POST", description: "Request for parking within facility."},
  {url: "/infringements/'personnelID'", operation: "GET", description: "Gets all entered user infringements."},
  {url: "/personnel/requests/'personnelID'", operation: "GET", description: "Gets personnel Requests."},
  {url: "/request/cancel/'personnelID'", operation: "GET", description: "Cancels Request. (UPDATED)"},
  {url: "/personnelByPlate/'licensePlate'", operation: "GET", description: "Gets user asocciated to license plate"},
  {url: "/report", operation: "POST", description: "Reports a user"}
  ]));
  resp.end();
};