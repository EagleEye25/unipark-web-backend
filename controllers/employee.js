var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.getList = function(req, resp) {
  db.executeSql("SELECT * FROM Employee", function(data, err) {
    if (err) {
      httpMsgs.show500(req, resp, err)
    } else {
      httpMsgs.sendJson(req, resp, data);
    }
    resp.end();
  });
};

exports.getWithParam = function(req, resp, empNo) {
  db.executeSql("SELECT * FROM Employee WHERE Empno=" + empNo, function(data, err) {
    if (err) {
      httpMsgs.show500(req, resp, err);
    } else {
      httpMsgs.sendJson(req, resp, data);
    }
  });
};

exports.add = function(req, resp, reqBody) {
  try {
    if (!reqBody) throw new Error("Input not valid");
    var data = JSON.parse(reqBody);
    if (data) {
      var sql = "INSERT INTO emp (empno, empname, salary, deptno) VALUES ";
      sql+= util.format("(%d, '%s', %d, %d)", data.empNo, data.empName, data.salary, data.deptno);

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

exports.add = function(req, resp, reqBody) {

};

exports.update = function(req, resp, reqBody) {

};

exports.delete = function(req, resp, reqBody) {

};
