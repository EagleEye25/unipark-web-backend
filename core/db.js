var sqlDB = require("mssql");
var settings = require("../settings");

// function to be used on other methods to interact with the database
exports.executeSql = function (sql, callback) {
  var conn = new sqlDB.ConnectionPool(settings.dbConfig);

  conn.connect()
    .then(function() {
      var req = new sqlDB.Request(conn);
      req.query(sql)
      .then(function(recordset) {
        callback(recordset);
      })
      .catch(function(err) {
        console.log(err);
        callback(null, err);
      })
    })
    .catch(function(err) {
      console.log(err);
      callback(null, err);
    });
};
