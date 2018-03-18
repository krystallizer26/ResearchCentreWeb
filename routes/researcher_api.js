var express = require('express');
var router = express.Router();

// DATABASE SETUP
var ObjectId = require('mongodb').ObjectId;


//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests

//Must use
var flow = require('../services/flow.js')
var ReturnCode = require('../model/returnCode.js');
var Validate = require("../controller/validation_controller.js");
var Return_control = require('../controller/return_control.js');

//Model
var Researcher = require('../model/researcher_model.js');

//Controller
var Researcher_Control = require("../controller/researcher_control.js");
var Position_Control = require("../controller/position_control.js");
var Keyword_Control = require("../controller/keyword_control.js");
var AcademicLevel_Control = require("../controller/academicLevel_control.js");
var Department_Control = require("../controller/department_control.js");

router.post('/newResearcher', function (request, response) {
    var methodCode = "36";

    var requiredData = [];
    requiredData.push(request.body.researcherName_TH);
    requiredData.push(request.body.researcherName_EN);
    requiredData.push(request.body.personalID);
    requiredData.push(request.body.departmentId);
    requiredData.push(request.body.positionId);
    requiredData.push(request.body.academicLevelId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var booleanData = [];
    booleanData.push(request.body.retirementStatus);
    var booleanReady = Validate.booleanData_Check(booleanData)

    var objectIdData = [];
    objectIdData.push(request.body.departmentId);
    objectIdData.push(request.body.positionId);
    objectIdData.push(request.body.academicLevelId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    var numberData = [];
    numberData.push(request.body.personalID);
    var numberReady = Validate.numberData_Check(numberData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!booleanReady) {
        var alert = "Input Not Valid, check if some data is not boolean."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "002", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else if (!numberReady) {
        var alert = "Input Not Valid, check if some data must contain only numeric character."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "004", alert, response)
    }
    else if (request.body.personalID.length != 13) {
        var alert = "Input Not Valid, check if personalId is in a correct pattern. (13 numeric-only character)"
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "005", alert, response)
    }
    else {
        flow.exec(
            function () {
                Department_Control.checkDepartmentByID(new ObjectId(request.body.departmentId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Position_Control.checkPositionByID(new ObjectId(request.body.positionId), this);
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(request.body.academicLevelId), this);
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    var researcher = new Researcher();
                    researcher.researcherName_TH = request.body.researcherName_TH;
                    researcher.researcherName_EN = request.body.researcherName_EN;
                    researcher.personalID = request.body.personalID;
                    researcher.birthDate = request.body.birthDate;
                    researcher.departmentId = request.body.departmentId;
                    researcher.positionId = request.body.positionId;
                    researcher.academicLevelId = request.body.academicLevelId;
                    researcher.bachelorGraduation = request.body.bachelorGraduation;
                    researcher.masterGraduation = request.body.masterGraduation;
                    researcher.doctoralGraduation = request.body.doctoralGraduation;
                    researcher.assignDate = request.body.assignDate;
                    researcher.retirementStatus = request.body.retirementStatus;
                    Researcher_Control.newResearcher(researcher,this);
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCodeAndData(ReturnCode.success, "New Researcher was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/getResearcherTeaching', function (request, response) {
    var methodCode = "37";

    var requiredData = [];
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.academicLevel);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.researcherId);
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
    else if (request.body.academicLevel != "Bachelor" || request.body.academicLevel != "Master" || request.body.academicLevel != "Doctory") {
        var alert = "Input Not Valid, not expected academicLevel."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "005", alert, response)
    }
    else {
        flow.exec(
            function () {
                var query = {};
                if(request.body.academicLevel == "Bachelor"){
                    query = {"_Id":true, "bachelorTeachingDepartmentId":true, "bachelor_AcademicYear":true, "bachelor_FacultyBoard_Comment":true, "bachelor_FacultyBoard_Time":true, "bachelor_CouncilBoard_Comment":true, "bachelor_CouncilBoard_Time":true, "bachelor_InstituteBoard_Comment":true, "bachelor_InstituteBoard_Time":true}
                }
                else if(request.body.academicLevel == "Master"){
                    query = {"_Id":true, "masterTeachingDepartmentId":true, "master_AcademicYear":true, "master_FacultyBoard_Comment":true, "master_FacultyBoard_Time":true, "master_CouncilBoard_Comment":true, "master_CouncilBoard_Time":true, "master_InstituteBoard_Comment":true, "master_InstituteBoard_Time":true}
                }
                else if(request.body.academicLevel == "Doctory"){
                    query = {"_Id":true, "doctoryTeachingDepartmentId":true, "doctory_AcademicYear":true, "doctory_FacultyBoard_Comment":true, "doctory_FacultyBoard_Time":true, "doctory_CouncilBoard_Comment":true, "doctory_CouncilBoard_Time":true, "doctory_InstituteBoard_Comment":true, "doctory_InstituteBoard_Time":true}
                }
                Researcher_Control.getResearcherTeachingByID(new ObjectId(request.body.researcherId),query, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    functionCallback["Level"] = request.body.academicLevel;
                    Return_control.responseWithCodeAndData(ReturnCode.success, "Get Researcher's bachelor teaching data completed", functionCallback, response);
                }
            }
        );
    }
});
module.exports = router;

//-----------------------------------------------------------------------------