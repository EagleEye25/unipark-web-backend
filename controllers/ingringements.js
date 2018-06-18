var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var sql = require('mssql');

// gets user infringements
exports.getUserIngringements = function(req, resp, PersonelID) {
  try {
    db.executeSql("uspGetPersonnelReports" + PersonelID, function(data, err) {
      if (err) {
        httpMsgs.show500(req, resp, err)
      } else {
        httpMsgs.sendJson(req, resp, data);
      }
      resp.end();
    });
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};