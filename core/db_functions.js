var http = require("http");
var emp = require("../controllers/employee");
var settings = require("../settings")
var httpMsgs = require("../core/httpMsgs");
var personel = require("../controllers/personel");

exports.getPersonelInfo = function(req, resp) {
  if (req.url === "/") {
    httpMsgs.showHome(req, resp);
  }
  else if (req.url === "/personnel") {
    personel.getPersonel(req, resp);
  } else {
    var regex = "[a-z][0-9]+";
    var patt = new RegExp("/personnel/" + regex);
    if (patt.test(req.url)) {
      patt = new RegExp(regex);
      var personelID = patt.exec(req.url);
      personelID = "'"+personelID+"'";
      personel.getUserInfo(req, resp, personelID)
    } else {
      httpMsgs.show404(req, resp);
    }
  }
  /*
  switch (req.url) {
    case "/":
      httpMsgs.showHome(req, resp);
      break;
    case "/personnel/all":
      personel.getPersonel(req, resp);
      break;
    case "/specified/": // Dont know what the input variable will be 
      var regex = "[a-z][0-9]+";
      var patt = new RegExp("/specified/" + regex);
      if (patt.test(req.url)) {
        patt = new RegExp(regex);
        var personelID = patt.exec(req.url);
        personelID = "'"+personelID+"'";
        personel.getUserInfo(req, resp, personelID)
      } else {
        httpMsgs.show404(req, resp);
      }
      break;
    case "/personnel/login" : // Dont know what the input variable will be 
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
      break;
  }*/    
};

exports.getPersonelLogin = function (req, resP) {
  if (req.url === "/personnel/login") {
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
  }
};

exports.insert = function(req, resp) {
  if (req.url === "/personnel") {
    var reqbody = '';
    req.on("data", function(data) {
      reqbody += data;
      if (reqbody.length > 1e7) {
        httpMsgs.show413(req, resp);
      }
    });
    req.on("end", function() {
      emp.add(req, resp, reqbody);
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