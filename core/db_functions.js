var http = require("http");
var emp = require("../controllers/employee");
var settings = require("../settings")
var httpMsgs = require("../core/httpMsgs");
var personel = require("../controllers/personel");
var parking = require("../controllers/parking");
var infringements = require('../controllers/ingringements');

// regexp to specifiy urls
var regex = "[a-z][0-9]+";
var pattSpecified = new RegExp("/personnel/specified/" + regex);
var pattLogin = "/personnel/login";

var pattParkingSpec = new RegExp("/parking/assigned/" + regex);
var pattParkingInfoRequest = new RegExp("/parking/request/info/" + regex);
var pattIngringements = new RegExp("/infringements/" + regex);
var pattRequestsSpecified = new RegExp("/personnel/requests/" + regex);
var pattCancelReq = new RegExp("/request/cancel" + regex);
var personelID;

// Does request for url sent
exports.doGetRequest = function(req, resp) {  
  // runs through all possibilities of urls (Get requests)
  console.info(req.url)
  if (req.url === "/") {
    httpMsgs.showHome(req, resp);
  }
  else if (req.url === "/personnel") {
    personel.getPersonel(req, resp);
  } else if (pattSpecified.test(req.url)) {
    getPersonelSpecified(req, resp);
  } else if (pattIngringements.test(req.url)) {
    getUserInfringements(req, resp);
  } else if (req.url === "/parking/requests") {
    parking.getParkingRequests(req, resp);
  } else if (pattParkingInfoRequest.test(req.url)) {
    getParkingRequestsSpecified(req, resp);
  } else if (pattParkingSpec.test(req.url)) {
    getParkingSpecified(req, resp);
  } else if (pattRequestsSpecified.test(req.url)) {
    getPersonnelRequests(req, resp);
  } else if (pattCancelReq.test(req.url)) {
    cancelRequest(req, resp);
  } else {
    httpMsgs.show404(req, resp);
  }
};

/*
// Post info associated to personnel, info supplied
exports.doPostRequest = function(req, resp) {  
  // runs through all possibilities of urls for personnel
  console.info(req.url);
};
*/

// inserts data to database
exports.insert = function(req, resp) {
  if ([pattLogin, "/request-parking"].includes(req.url)) {
    var reqbody = '';
    req.on("data", function(data) {
      reqbody += data;
      if (reqbody.length > 1e7) {
        httpMsgs.show413(req, resp);
      }
    });
    req.on("end", function() {
      if (pattLogin === req.url) {
        authenticatePersonel(req, resp, reqbody)
      } else {
        parking.requestParking(req, resp, reqbody);
      }
    });
  } else {
    httpMsgs.show404(req, resp);
  }
};

// Updates data to database
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

// gets personnel login info, tests front end data
authenticatePersonel = function(req, resp, reqbody) {
  try {
    reqdata = reqbody ? JSON.parse(reqbody) : null;

    if (reqdata && reqdata.facilityNo && reqdata.password) {
      personel.fetchLoginInfo(reqdata.facilityNo, function(data, err) {
        if (err) {
          httpMsgs.show500(req, resp, err);
        } else if (data[0] && data[0].PersonnelPassword === reqdata.password) {
          httpMsgs.sendJson(req, resp, 'Login Successful!');
        } else {
          httpMsgs.show500(req, resp, 'Login Failed!');
        }
     });
    } else {
      httpMsgs.show500(req, resp, err);
    }
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};
// FUNCTIONS TO PERFORM ACTIONS

// gets specified personnel info
getPersonelSpecified = function(req, resp) {
  if (pattSpecified.test(req.url)) {
    patt = new RegExp(regex);
    personelID = patt.exec(req.url);
    personelID = "'"+personelID+"'";
    personel.getUserInfo(req, resp, personelID);
  } else {
    httpMsgs.show404(req, resp);
  }
};

// PARKING FUNCTIONS
// gets specified user info
getParkingSpecified = function(req, resp) {
  if (pattParkingSpec.test(req.url)) {
    patt = new RegExp(regex);
    personelID = patt.exec(req.url);
    personelID = "'"+personelID+"'";
    parking.getAssignedParking(req, resp, personelID);
  } else {
    httpMsgs.show404(req, resp);
  }
};

// gets specified personnel info
cancelRequest = function(req, resp) {
  if (pattCancelReq.test(req.url)) {
    patt = new RegExp(regex);
    personelID = patt.exec(req.url);
    personelID = "'"+personelID+"'";
    parking.cancelRequest(req, resp, personelID);
  } else {
    httpMsgs.show404(req, resp);
  }
};

// gets parking requests from specifed user
getParkingRequestsSpecified = function(req, resp) {
  if (pattParkingInfoRequest.test(req.url)) {
    patt = new RegExp(regex);
    personelID = patt.exec(req.url);
    personelID = "'"+personelID+"'";
    parking.getParkingRequestInfoSpecified(req, resp, personelID);
  } else {
    httpMsgs.show404(req, resp);
  }
};

// gets user infringements
getUserInfringements = function(req, resp) {
  if (pattIngringements.test(req.url)) {
    patt = new RegExp(regex);
    personelID = patt.exec(req.url);
    personelID = "'"+personelID+"'";
    infringements.getUserIngringements(req, resp, personelID);
  } else {
    httpMsgs.show404(req, resp);
  }
};

// gets user requests
getPersonnelRequests = function(req, resp) {
  if (pattRequestsSpecified.test(req.url)) {
    patt = new RegExp(regex);
    personelID = patt.exec(req.url);
    personelID = "'"+personelID+"'";
    parking.getRequestSpecified(req, resp, personelID);
  } else {
    httpMsgs.show404(req, resp);
  }
};
