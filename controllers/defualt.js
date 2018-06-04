var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs")

exports.getUserInfo = function(req, resp) {
  try {
    db.executeSql("uspSearchPersonel", function(data, err) {
      if (err) {
        httpMsgs.show500(req, resp, err);
      } else {
        httpMsgs.send200(req, resp);
      }
    });

  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};


exports.add = function(req, resp, reqBody) {

};

exports.update = function(req, resp, reqBody) {

};

exports.delete = function(req, resp, reqBody) {

};
