var express = require('express');
var router = express.Router();

// DATABASE SETUP
var ObjectId = require('mongodb').ObjectId;


//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests
router.use(function (req, res, next) {
    console.log("\n** Request detected >> " + JSON.stringify(req.body));
    next();
});

//Must use
var flow = require('../services/flow.js')
var ReturnCode = require('../model/returnCode.js');
var Validate = require("../controller/validation_controller.js");
var Return_Control = require('../controller/return_control.js');

//Model
var Keyword = require('../model/keyword_model.js');

//Controller
var Keyword_Control = require("../controller/keyword_control.js");

router.post('/newKeyword', function (request, response) {
    var methodCode = "11";

    var requiredData = [];
    requiredData.push(request.body.keywordName_TH);
    requiredData.push(request.body.keywordName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                var keyword = new Keyword();
                keyword.keywordName_TH = request.body.keywordName_TH;
                keyword.keywordName_EN = request.body.keywordName_EN;
                Keyword_Control.newKeyword(keyword, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New Keyword was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editKeyword/', function (request, response) {
    var methodCode = "12";

    var requiredData = [];
    requiredData.push(request.body.keywordId);
    requiredData.push(request.body.keywordName_TH);
    requiredData.push(request.body.keywordName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.keywordId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Keyword_Control.checkKeywordByID(new ObjectId(request.body.keywordId), this);
            }, function (code, err, result) {
                if (code != "132") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    var keyword = new Keyword();
                    keyword.keywordName_TH = request.body.keywordName_TH;
                    keyword.keywordName_EN = request.body.keywordName_EN;
                    Keyword_Control.updateKeywordByID(new ObjectId(request.body.keywordId), keyword, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Keyword with _id: " + request.body.keywordId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllKeyword/', function (request, response) {
    var methodCode = "13";

    flow.exec(
        function () {
            Keyword_Control.getAllKeyword(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData("999999", "get All Keyword Completed", functionCallback, response)
            }
        }
    );

});

router.post('/getKeywordfromID/', function (request, response) {
    var methodCode = "14";

    var requiredData = [];
    requiredData.push(request.body.keywordId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.keywordId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Keyword_Control.checkKeywordByID(new ObjectId(request.body.keywordId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData("999999", "get Keyword with _id " + request.body.keywordId + " Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/deleteKeyword/', function (request, response) {
    var methodCode = "15";

    var requiredData = [];
    requiredData.push(request.body.keywordId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.keywordId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Keyword_Control.checkKeywordByID(new ObjectId(request.body.keywordId), this);
            }, function (code, err, result) {
                if (code != "132") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Keyword_Control.deleteKeywordByID(new ObjectId(request.body.keywordId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Keyword_Control with _id: " + request.body.keywordId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------