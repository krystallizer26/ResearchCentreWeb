var express = require('express');
var router = express.Router();

// DATABASE SETUP
var ObjectId = require('mongodb').ObjectId;

//Must use
var flow = require('../services/flow.js')
var ReturnCode = require('../model/returnCode.js');
var Validate = require("../controller/validation_controller.js");
var Return_Control = require('../controller/return_control.js');

//Model
var ResearcherTraining = require('../model/researcherTraining_model.js');

//Controller
var Researcher_Control = require("../controller/researcher_control.js");
var Position_Control = require("../controller/position_control.js");
var Keyword_Control = require("../controller/keyword_control.js");
var AcademicLevel_Control = require("../controller/academicLevel_control.js");
var Department_Control = require("../controller/department_control.js");
var BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
var MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
var DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");
var Publication_Control = require("../controller/publication_control.js");
var ResearcherTraining_Control = require("../controller/researcherTraining_control.js");

router.post('/newResearcherTraining_EachScrap', function (request, response) {
    var methodCode = "79";

    var requiredData = [];
    requiredData.push(request.body.researcherName);
    var requiredReady = Validate.requiredData_Check(requiredData);

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                var researcherTraining = new ResearcherTraining();
                researcherTraining.researcherName = Validate.scrappingCleanUp(request.body.researcherName)
                researcherTraining.researcherPersonalID = Validate.scrappingCleanUp(request.body.researcherPersonalID)
                researcherTraining.researchTopic = Validate.scrappingCleanUp(request.body.researchTopic)
                researcherTraining.trainingName = Validate.scrappingCleanUp(request.body.trainingName)
                researcherTraining.trainingType = Validate.scrappingCleanUp(request.body.trainingType)
                researcherTraining.trainingLevel = Validate.scrappingCleanUp(request.body.trainingLevel)
                researcherTraining.trainingYear = Validate.scrappingCleanUp(request.body.trainingYear)
                researcherTraining.trainingStartDate = Validate.scrappingCleanUp(request.body.trainingStartDate)
                researcherTraining.trainingFinishDate = Validate.scrappingCleanUp(request.body.trainingFinishDate)
                researcherTraining.trainingLocation = Validate.scrappingCleanUp(request.body.trainingLocation)
                researcherTraining.scholarshipType = Validate.scrappingCleanUp(request.body.scholarshipType)
                researcherTraining.scholarshipLimit = Validate.scrappingCleanUp(request.body.scholarshipLimit)
                researcherTraining.orderCode = Validate.scrappingCleanUp(request.body.orderCode)
                researcherTraining.approveDate = Validate.scrappingCleanUp(request.body.approveDate)
                researcherTraining.researcherName = Validate.scrappingCleanUp(request.body.researcherName)
                
                ResearcherTraining_Control.newResearcherTraining_fromScrap(researcherTraining, this);

            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New Publication was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/getAllResearcherTrainingPreview/', function (request, response) {
    var methodCode = "80";

    flow.exec(
        function () {
            ResearcherTraining_Control.getAllResearcherTrainingPreview(this);
        }, function (code, err, functionCallback) {
            if (code === "841") {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else if (code === "842") {
                ResearcherTraining_Control.getAllFullResearcherTrainingDataPreview(functionCallback, this);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "No ResearcherTraining Founded", [], response)
            }
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get All ResearcherTraining Completed", functionCallback, response)
            }
        }
    );
});

router.post('/getAllResearcherTrainingPreviewByResearcherId/', function (request, response) {
    var methodCode = "81";

    var requiredData = [];
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.limit);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var numberData = [];
    numberData.push(request.body.limit);
    var numberReady = Validate.numberData_Check(numberData)

    var objectData = [];
    objectData.push(request.body.researcherId);
    var objectReady = Validate.objectIDData_Check(objectData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required.";
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!numberReady) {
        let alert = "Input Not Valid, check if some data have to be number.";
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "002", alert, response)
    }
    else if (!objectReady) {
        let alert = "Input Not Valid, check if some data have to be MongoDB ObjectId.";
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                ResearcherTraining_Control.getAllResearcherTrainingPreviewByResearcherId(request.body.researcherId, parseInt(request.body.limit), this);
            }, function (code, err, functionCallback) {
                if (code === "851") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else if (code === "852") {
                    ResearcherTraining_Control.getAllFullResearcherTrainingDataPreview(functionCallback, this);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "No ResearcherTraining Founded", [], response)
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "get All ResearcherTraining Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/getResearcherTrainingfromID/', function (request, response) {
    var methodCode = "82";

    var requiredData = [];
    requiredData.push(request.body.researcherTrainingId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.researcherTrainingId);
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
                ResearcherTraining_Control.checkResearcherTrainingByID(new ObjectId(request.body.researcherTrainingId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    ResearcherTraining_Control.getFullResearcherTrainingData(functionCallback, this);
                }
            }, function (code, err, functionCallback) {
                //console.log("functionCallback: "+ JSON.stringify(functionCallback))
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get ResearcherTraining with _id " + request.body.researcherTrainingId + " Completed", functionCallback, response)
            }
        );
    }
});

router.post('/deleteResearcherTraining/', function (request, response) {
    var methodCode = "83";

    var requiredData = [];
    requiredData.push(request.body.researcherTrainingId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.researcherTrainingId);
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
                ResearcherTraining_Control.checkResearcherTrainingByID(new ObjectId(request.body.researcherTrainingId), this);
            }, function (code, err, result) {
                if (code != "862") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    ResearcherTraining_Control.deleteResearcherTrainingByID(new ObjectId(request.body.researcherTrainingId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "researcherTraining with _id: " + request.body.researcherTrainingId + " has deleted successfully.", response);
                }
            }
        );
    }
});

router.post('/wipeResearcherTraining/', function (request, response) {
    var methodCode = "84";

    flow.exec(
        function () {
            ResearcherTraining_Control.wipeResearcherTraining(this);
        }, function (code, err, result) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCode(ReturnCode.success, "All ResearcherTraining has been deleted successfully.", response);
            }
        }
    );
});

module.exports = router;

//-----------------------------------------------------------------------------