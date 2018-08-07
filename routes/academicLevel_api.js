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
let AcademicLevel = require('../model/academicLevel_model.js');

//Controller
let AcademicLevel_Control = require("../controller/academicLevel_control.js");

router.post('/newAcademicLevel', function (request, response) {
    let methodCode = "16";

    let requiredData = [];
    requiredData.push(request.body.academicLevelName_TH);
    requiredData.push(request.body.academicLevelName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                let academicLevel = new AcademicLevel();
                academicLevel.academicLevelName_TH = request.body.academicLevelName_TH;
                academicLevel.academicLevelName_EN = request.body.academicLevelName_EN;
                AcademicLevel_Control.newAcademicLevel(academicLevel, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New AcademicLevel was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editAcademicLevel/', function (request, response) {
    let methodCode = "17";

    let requiredData = [];
    requiredData.push(request.body.academicLevelId);
    requiredData.push(request.body.academicLevelName_TH);
    requiredData.push(request.body.academicLevelName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.academicLevelId);
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
                AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(request.body.academicLevelId), this);
            }, function (code, err, result) {
                if (code != "182") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    let academicLevel = new AcademicLevel();
                    academicLevel.academicLevelName_TH = request.body.academicLevelName_TH;
                    academicLevel.academicLevelName_EN = request.body.academicLevelName_EN;
                    AcademicLevel_Control.updateAcademicLevelByID(new ObjectId(request.body.academicLevelId), academicLevel, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "AcademicLevel with _id: " + request.body.academicLevelId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllAcademicLevel/', function (request, response) {
    let methodCode = "18";

    flow.exec(
        function () {
            AcademicLevel_Control.getAllAcademicLevel(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData("999999", "get All AcademicLevel Completed", functionCallback, response)
            }
        }
    );

});

router.post('/getAcademicLevelfromID/', function (request, response) {
    let methodCode = "19";

    let requiredData = [];
    requiredData.push(request.body.academicLevelId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.academicLevelId);
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
                AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(request.body.academicLevelId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData("999999", "get AcademicLevel with _id " + request.body.academicLevelId + " Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/deleteAcademicLevel/', function (request, response) {
    let methodCode = "20";

    let requiredData = [];
    requiredData.push(request.body.academicLevelId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.academicLevelId);
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
                AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(request.body.academicLevelId), this);
            }, function (code, err, result) {
                if (code != "182") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    AcademicLevel_Control.deleteAcademicLevelByID(new ObjectId(request.body.academicLevelId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "AcademicLevel with _id: " + request.body.academicLevelId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------