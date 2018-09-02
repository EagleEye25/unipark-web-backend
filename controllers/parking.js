var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");
var sql = require('mssql');

// gets parking assigned to user
exports.getAssignedParking = function(req, resp, PersonelID) {
  try {
    db.executeSql("uspSpecificAssigned" + PersonelID, function(data, err) {
      if (err) {
        httpMsgs.show500(req, resp, err)
      } else {
        httpMsgs.sendJson(req, resp, data[0]);
      }
      resp.end();
    });
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};

// gets parking assigned to user
exports.getRequestSpecified = function(req, resp, PersonelID) {
  try {
    db.executeSql("uspGetRequest" + PersonelID, function(data, err) {
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

// gets all parking requsts
exports.getParkingRequests = function(req, resp) {
  try {
    db.executeSql("SELECT * FROM ParkingRequest", function(data, err) {
      if (err) {
        httpMsgs.show500(req, resp, err);
      } else {
        httpMsgs.sendJson(req, resp, data);
      }
      resp.end();
    });
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};

// gets all parking requests from database
exports.getParkingRequestInfoSpecified = function(req, resp, PersonelID) {
  try {
    db.executeSql("uspGetParkingForPersonel" + PersonelID, function(data, err) {
      if (err) {
        httpMsgs.show500(req, resp, err);
      } else {
        httpMsgs.sendJson(req, resp, data);
      }
      resp.end();
    });
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};

// gets all parking requests from database
exports.cancelRequest = function(req, resp, PersonelID) {
  try {
    db.executeSql("uspCancelRequest" + PersonelID, function(data, err) {
      if (err) {
        httpMsgs.show500(req, resp, err);
      } else {
        httpMsgs.sendJson(req, resp, data);
      }
      resp.end();
    });
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};

/*
// gets parking areas 
exports.getParkingAreasSpecified = function(req, resp, PersonelID) {
  try {
    db.executeSql("uspGetPakingAreaForPersonnel" + PersonelID, function(data, err) {
      if (err) {
        httpMsgs.show500(req, resp, err);
      } else {
        httpMsgs.sendJson(req, resp, data);
      }
      resp.end();
    });
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};
*/

// adds data for requesting of parking space
exports.requestParking = function(req, resp, reqBody) {
  var date;
  date = getDateTime();
  try {
    if (!reqBody) throw new Error("Input not valid");
    var data = JSON.parse(reqBody);
    if (data) {
      var sql = "INSERT INTO ParkingRequest(PersonnelID,ParkingSpaceID,ParkingRequestTime,Status) VALUES ";
      sql+= util.format("('%s', %d, '%s', %d)", data.PersonnelID, data.ParkingSpaceID, new Date().toISOString(), true);

      console.log(date, sql);

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

// test of insert (request parking)
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

// gets current system date and time
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
