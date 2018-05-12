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
var IntellectualProperty = require('../model/intellectualProperty_model.js');

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
var IntellectualProperty_Control = require("../controller/intellectualProperty_control.js");

router.post('/newIntellectualProperty_EachScrap', function (request, response) {
    var methodCode = "...";

    var requiredData = [];
    requiredData.push(request.body.researcherName);
    requiredData.push(request.body.researcherPersonalID);
    requiredData.push(request.body.intPropertyName);
    var requiredReady = Validate.requiredData_Check(requiredData);

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        //console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                var intellectualProperty = new IntellectualProperty();
                intellectualProperty.researcherName = Validate.scrappingCleanUp(request.body.researcherName)
                intellectualProperty.researcherPersonalID = Validate.scrappingCleanUp(request.body.researcherPersonalID)
                intellectualProperty.intPropertyCode = Validate.scrappingCleanUp(request.body.intPropertyCode)
                intellectualProperty.intPropertyName = Validate.scrappingCleanUp(request.body.intPropertyName)
                intellectualProperty.intPropertyRegisterDate = Validate.scrappingCleanUp(request.body.intPropertyRegisterDate)
                intellectualProperty.licenseCode = Validate.scrappingCleanUp(request.body.licenseCode)
                intellectualProperty.intPropertyName = Validate.scrappingCleanUp(request.body.intPropertyName)
                intellectualProperty.licenseType = Validate.scrappingCleanUp(request.body.licenseType)
                intellectualProperty.claimBy = Validate.scrappingCleanUp(request.body.claimBy)
                intellectualProperty.coCreation = Validate.scrappingCleanUp(request.body.coCreation)

                IntellectualProperty_Control.newIntellectualProperty_fromScrap(intellectualProperty, this);

            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New IntellectualProperty was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/getAllIntellectualPropertyPreview/', function (request, response) {
    var methodCode = "68";

    flow.exec(
        function () {
            IntellectualProperty_Control.getAllIntellectualPropertyPreview(this);
        }, function (code, err, functionCallback) {
            if (code === "691") {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else if (code === "692") {
                IntellectualProperty_Control.getAllFullIntellectualPropertyDataPreview(functionCallback, this);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "No IntellectualProperty Founded", [], response)
            }
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get All IntellectualProperty Completed", functionCallback, response)
            }
        }
    );
});

router.post('/getAllIntellectualPropertyPreviewByResearcherId/', function (request, response) {
    var methodCode = "69";

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
                IntellectualProperty_Control.getAllIntellectualPropertyPreviewByResearcherId(request.body.researcherId, parseInt(request.body.limit), this);
            }, function (code, err, functionCallback) {
                if (code === "701") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else if (code === "702") {
                    IntellectualProperty_Control.getAllFullIntellectualPropertyDataPreview(functionCallback, this);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "No IntellectualProperty Founded", [], response)
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "get All IntellectualProperty Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/getIntellectualPropertyfromID/', function (request, response) {
    var methodCode = "70";

    var requiredData = [];
    requiredData.push(request.body.intellectualPropertyId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.intellectualPropertyId);
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
                IntellectualProperty_Control.checkIntellectualPropertyByID(new ObjectId(request.body.intellectualPropertyId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    IntellectualProperty_Control.getFullIntellectualPropertyData(functionCallback, this);
                }
            }, function (code, err, functionCallback) {
                //console.log("functionCallback: "+ JSON.stringify(functionCallback))
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get IntellectualProperty with _id " + request.body.intellectualPropertyId + " Completed", functionCallback, response)
            }
        );
    }
});

router.post('/deleteIntellectualProperty/', function (request, response) {
    var methodCode = "71";

    var requiredData = [];
    requiredData.push(request.body.intellectualPropertyId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.intellectualPropertyId);
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
                IntellectualProperty_Control.checkIntellectualPropertyByID(new ObjectId(request.body.intellectualPropertyId), this);
            }, function (code, err, result) {
                if (code != "712") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    IntellectualProperty_Control.deleteIntellectualPropertyByID(new ObjectId(request.body.intellectualPropertyId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "intellectualProperty with _id: " + request.body.intellectualPropertyId + " has deleted successfully.", response);
                }
            }
        );
    }
});

router.post('/wipeIntellectualProperty/', function (request, response) {
    var methodCode = "72";

    flow.exec(
        function () {
            IntellectualProperty_Control.wipeIntellectualProperty(this);

        }, function (code, err, result) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCode(ReturnCode.success, "All IntellectualProperty has been deleted successfully.", response);
            }
        }
    );
});

module.exports = router;

//-----------------------------------------------------------------------------