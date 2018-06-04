var settings = require("../settings");

exports.show404 = function(req, resp) {
  if(settings.httpMsgsFormat === "HTML") {
    resp.writeHead(404, "Resource Not Found", { "Content-Type": "text/html" });
    resp.write("<html><title>ERROR:404</title><body>404: Resource Not Found</body></html>");
  } else {
    resp.writeHead(405, "Resource Not Found", { "Content-Type": "application/json" });
    resp.write(JSON.stringify({data: " Resource Not Found"}));
  }
  resp.end();
};

exports.show405 = function(req, resp) {
  if(settings.httpMsgsFormat === "HTML") {
    resp.writeHead(405, "Method Not Supported", { "Content-Type": "text/html" });
    resp.write("<html><title>ERROR:405</title><body>405: Method Not Supported</body></html>");
  } else {
    resp.writeHead(405, "Method Not Supported", { "Content-Type": "application/json" });
    resp.write(JSON.stringify({data: " Method Not Supported"}));
  }
  resp.end();
};

exports.show413 = function(req, resp) {
  if(settings.httpMsgsFormat === "HTML") {
    resp.writeHead(413, "Request Entity Too Large", { "Content-Type": "text/html" });
    resp.write("<html><title>ERROR:413</title><body>413: Request Entity Too Large</body></html>");
  } else {
    resp.writeHead(413, "Request Entity Too Large", { "Content-Type": "application/json" });
    resp.write(JSON.stringify({data: " Request Entity Too Large"}));
  }
  resp.end();
};

exports.show500 = function(req, resp, err) {
  if(settings.httpMsgsFormat === "HTML") {
    resp.writeHead(500, "Internal Error Occured", { "Content-Type": "text/html" });
    resp.write("<html><title>ERROR:500</title><body>500: Internal Error. Details: " + err + "</body></html>");
  } else {
    resp.writeHead(500, "Internal Error Occurred", { "Content-Type": "application/json" });
    resp.write(JSON.stringify({data: " Error OCCURRED: " + err}));
  }
  resp.end();
};

exports.send200 = function(req, resp) {
  if(settings.httpMsgsFormat === "HTML") {
    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.end();
  };
}

exports.sendJson = function(req, resp, data) {
  resp.writeHead(200, { "Content-Type": "application/json" });
  if(data) {
    resp.write(JSON.stringify(data));
  }
  resp.end();
}

exports.showHome = function(req, resp) {
  if(settings.httpMsgsFormat === "HTML") {
    resp.writeHead(200, { "Content-Type": "text/html" });
    resp.write("<html><title>Home</title><body>Valid endpoints: <br></body></html>");
  } else {
    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.write(JSON.stringify([{url: "/employee", operation: "GET", description: "To list all emp"}]));
  }
  resp.end();
};
