var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

// gets all personnel info
exports.getPersonel = function(req, resp) {
  try {
    db.executeSql("uspDisplayPersonelInfoAll", function(data, err) {
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

// gets specified personnel info
exports.getUserInfo = function(req, resp, personelID) {
  try {
    db.executeSql("uspDisplayPersonelInfo" + personelID, function(data, err) {
      if (err) {
        httpMsgs.show500(req, resp, err);
      } else {
        httpMsgs.sendJson(req, resp, data[0]);
      }
    });
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};

// gets personnerl login info
exports.fetchLoginInfo = function(personelID, callback) {
  try {
    db.executeSql("uspLogin" + `'${personelID}'`, function(data, err) {
      callback(data, err);
    });
  } catch (ex) {
    callback(data, err);
  }
};

// gets user accociated to license plate
exports.getUserByLPlate = function(req, resp, lPlate) {
  try {
    db.executeSql("uspGetPeronnelIdFromLicensePlate" + lPlate, function(data, err) {
      if (err) {
        httpMsgs.show500(req, resp, err);
      } else {
        httpMsgs.sendJson(req, resp, data[0]);
      }
    });
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};

/* possible implimentation for update stored procedure
exports.update = function(req, resp, reqBody) {
  if (!reqBody) throw new Error("Input not valid");
    var data = JSON.parse(reqBody);
  
  db.executeSql("uspChangeDetailsWeb" + data.PersonnelEmail + data.PersonnelPhoneNumber + data.PersonnelPassword + data.PersonnelID ,function(data, err) {
    if (err) {
      httpMsgs.show500(req, resp, err);
    } else {
      httpMsgs.sendJson(req, resp, data);
    }
  });
};
*/

// updates user info
exports.updateUserInfo = function(req, resp, reqBody) {
  try {
    if (!reqBody) throw new Error("Input not valid");
    var data = JSON.parse(reqBody);
    if (data) {

      if(!data.PersonnelID) throw new Error("Personnel number not provided!");

      var sql = "UPDATE Personnel SET ";
      var isDataProvided = false;
      // CELL NO
      if(data.PersonnelPhoneNumber) {
        sql += " PersonnelPhoneNumber = '" + data.PersonnelPhoneNumber + "',";
        isDataProvided = true;
      }
      // EMAIL
      if(data.PersonnelEmail) {
        sql += " PersonnelEmail = '" + data.PersonnelEmail + "',";
        isDataProvided = true;
      }
      // PASSWORD
      if(data.PersonnelPassword) {
        sql += " PersonnelPassword = '" + data.PersonnelPassword + "',";
        isDataProvided = true;
      }

      sql = sql.slice(0, -1);
      sql += " WHERE PersonnelID = '" + data.PersonnelID + "'";

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
