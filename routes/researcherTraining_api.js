let express = require('express');
let router = express.Router();

// DATABASE SETUP
let ObjectId = require('mongodb').ObjectId;

//Must use
let flow = require('../services/flow.js')
let ReturnCode = require('../model/returnCode.js');
let Validate = require("../controller/validation_controller.js");
let Return_Control = require('../controller/return_control.js');

//Model
let ResearcherTraining = require('../model/researcherTraining_model.js');

//Controller
let Researcher_Control = require("../controller/researcher_control.js");
let Position_Control = require("../controller/position_control.js");
let Keyword_Control = require("../controller/keyword_control.js");
let AcademicLevel_Control = require("../controller/academicLevel_control.js");
let Department_Control = require("../controller/department_control.js");
let BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
let MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
let DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");
let Publication_Control = require("../controller/publication_control.js");
let ResearcherTraining_Control = require("../controller/researcherTraining_control.js");

router.post('/newResearcherTraining_EachScrap', function (request, response) {
    let methodCode = "79";

    let requiredData = [];
    requiredData.push(request.body.researcherName);
    let requiredReady = Validate.requiredData_Check(requiredData);

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                let researcherTraining = new ResearcherTraining();
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
    let methodCode = "80";

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

router.post('/getAllResearcherTraining/', function (request, response) {
    let methodCode = "80";

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
    let methodCode = "81";

    let requiredData = [];
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.limit);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let numberData = [];
    numberData.push(request.body.limit);
    let numberReady = Validate.numberData_Check(numberData)

    let objectData = [];
    objectData.push(request.body.researcherId);
    let objectReady = Validate.objectIDData_Check(objectData)

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

router.post('/getAllResearcherTrainingByResearcherId/', function (request, response) {
    let methodCode = "81";

    let requiredData = [];
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.limit);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let numberData = [];
    numberData.push(request.body.limit);
    let numberReady = Validate.numberData_Check(numberData)

    let objectData = [];
    objectData.push(request.body.researcherId);
    let objectReady = Validate.objectIDData_Check(objectData)

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
                ResearcherTraining_Control.getAllResearcherTrainingByResearcherId(request.body.researcherId, parseInt(request.body.limit), this);
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
    let methodCode = "82";

    let requiredData = [];
    requiredData.push(request.body.researcherTrainingId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.researcherTrainingId);
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
    let methodCode = "83";

    let requiredData = [];
    requiredData.push(request.body.researcherTrainingId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.researcherTrainingId);
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

router.get('/wipeResearcherTraining/', function (request, response) {
    let methodCode = "84";

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