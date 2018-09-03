var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");
var sql = require('mssql');
var parking = require('../controllers/parking');

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

// adds data for reporting user
exports.reportUser = function(req, resp, reqBody) {
  try {
    if (!reqBody) throw new Error("Input not valid");
    var data = JSON.parse(reqBody);
    if (data) {
      var sql = "INSERT INTO Report(ReportDesc, ReportDate, ReportCreator, Processed, ReportTypeID, PersonnelID, LicensePlate) VALUES ";
      sql+= util.format("('%s', '%s', '%s', %d, %d, '%s', '%s')", data.ReportDesc, new Date().toISOString(), data.ReportCreator, false, data.ReportTypeID, data.PersonnelID, data.LicensePlate );
      db.executeSql(sql, function(data, err) {
        if (err) {
          httpMsgs.show500(req, resp, err);
        } else {
          httpMsgs.send200(req, resp);
        }
      });
    }
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};