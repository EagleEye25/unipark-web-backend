var sqlDB = require("mssql");
var settings = require("../settings");

// function to be used on other methods to interact with the database
exports.executeSql = function (sql, callback) {
  var conn = new sqlDB.ConnectionPool(settings.dbConfig);

  conn.connect()
    .then(function() {
      var req = new sqlDB.Request(conn);
      req.query(sql)
      .then(data => callback(data.recordset))
      .catch(callback)
    })
    .catch(callback);
};
