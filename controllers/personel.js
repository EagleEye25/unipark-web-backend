var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.getPersonel = function(req, resp) {
  db.executeSql("SELECT * FROM Personel", function(data, err) {
    if (err) {
      httpMsgs.show500(req, resp, err)
    } else {
      httpMsgs.sendJson(req, resp, data);
    }
    resp.end();
  });
};

exports.getUserInfo = function(req, resp, personelID) {
  db.executeSql("SELECT * FROM Personel WHERE PersonelID =" + personelID, function(data, err) {
    if (err) {
      httpMsgs.show500(req, resp, err);
    } else {
      httpMsgs.sendJson(req, resp, data);
    }
  });
};

exports.updateUserInfo = function(req, resp, reqBody) {
  try {
    if (!reqBody) throw new Error("Input not valid");
    var data = JSON.parse(reqBody);
    if (data) {

      if(!data.personelID) throw new Error("Personnel number not provided!");

      var sql = "UPDATE Personel SET ";
      var isDataProvided = false;
      if(data.PersonelPhoneNumber) {
        sql += " PersonelPhoneNumber = '" + data.PersonelPhoneNumber + "',";
        isDataProvided = true;
      }

      if(data.PersonelEmail) {
        sql += " PersonelEmail = '" + data.PersonelEmail + "',";
        isDataProvided = true;
      }

      if(data.PersonelPassword) {
        sql += " PersonelPassword = '" + data.PersonelPassword + "',";
        isDataProvided = true;
      }

      sql = sql.slice(0, -1);
      sql += " WHERE PersonelID = '" + data.personelID + "'";

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
