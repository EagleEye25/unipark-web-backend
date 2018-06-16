var http = require("http");
var emp = require("../controllers/employee");
var settings = require("../settings")
var httpMsgs = require("../core/httpMsgs");
var personel = require("../controllers/personel");
var parking = require("../controllers/parking");

// regexp to specifiy urls
var regex = "[a-z][0-9]+";
var pattSpecified = new RegExp("/personnel/specified/" + regex);
var pattLogin = "/personnel/login";

var pattParkingSpec = new RegExp("/parking/assigned/" + regex);
var pattParkingInfoRequest = new RegExp("/parking/request/info/" + regex);
var personelID;

// Gets info associated to personnel, info supplied
exports.doGetRequest = function(req, resp) {  
  // runs through all possibilities of urls for personnel
  console.info(req.url)
  if (req.url === "/") {
    httpMsgs.showHome(req, resp);
  }
  else if (req.url === "/personnel") {
    personel.getPersonel(req, resp);
  } else if (pattSpecified.test(req.url)) {
    getPersonelSpecified(req, resp);
  }
};
// Post info associated to personnel, info supplied
exports.doPostRequest = function(req, resp) {  
  // runs through all possibilities of urls for personnel
  console.info(req.url);
};

// runs through url possiblities for parking 
exports.getRequestParkingInfo = function(req, resp) { 
  if (req.url === "/parking/requests") {
    parking.getParkingRequests(req, resp);
  } else if (pattParkingInfoRequest.test(req.url)) {
    getParkingRequestsSpecified(req, resp);
  } else if (pattParkingSpec.test(req.url)) {
    getParkingSpecified(req, resp)
  } else {
    httpMsgs.show404(req, resp);
  }
};

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

//updates data to database
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

// FUNCTIONS TO PERFORM ACTIONS
// PERSONNEL FUNCTIONS
// gets personnel login info
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

// gets specified personnel info
getPersonelSpecified = function(req, resp) {
  if (pattSpecified.test(req.url)) {
    patt = new RegExp(regex);
    personelID = patt.exec(req.url);
    personelID = "'"+personelID+"'";
    personel.getUserInfo(req, resp, personelID)
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
    parking.getAssignedParking(req, resp, personelID)
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
