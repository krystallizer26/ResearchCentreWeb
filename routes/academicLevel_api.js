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
var Return_control = require('../controller/return_control.js');

//Model
var AcademicLevel = require('../model/academicLevel_model.js');

//Controller
var AcademicLevel_Control = require("../controller/academicLevel_control.js");

router.post('/newAcademicLevel', function (request, response) {
    var methodCode = "16";

    var requiredData = [];
    requiredData.push(request.body.academicLevelName_TH);
    requiredData.push(request.body.academicLevelName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                var academicLevel = new AcademicLevel();
                academicLevel.academicLevelName_TH = request.body.academicLevelName_TH;
                academicLevel.academicLevelName_EN = request.body.academicLevelName_EN;
                AcademicLevel_Control.newAcademicLevel(academicLevel, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCodeAndData(ReturnCode.success, "New AcademicLevel was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editAcademicLevel/', function (request, response) {
    var methodCode = "17";

    var requiredData = [];
    requiredData.push(request.body.academicLevelId);
    requiredData.push(request.body.academicLevelName_TH);
    requiredData.push(request.body.academicLevelName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.academicLevelId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(request.body.academicLevelId), this);
            }, function (code, err, result) {
                if (code != "182") {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    var academicLevel = new AcademicLevel();
                    academicLevel.academicLevelName_TH = request.body.academicLevelName_TH;
                    academicLevel.academicLevelName_EN = request.body.academicLevelName_EN;
                    AcademicLevel_Control.updateAcademicLevelByID(new ObjectId(request.body.academicLevelId), academicLevel, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "AcademicLevel with _id: " + request.body.academicLevelId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllAcademicLevel/', function (request, response) {
    var methodCode = "18";

    flow.exec(
        function () {
            AcademicLevel_Control.getAllAcademicLevel(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_control.responseWithCodeAndData("999999", "get All AcademicLevel Completed", functionCallback, response)
            }
        }
    );

});

router.post('/getAcademicLevelfromID/', function (request, response) {
    var methodCode = "19";

    var requiredData = [];
    requiredData.push(request.body.academicLevelId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.academicLevelId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(request.body.academicLevelId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCodeAndData("999999", "get AcademicLevel with _id " + request.body.academicLevelId + " Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/deleteAcademicLevel/', function (request, response) {
    var methodCode = "20";

    var requiredData = [];
    requiredData.push(request.body.academicLevelId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.academicLevelId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(request.body.academicLevelId), this);
            }, function (code, err, result) {
                if (code != "182") {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    AcademicLevel_Control.deleteAcademicLevelByID(new ObjectId(request.body.academicLevelId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "AcademicLevel with _id: " + request.body.academicLevelId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------