var http = require("http");
var emp = require("../controllers/employee");
var settings = require("../settings")
var httpMsgs = require("../core/httpMsgs");
var personel = require("../controllers/personel");
var parking = require("../controllers/parking");

// Gets info associated to personnel, info supplied
exports.getUrlInfo = function(req, resp) {
  // regexp to specifiy urls
  var regex = "[a-z][0-9]+";
  var pattSpecified = new RegExp("/personnel/specified/" + regex);
  var pattLogin = new RegExp("/personnel/login/" + regex);

  var pattParkingSpec = new RegExp("/assigned-parking/" + regex);
  
  // runs through all possibilities of urls
  if (req.url === "/") {
    httpMsgs.showHome(req, resp);
  }
  else if (req.url === "/personnel") {
    personel.getPersonel(req, resp);
  } else if (pattSpecified.test(req.url)) {
    var regex = "[a-z][0-9]+";
    var patt = new RegExp("/personnel/specified/" + regex);
    if (patt.test(req.url)) {
      patt = new RegExp(regex);
      var personelID = patt.exec(req.url);
      personelID = "'"+personelID+"'";
      personel.getUserInfo(req, resp, personelID)
    } else {
      httpMsgs.show404(req, resp);
    }
  } else if (pattLogin.test(req.url)) {
    var regex = "[a-z][0-9]+";
    var patt = new RegExp("/personnel/login/" + regex);
    if (patt.test(req.url)) {
      patt = new RegExp(regex);
      var personelID = patt.exec(req.url);
      personelID = "'"+personelID+"'";
      personel.getLoginInfo(req, resp, personelID)
    } else {
      httpMsgs.show404(req, resp);
    }
  } else if (pattParkingSpec.test(req.url)) {
    var regex = "[a-z][0-9]+";
    var patt = new RegExp("/assigned-parking/" + regex);
    if (patt.test(req.url)) {
      patt = new RegExp(regex);
      var personelID = patt.exec(req.url);
      personelID = "'"+personelID+"'";
      parking.getAssignedParking(req, resp, personelID)
    } else {
      httpMsgs.show404(req, resp);
    }
  }
};

exports.getRequestParking = function(req, resp) {  
    parking.getParkingRequests(req, resp);
};

exports.insert = function(req, resp) {
  if (req.url === "/request-parking") {
    var reqbody = '';
    req.on("data", function(data) {
      reqbody += data;
      if (reqbody.length > 1e7) {
        httpMsgs.show413(req, resp);
      }
    });
    req.on("end", function() {
      parking.requestParking(req, resp, reqbody);
    });
  } else {
    httpMsgs.show404(req, resp);
  }
};

exports.update = function(req, resp) {
  if (req.url === "/personnel/update") {
    var reqbody = '';
    req.on("data", function(data) {
      reqbody += data;
      if (reqbody.length > 1e7) {
        httpMsgs.show413(req, resp);
      }
    });
    req.on("end", function() {
      personel.updateUserInfo(req, resp, reqbody);
    });
  } else {
    httpMsgs.show404(req, resp);
  }
};