var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");
var sql = require('mssql');

exports.getAssignedParking = function(req, resp, parkingID) {
  try {
    db.executeSql("uspSpecificAssigned" + parkingID, function(data, err) {
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

exports.getParkingRequests = function(req, resp) {
  try {
    db.executeSql("SELECT * FROM ParkingRequest", function(data, err) {
      if (err) {
        httpMsgs.show500(req, resp, err);
      } else {
        httpMsgs.sendJson(req, resp, data);
      }
    });

  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};

exports.getparkingRequestInfo = function(req, resp, PersonelID) {
  try {
    db.executeSql("" + PersonelID, function(data, err) {
      if (err) {
        httpMsgs.show500(req, resp, err);
      } else {
        httpMsgs.sendJson(req, resp, data);
      }
    });

  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};

exports.requestParking = function(req, resp, reqBody) {
  var date;
  date = getDateTime();
  try {
    if (!reqBody) throw new Error("Input not valid");
    var data = JSON.parse(reqBody);
    if (data) {
      var sql = "INSERT INTO INSERT INTO ParkingRequest(PersonnelID,ParkingSpaceID,ParkingRequestTime,Status) VALUES ";
      sql+= util.format("('%s', '%s', '%s', %d)", data.PersonnelID, data.ParkingSpaceID, date, 1);

      console.log(date);

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

exports.test = function(req, resp, reqBody) {
  var date;
  date = getDateTime();
  try {
    if (!reqBody) throw new Error("Input not valid");
    var data = JSON.parse(reqBody);
    if (data) {
     new sql.Request()
      .input('personelid', sql.VarChar(20), data.PersonnelID)
      .input('parkingspaceid', sql.VarChar(20), data.ParkingSpaceID)
      .execute('uspRequestParking').then(function(data, err) {
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

getDateTime = function() {

  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}
