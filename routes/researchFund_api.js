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
var ResearchFund = require('../model/researchFund_model.js');

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
var ResearchFund_Control = require("../controller/researchFund_control.js");

router.post('/newResearchFund_EachScrap', function (request, response) {
    var methodCode = "52";

    var requiredData = [];
    requiredData.push(request.body.researcherName);
    requiredData.push(request.body.researcherPersonalID);
    requiredData.push(request.body.researchName);
    var requiredReady = Validate.requiredData_Check(requiredData);

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                var researchFund = new ResearchFund();
                researchFund.researcherName = Validate.scrappingCleanUp(request.body.researcherName)
                researchFund.researcherPersonalID = Validate.scrappingCleanUp(request.body.researcherPersonalID)
                researchFund.researchName = Validate.scrappingCleanUp(request.body.researchName)
                researchFund.fundSource = Validate.scrappingCleanUp(request.body.fundSource)
                researchFund.scholarshipYear = Validate.scrappingCleanUp(request.body.scholarshipYear)
                researchFund.scholarshipStart = Validate.scrappingCleanUp(request.body.scholarshipStart)
                researchFund.scholarshipEnd = Validate.scrappingCleanUp(request.body.scholarshipEnd)
                researchFund.progress6MonthDate = Validate.scrappingCleanUp(request.body.progress6MonthDate)
                researchFund.progress6MonthPercent = Validate.scrappingCleanUp(request.body.progress6MonthPercent)
                researchFund.progress12MonthDate = Validate.scrappingCleanUp(request.body.progress12MonthDate)
                researchFund.progress12MonthPercent = Validate.scrappingCleanUp(request.body.progress12MonthPercent)
                researchFund.extend1 = Validate.scrappingCleanUp(request.body.extend1)
                researchFund.extend2 = Validate.scrappingCleanUp(request.body.extend2)
                researchFund.fullPaperDate = Validate.scrappingCleanUp(request.body.fullPaperDate)

                researchFund.result1 = Validate.scrappingCleanUp(request.body.result1)
                researchFund.result2 = Validate.scrappingCleanUp(request.body.result2)
                researchFund.finishDate = Validate.scrappingCleanUp(request.body.finishDate)
                researchFund.perYear = Validate.scrappingCleanUp(request.body.perYear)
                researchFund.continueYear = Validate.scrappingCleanUp(request.body.continueYear)
                researchFund.maximumFund = Validate.scrappingCleanUp(request.body.maximumFund)
                researchFund.ratio = Validate.scrappingCleanUp(request.body.ratio)
                researchFund.role = Validate.scrappingCleanUp(request.body.role)
                researchFund.before2561Inside = Validate.scrappingCleanUp(request.body.before2561Inside)
                researchFund.before2561Outside = Validate.scrappingCleanUp(request.body.before2561Outside)
                researchFund.after2561 = Validate.scrappingCleanUp(request.body.after2561)
                researchFund.detail = Validate.scrappingCleanUp(request.body.detail)

                ResearchFund_Control.newResearchFund_fromScrap(researchFund, this);

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

router.post('/getAllResearchFundPreview/', function (request, response) {
    var methodCode = "53";

    flow.exec(
        function () {
            ResearchFund_Control.getAllResearchFundPreview(this);
        }, function (code, err, functionCallback) {
            if (code === "631") {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else if (code === "632") {
                ResearchFund_Control.getAllFullResearchFundDataPreview(functionCallback, this);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "No ResearchFund Founded", [], response)
            }
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get All ResearchFund Completed", functionCallback, response)
            }
        }
    );
});

router.post('/getAllResearchFundPreviewByResearcherId/', function (request, response) {
    var methodCode = "54";

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
                ResearchFund_Control.getAllResearchFundPreviewByResearcherId(request.body.researcherId, parseInt(request.body.limit), this);
            }, function (code, err, functionCallback) {
                if (code === "641") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else if (code === "642") {
                    ResearchFund_Control.getAllFullResearchFundDataPreview(functionCallback, this);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "No ResearchFund Founded", [], response)
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "get All ResearchFund Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/getResearchFundfromID/', function (request, response) {
    var methodCode = "55";

    var requiredData = [];
    requiredData.push(request.body.researchFundId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.researchFundId);
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
                ResearchFund_Control.checkResearchFundByID(new ObjectId(request.body.researchFundId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    ResearchFund_Control.getFullResearchFundData(functionCallback, this);
                }
            }, function (code, err, functionCallback) {
                //console.log("functionCallback: "+ JSON.stringify(functionCallback))
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get ResearchFund with _id " + request.body.researchFundId + " Completed", functionCallback, response)
            }
        );
    }
});

router.post('/deleteResearchFund/', function (request, response) {
    var methodCode = "56";

    var requiredData = [];
    requiredData.push(request.body.researchFundId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.researchFundId);
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
                Publication_Control.checkResearchFundByID(new ObjectId(request.body.researchFundId), this);
            }, function (code, err, result) {
                if (code != "672") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Publication_Control.deleteResearchFundByID(new ObjectId(request.body.researchFundId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "researchFund with _id: " + request.body.researchFundId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------