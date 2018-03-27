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
var Return_Control = require('../controller/return_control.js');

//Model
var Researcher = require('../model/researcher_model.js');

//Controller
var Researcher_Control = require("../controller/researcher_control.js");
var Position_Control = require("../controller/position_control.js");
var Keyword_Control = require("../controller/keyword_control.js");
var AcademicLevel_Control = require("../controller/academicLevel_control.js");
var Department_Control = require("../controller/department_control.js");
var BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
var MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
var DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");

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
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!booleanReady) {
        var alert = "Input Not Valid, check if some data is not boolean."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "002", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else if (!numberReady) {
        var alert = "Input Not Valid, check if some data must contain only numeric character."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "004", alert, response)
    }
    else if (request.body.personalID.length != 13) {
        var alert = "Input Not Valid, check if personalId is in a correct pattern. (13 numeric-only character)"
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "005", alert, response)
    }
    else {
        flow.exec(
            function () {
                Department_Control.checkDepartmentByID(new ObjectId(request.body.departmentId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Position_Control.checkPositionByID(new ObjectId(request.body.positionId), this);
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(request.body.academicLevelId), this);
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
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
                    researcher.researcherPic = request.body.researcherPic;
                    Researcher_Control.newResearcher(researcher, this);
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New Researcher was saved successfully as _id defined", functionCallback._id, response);
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
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else if (!(request.body.academicLevel == "Bachelor" || request.body.academicLevel == "Master" || request.body.academicLevel == "Doctory" || request.body.academicLevel == "0")) {
        var alert = "Input Not Valid, not expected academicLevel."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "005", alert, response)
    }
    else {
        flow.exec(
            function () {
                var query = {};
                if (request.body.academicLevel == "Bachelor") {
                    query = {
                        "_id": true,
                        "bachelorTeachingDepartmentId": true,
                        "bachelor_AcademicYear": true,
                        "bachelor_FacultyBoard_Comment": true,
                        "bachelor_FacultyBoard_Time": true,
                        "bachelor_CouncilBoard_Comment": true,
                        "bachelor_CouncilBoard_Time": true,
                        "bachelor_InstituteBoard_Comment": true,
                        "bachelor_InstituteBoard_Time": true
                    }
                }
                else if (request.body.academicLevel == "Master") {
                    query = {
                        "_id": true,
                        "masterTeachingDepartmentId": true,
                        "master_AcademicYear": true,
                        "master_FacultyBoard_Comment": true,
                        "master_FacultyBoard_Time": true,
                        "master_CouncilBoard_Comment": true,
                        "master_CouncilBoard_Time": true,
                        "master_InstituteBoard_Comment": true,
                        "master_InstituteBoard_Time": true
                    }
                }
                else if (request.body.academicLevel == "Doctory") {
                    query = {
                        "_id": true,
                        "doctoryTeachingDepartmentId": true,
                        "doctory_AcademicYear": true,
                        "doctory_FacultyBoard_Comment": true,
                        "doctory_FacultyBoard_Time": true,
                        "doctory_CouncilBoard_Comment": true,
                        "doctory_CouncilBoard_Time": true,
                        "doctory_InstituteBoard_Comment": true,
                        "doctory_InstituteBoard_Time": true
                    }
                }
                else if (request.body.academicLevel == "0") {
                    query = {
                        "_Id": true,
                        "bachelorTeachingDepartmentId": true,
                        "bachelor_AcademicYear": true,
                        "bachelor_FacultyBoard_Comment": true,
                        "bachelor_FacultyBoard_Time": true,
                        "bachelor_CouncilBoard_Comment": true,
                        "bachelor_CouncilBoard_Time": true,
                        "bachelor_InstituteBoard_Comment": true,
                        "bachelor_InstituteBoard_Time": true,

                        "masterTeachingDepartmentId": true,
                        "master_AcademicYear": true,
                        "master_FacultyBoard_Comment": true,
                        "master_FacultyBoard_Time": true,
                        "master_CouncilBoard_Comment": true,
                        "master_CouncilBoard_Time": true,
                        "master_InstituteBoard_Comment": true,
                        "master_InstituteBoard_Time": true,

                        "doctoryTeachingDepartmentId": true,
                        "doctory_AcademicYear": true,
                        "doctory_FacultyBoard_Comment": true,
                        "doctory_FacultyBoard_Time": true,
                        "doctory_CouncilBoard_Comment": true,
                        "doctory_CouncilBoard_Time": true,
                        "doctory_InstituteBoard_Comment": true,
                        "doctory_InstituteBoard_Time": true
                    }
                }
                Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), query, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "Get Researcher's bachelor teaching data completed", functionCallback, response);
                }
            }
        );
    }
});

router.post('/editResearcherTeaching', function (request, response) {
    var methodCode = "38";

    var requiredData = [];
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.academicLevel);
    requiredData.push(request.body.teachingDepartmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.researcherId);
    objectIdData.push(request.body.teachingDepartmentId);
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
    else if (!(request.body.academicLevel == "Bachelor" || request.body.academicLevel == "Master" || request.body.academicLevel == "Doctory")) {
        var alert = "Input Not Valid, not expected academicLevel."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "005", alert, response)
    }
    else {
        flow.exec(
            function () {
                var query = { "_Id": true };
                Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), query, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    var query = {};
                    if (request.body.academicLevel == "Bachelor") {
                        BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(request.body.teachingDepartmentId), this);
                    }
                    else if (request.body.academicLevel == "Master") {
                        MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(request.body.teachingDepartmentId), this);
                    }
                    else if (request.body.academicLevel == "Doctory") {
                        DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(request.body.teachingDepartmentId), this);
                    }
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    let query = {};
                    if (request.body.academicLevel == "Bachelor") {
                        query = {
                            $set: {
                                "bachelorTeachingDepartmentId": request.body.teachingDepartmentId,
                                "bachelor_AcademicYear": request.body.academicYear,
                                "bachelor_FacultyBoard_Comment": request.body.facultyBoardComment,
                                "bachelor_FacultyBoard_Time": request.body.facultyBoardTime,
                                "bachelor_CouncilBoard_Comment": request.body.councilBoardComment,
                                "bachelor_CouncilBoard_Time": request.body.councilBoardTime,
                                "bachelor_InstituteBoard_Comment": request.body.institutionBoardComment,
                                "bachelor_InstituteBoard_Time": request.body.instituteBoardTime,
                                "editedDate": Date.now()
                            }
                        }
                    }
                    else if (request.body.academicLevel == "Master") {
                        query = {
                            $set: {
                                "masterTeachingDepartmentId": request.body.teachingDepartmentId,
                                "master_AcademicYear": request.body.academicYear,
                                "master_FacultyBoard_Comment": request.body.facultyBoardComment,
                                "master_FacultyBoard_Time": request.body.facultyBoardTime,
                                "master_CouncilBoard_Comment": request.body.councilBoardComment,
                                "master_CouncilBoard_Time": request.body.councilBoardTime,
                                "master_InstituteBoard_Comment": request.body.institutionBoardComment,
                                "master_InstituteBoard_Time": request.body.instituteBoardTime,
                                "editedDate": Date.now()
                            }
                        }
                    }
                    else if (request.body.academicLevel == "Doctory") {
                        query = {
                            $set: {
                                "doctoryTeachingDepartmentId": request.body.teachingDepartmentId,
                                "doctory_AcademicYear": request.body.academicYear,
                                "doctory_FacultyBoard_Comment": request.body.facultyBoardComment,
                                "doctory_FacultyBoard_Time": request.body.facultyBoardTime,
                                "doctory_CouncilBoard_Comment": request.body.councilBoardComment,
                                "doctory_CouncilBoard_Time": request.body.councilBoardTime,
                                "doctory_InstituteBoard_Comment": request.body.institutionBoardComment,
                                "doctory_InstituteBoard_Time": request.body.instituteBoardTime,
                                "editedDate": Date.now()
                            }
                        }
                    }
                    Researcher_Control.updateResearcherByID(new ObjectId(request.body.researcherId), query, this);
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Update Researcher's Teaching Complete", response);
                }
            }
        );
    }
});

router.post('/editResearcher/', function (request, response) {
    var methodCode = "39";

    var requiredData = [];
    requiredData.push(request.body.researcherId);
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
    objectIdData.push(request.body.researcherId);
    objectIdData.push(request.body.academicLevelId);
    objectIdData.push(request.body.departmentId);
    objectIdData.push(request.body.positionId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    var numberData = [];
    numberData.push(request.body.personalID);
    var numberReady = Validate.numberData_Check(numberData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!booleanReady) {
        var alert = "Input Not Valid, check if some data is not boolean."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "002", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else if (!numberReady) {
        var alert = "Input Not Valid, check if some data must contain only numeric character."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "004", alert, response)
    }
    else if (request.body.personalID.length != 13) {
        var alert = "Input Not Valid, check if personalId is in a correct pattern. (13 numeric-only character)"
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "005", alert, response)
    }
    else {
        flow.exec(
            function () {
                Department_Control.checkDepartmentByID(new ObjectId(request.body.departmentId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Position_Control.checkPositionByID(new ObjectId(request.body.positionId), this);
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(request.body.academicLevelId), this);
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    let query = { "_id": true }
                    Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), query, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    let query = {
                        $set: {
                            "researcherName_TH": request.body.researcherName_TH,
                            "researcherName_EN": request.body.researcherName_EN,
                            "personalID": request.body.personalID,
                            "birthDate": request.body.birthDate,
                            "departmentId": request.body.departmentId,
                            "positionId": request.body.positionId,
                            "academicLevelId": request.body.academicLevelId,
                            "bachelorGraduation": request.body.bachelorGraduation,
                            "masterGraduation": request.body.masterGraduation,
                            "doctoralGraduation": request.body.doctoralGraduation,
                            "target": request.body.target,
                            "assignDate": request.body.assignDate,
                            "retirementStatus": request.body.retirementStatus,
                            "researcherPic": request.body.researcherPic,
                            "editedDate": Date.now()
                        }
                    }
                    Researcher_Control.updateResearcherByID(new ObjectId(request.body.researcherId), query, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Researcher with _id: " + request.body.researcherId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/addKeywordToResearcher/', function (request, response) {
    var methodCode = "40";

    var requiredData = [];
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.keywordId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.researcherId);
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
                let query = { "_id": true }
                Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), query, this);
            }, function (code, err, functionCallback) {
                if (err || functionCallback == 0) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, "Researcher " + request.body.researcherId + " not found", response);
                }
                else {
                    Keyword_Control.checkKeywordByID(new ObjectId(request.body.keywordId), this);
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Researcher_Control.checkBindedKeywordwithResearcher(new ObjectId(request.body.researcherId), new ObjectId(request.body.keywordId), this);
                }
            }, function (code, err, functionCallback) {
                if (code != "393") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Researcher_Control.bindKeywordtoResearcher(new ObjectId(request.body.researcherId), new ObjectId(request.body.keywordId), this);
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Bind Researcher " + request.body.researcherId + " with Keyword " + request.body.keywordId + " completed", response);
                }
            }
        );
    }
});


router.post('/removeKeywordFromResearcher/', function (request, response) {
    var methodCode = "41";

    var requiredData = [];
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.keywordId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.researcherId);
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
                let query = { "_id": true }
                Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), query, this);
            }, function (code, err, functionCallback) {
                if (err || functionCallback == 0) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, "Researcher " + request.body.researcherId + " not found", response);
                }
                else {
                    Keyword_Control.checkKeywordByID(new ObjectId(request.body.keywordId), this);
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Researcher_Control.checkBindedKeywordwithResearcher(new ObjectId(request.body.researcherId), new ObjectId(request.body.keywordId), this);
                }
            }, function (code, err, functionCallback) {
                if (code != "392") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Researcher_Control.removeKeywordfromResearcher(new ObjectId(request.body.researcherId), new ObjectId(request.body.keywordId), this);
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Unbind Researcher " + request.body.researcherId + " with Keyword " + request.body.keywordId + " completed", response);
                }
            }
        );
    }
});

router.post('/getResearcherfromID/', function (request, response) {
    var methodCode = "42";

    var requiredData = [];
    requiredData.push(request.body.researcherId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.researcherId);
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
                let query = {}
                Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), query, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Researcher_Control.getAllResearcherDataById(functionCallback, this);
                }
            }, function (functionCallback) {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get Researcher with _id " + request.body.researcherId + " Completed", functionCallback, response)
            }
        );
    }
});

router.post('/deleteResearcher/', function (request, response) {
    var methodCode = "43";

    var requiredData = [];
    requiredData.push(request.body.researcherId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.researcherId);
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
                let query = { "_id": true }
                Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), this);
            }, function (code, err, result) {
                if (code != "382") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Researcher_Control.deleteResearcherByID(new ObjectId(request.body.researcherId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Researcher with _id: " + request.body.researcherId + " has deleted successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllResearcherPreview/', function (request, response) {
    var methodCode = "44";

    flow.exec(
        function () {
            Researcher_Control.getAllResearcherPreview(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData("999999", "get All Researcher Completed", functionCallback, response)
            }
        }
    );
});

// router.post('/getAllKeyword/', function (request, response) {
//     var methodCode = "13";

//     flow.exec(
//         function () {
//             Keyword_Control.getAllKeyword(this);
//         }, function (code, err, functionCallback) {
//             if (err) {
//                 Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
//             }
//             else {
//                 Return_Control.responseWithCodeAndData("999999", "get All Keyword Completed", functionCallback, response)
//             }
//         }
//     );

// });
module.exports = router;

//-----------------------------------------------------------------------------