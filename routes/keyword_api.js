let express = require('express');
let router = express.Router();

// DATABASE SETUP
let ObjectId = require('mongodb').ObjectId;


//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests

//Must use
let flow = require('../services/flow.js')
let ReturnCode = require('../model/returnCode.js');
let Validate = require("../controller/validation_controller.js");
let Return_Control = require('../controller/return_control.js');

//Model
let Keyword = require('../model/keyword_model.js');

//Controller
let Keyword_Control = require("../controller/keyword_control.js");

router.post('/newKeyword', function (request, response) {
    let methodCode = "11";

    let requiredData = [];
    requiredData.push(request.body.keywordName_TH);
    requiredData.push(request.body.keywordName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                let keyword = new Keyword();
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
    let methodCode = "12";

    let requiredData = [];
    requiredData.push(request.body.keywordId);
    requiredData.push(request.body.keywordName_TH);
    requiredData.push(request.body.keywordName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.keywordId);
    let objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        let alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
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
                    let keyword = new Keyword();
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
    let methodCode = "13";

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
    let methodCode = "14";

    let requiredData = [];
    requiredData.push(request.body.keywordId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.keywordId);
    let objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        let alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
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
    let methodCode = "15";

    let requiredData = [];
    requiredData.push(request.body.keywordId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.keywordId);
    let objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        let alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
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