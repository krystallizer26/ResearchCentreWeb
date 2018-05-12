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
var Reward = require('../model/reward_model.js');

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
var Reward_Control = require("../controller/reward_control.js");

router.post('/newReward_EachScrap', function (request, response) {
    var methodCode = "57";

    var requiredData = [];
    requiredData.push(request.body.researcherName);
    requiredData.push(request.body.researcherPersonalID);
    requiredData.push(request.body.rewardName);
    var requiredReady = Validate.requiredData_Check(requiredData);

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        //console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                var reward = new Reward();
                reward.researcherName = Validate.scrappingCleanUp(request.body.researcherName)
                reward.researcherPersonalID = Validate.scrappingCleanUp(request.body.researcherPersonalID)
                reward.rewardYear = Validate.scrappingCleanUp(request.body.rewardYear)
                reward.rewardName = Validate.scrappingCleanUp(request.body.rewardName)
                reward.studentName = Validate.scrappingCleanUp(request.body.studentName)
                reward.rewardDate = Validate.scrappingCleanUp(request.body.rewardDate)
                reward.rewardRank = Validate.scrappingCleanUp(request.body.rewardRank)

                Reward_Control.newReward_fromScrap(reward, this);

            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New Reward was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/getAllRewardPreview/', function (request, response) {
    var methodCode = "58";

    flow.exec(
        function () {
            Reward_Control.getAllRewardPreview(this);
        }, function (code, err, functionCallback) {
            if (code === "691") {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else if (code === "692") {
                Reward_Control.getAllFullRewardDataPreview(functionCallback, this);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "No Reward Founded", [], response)
            }
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Reward Completed", functionCallback, response)
            }
        }
    );
});

router.post('/getAllRewardPreviewByResearcherId/', function (request, response) {
    var methodCode = "59";

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
                Reward_Control.getAllRewardPreviewByResearcherId(request.body.researcherId, parseInt(request.body.limit), this);
            }, function (code, err, functionCallback) {
                if (code === "701") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else if (code === "702") {
                    Reward_Control.getAllFullRewardDataPreview(functionCallback, this);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "No Reward Founded", [], response)
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Reward Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/getRewardfromID/', function (request, response) {
    var methodCode = "60";

    var requiredData = [];
    requiredData.push(request.body.rewardId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.rewardId);
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
                Reward_Control.checkRewardByID(new ObjectId(request.body.rewardId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Reward_Control.getFullRewardData(functionCallback, this);
                }
            }, function (code, err, functionCallback) {
                //console.log("functionCallback: "+ JSON.stringify(functionCallback))
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get Reward with _id " + request.body.rewardId + " Completed", functionCallback, response)
            }
        );
    }
});

router.post('/deleteReward/', function (request, response) {
    var methodCode = "61";

    var requiredData = [];
    requiredData.push(request.body.rewardId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.rewardId);
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
                Reward_Control.checkRewardByID(new ObjectId(request.body.rewardId), this);
            }, function (code, err, result) {
                if (code != "712") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Reward_Control.deleteRewardByID(new ObjectId(request.body.rewardId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "reward with _id: " + request.body.rewardId + " has deleted successfully.", response);
                }
            }
        );
    }
});

router.post('/wipeReward/', function (request, response) {
    var methodCode = "62";

    flow.exec(
        function () {
            Reward_Control.wipeReward(this);

        }, function (code, err, result) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCode(ReturnCode.success, "All Reward has been deleted successfully.", response);
            }
        }
    );
});

module.exports = router;

//-----------------------------------------------------------------------------