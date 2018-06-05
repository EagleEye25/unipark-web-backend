var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs")

exports.getAssignedParking = function(req, resp, parkingID) {
  db.executeSql("uspSpecificAssigned" + parkingID, function(data, err) {
    if (err) {
      httpMsgs.show500(req, resp, err)
    } else {
      httpMsgs.sendJson(req, resp, data);
    }
    resp.end();
  });
};

exports.requestParking = function(req, resp, reqBody) {
  try {
    if (!reqBody) throw new Error("Input not valid");
    var data = JSON.parse(reqBody);
    if (data) {
      var sql = "INSERT INTO  () VALUES ";
      sql+= util.format("(%d, '%s', %d, %d)", data.ParkingArea, data.ParkingSpot);

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
