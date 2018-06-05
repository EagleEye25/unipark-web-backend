var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

// gets all personnel info
exports.getPersonel = function(req, resp) {
  db.executeSql("uspDisplayPersonelInfoAll", function(data, err) {
    if (err) {
      httpMsgs.show500(req, resp, err)
    } else {
      httpMsgs.sendJson(req, resp, data);
    }
    resp.end();
  });
};

// gets specified personnel info
exports.getUserInfo = function(req, resp, personelID) {
  db.executeSql("uspDisplayPersonelInfo" + personelID, function(data, err) {
    if (err) {
      httpMsgs.show500(req, resp, err);
    } else {
      httpMsgs.sendJson(req, resp, data);
    }
  });
};

// gets personnerl login info
exports.getLoginInfo = function(req, resp, personelID) {
  db.executeSql("uspLogin" + personelID, function(data, err) {
    if (err) {
      httpMsgs.show500(req, resp, err);
    } else {
      httpMsgs.sendJson(req, resp, data);
    }
  });
};

// updates user info
exports.updateUserInfo = function(req, resp, reqBody) {
  try {
    if (!reqBody) throw new Error("Input not valid");
    var data = JSON.parse(reqBody);
    if (data) {

      if(!data.personelID) throw new Error("Personnel number not provided!");

      var sql = "UPDATE Personnel SET ";
      var isDataProvided = false;
      if(data.PersonelPhoneNumber) {
        sql += " PersonnelPhoneNumber = '" + data.PersonelPhoneNumber + "',";
        isDataProvided = true;
      }

      if(data.PersonelEmail) {
        sql += " PersonnelEmail = '" + data.PersonelEmail + "',";
        isDataProvided = true;
      }

      if(data.PersonelPassword) {
        sql += " PersonnelPassword = '" + data.PersonelPassword + "',";
        isDataProvided = true;
      }

      sql = sql.slice(0, -1);
      sql += " WHERE PersonnelID = '" + data.personelID + "'";

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
