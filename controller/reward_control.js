let flow = require('../services/flow.js')
let ObjectId = require('mongodb').ObjectId;

let Reward = require('../model/reward_model.js');

let Validate = require("../controller/validation_controller.js");
let Researcher_Control = require("./researcher_control.js");
let Position_Control = require("../controller/position_control.js");
let Keyword_Control = require("../controller/keyword_control.js");
let AcademicLevel_Control = require("../controller/academicLevel_control.js");
let Department_Control = require("../controller/department_control.js");
let BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
let MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
let DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");

module.exports = {
    newReward: function (reward, callback) {
        console.log("Saving Reward: " + reward.rewardName);

        flow.exec(
            function () {
                Researcher_Control.checkResearcherByPersonalID(reward.researcherPersonalID, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    reward.researcherId = functionCallback._id
                }
                else {
                    console.log("Researcher with personalID " + reward.researcherPersonalID + " not found for Reward named " + reward.rewardName)
                    reward.researcherId = "111111111111111111111111"
                }

                reward.save(function (error, saveResponse) {
                    if (error) {
                        let errCode = "681";
                        let alert = "Saving Publication fail, Error: " + error.message + "@" + reward.rewardName;
                        console.log("ERROR Code: " + errCode + " " + alert);
                        callback(errCode, alert, null);
                    }
                    else {
                        callback("682", null, saveResponse)
                    }
                });

            }
        );
    },
    newReward_fromScrap: function (publication_bulk, callback) {
        let j = 0
        let scrapingData = JSON.parse(JSON.stringify(publication_bulk))

        let reward = new Reward();
        let requiredData = [];
        requiredData.push(scrapingData.researcherName);
        requiredData.push(scrapingData.researcherPersonalID);
        requiredData.push(scrapingData.rewardName);
        let requiredReady = Validate.requiredData_Check(requiredData);

        if (!requiredReady) {
            let alert = "Input Not Valid, check if some data is required."
            console.log(alert);
            callback("New Publications was saved successfully")
        }
        else {
            reward.researcherName = Validate.scrappingCleanUp(scrapingData.researcherName)
            reward.researcherPersonalID = Validate.scrappingCleanUp(scrapingData.researcherPersonalID)
            reward.rewardYear = Validate.scrappingCleanUp(scrapingData.rewardYear)
            reward.rewardName = Validate.scrappingCleanUp(scrapingData.rewardName)
            reward.rewardFrom = Validate.scrappingCleanUp(scrapingData.rewardFrom)
            reward.studentName = Validate.scrappingCleanUp(scrapingData.studentName)
            reward.rewardDate = Validate.scrappingCleanUp(scrapingData.rewardDate)
            reward.rewardRank = Validate.scrappingCleanUp(scrapingData.rewardRank)

            let Researcher_Control = require("./researcher_control.js");
            flow.exec(
                function () {
                    Researcher_Control.checkResearcherByPersonalID(reward.researcherPersonalID, this);
                }, function (code, err, functionCallback) {
                    if (!err) {
                        reward.researcherId = functionCallback._id
                    }
                    else {
                        console.log("Researcher with personalID " + reward.researcherPersonalID + " not found for Reward named " + reward.rewardName)
                        reward.researcherId = "111111111111111111111111"
                    }

                    reward.save(function (error, saveResponse) {
                        if (error) {
                            let errCode = "681";
                            let alert = "Saving Publication fail, Error: " + error.message + "@" + reward.rewardName;
                            console.log("ERROR Code: " + errCode + " " + alert);
                        }
                    });
                    callback("New Researcher was saved successfully")
                }
            );
        }
    },

    getAllRewardPreview: function (callback) {
        Reward.find({}, {
            "_id": true,
            "researcherId": true,
            "rewardName": true,
            "rewardFrom": true,
            "rewardYear": true,
            "rewardDate": true,
            "rewardRank": true
        }, function (error, functionCallback) {
            if (error) {
                let errCode = "691";
                let alert = "Error in getAllRewardPreview , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback.length > 0) {
                let errCode = "692";
                let alert = "Get All Reward Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "693";
                let alert = "No Reward Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },

    getAllReward: function (callback) {
        Reward.find({}, {
        }, function (error, functionCallback) {
            if (error) {
                let errCode = "691";
                let alert = "Error in getAllRewardPreview , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback.length > 0) {
                let errCode = "692";
                let alert = "Get All Reward Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "693";
                let alert = "No Reward Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },

    getAllRewardPreviewByResearcherId: function (researcherId, limitNum, callback) {
        Reward.find({ "researcherId": researcherId }, {
            "_id": true,
            "researcherId": true,
            "rewardName": true,
            "rewardFrom": true,
            "rewardYear": true,
            "rewardDate": true,
            "rewardRank": true
        }, { sort: { "rewardYear": -1 }, limit: limitNum }
            , function (error, functionCallback) {
                if (error) {
                    let errCode = "701";
                    let alert = "Error in getAllRewardPreviewByResearcherId , Error : " + error.message;
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
                else if (functionCallback.length > 0) {
                    let errCode = "702";
                    let alert = "Get All Reward Completed! ";
                    //console.log(alert);
                    callback(errCode, null, functionCallback)
                }
                else {
                    let errCode = "703";
                    let alert = "No Reward Founded";
                    //console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
            });
    },

    getAllRewardByResearcherId: function (researcherId, limitNum, callback) {
        Reward.find({ "researcherId": researcherId }, {
        }, { sort: { "rewardYear": -1 }, limit: limitNum }
            , function (error, functionCallback) {
                if (error) {
                    let errCode = "701";
                    let alert = "Error in getAllRewardPreviewByResearcherId , Error : " + error.message;
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
                else if (functionCallback.length > 0) {
                    let errCode = "702";
                    let alert = "Get All Reward Completed! ";
                    //console.log(alert);
                    callback(errCode, null, functionCallback)
                }
                else {
                    let errCode = "703";
                    let alert = "No Reward Founded";
                    //console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
            });
    },

    checkRewardByID: function (rewardId, callback) {
        Reward.findOne({ "_id": rewardId }, function (error, functionCallback) {
            if (error) {
                let errCode = "711";
                let alert = "Error in finding Reward with _id: " + rewardId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("712", null, functionCallback)
            }
            else {
                let errCode = "713";
                let alert = "Reward with _id: " + rewardId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },

    deleteRewardByID: function (rewardId, callback) {
        Reward.remove({ "_id": rewardId }, function (error, deleteCallback) {
            if (error) {
                let errCode = "721";
                let alert = "Error in deleting Reward with _id " + rewardId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("722", null, deleteCallback)
            }
        });
    },

    wipeReward: function (callback) {
        Reward.remove({}, function (error, deleteCallback) {
            if (error) {
                let errCode = "731";
                let alert = "Error in wiping Reward Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("732", null, deleteCallback)
            }
        });
    },

    getFullRewardData: function (researcherData, callback) {
        let tmp = JSON.parse(JSON.stringify(researcherData));
        flow.exec(
            function () {
                getFullReward(researcherData, this);
            }, function (functionCallback) {
                callback("...", null, functionCallback);
            }
        );
    },

    getAllFullRewardDataPreview: function (reward, callback) {
        let forCallback = [];
        console.log("reward.length >> " + reward.length)
        let j = 0;
        if (reward.length == 0) {
            callback("...", null, []);
        }
        else {
            for (let i = 0; i < reward.length; i++) {
                getFullRewardPreview(reward[i], function (a) {
                    //console.log("a >> " + JSON.stringify(a))
                    forCallback.push(a);
                    if (j == reward.length - 1)
                        callback("...", null, forCallback);
                    else
                        j++;
                });
            }
        }


    }
};

//---------------------------------------------

function getFullRewardPreview(input, callback) {
    let rewardData = JSON.parse(JSON.stringify(input));
    console.log("getFullRewardPreview for " + rewardData.rewardName)
    let Researcher_Control = require("./researcher_control.js");
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(rewardData.researcherId), {}, this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                rewardData["researcherName_TH"] = functionCallback.researcherName_TH;
                rewardData["researcherName_EN"] = functionCallback.researcherName_EN;
            }
            else {
                rewardData["researcherName_TH"] = "Not found";
                rewardData["researcherName_EN"] = "Not found";
            }
            callback(rewardData)
        }
    );
}

function getFullReward(input, callback) {
    let rewardData = JSON.parse(JSON.stringify(input));
    console.log("getFullReward for " + rewardData.rewardName)
    let Researcher_Control = require("./researcher_control.js");

    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(rewardData.researcherId), {}, this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                rewardData["researcherName_TH"] = functionCallback.researcherName_TH;
                rewardData["researcherName_EN"] = functionCallback.researcherName_EN;
            }
            else {
                rewardData["researcherName_TH"] = "Not found";
                rewardData["researcherName_EN"] = "Not found";
            }
            callback(rewardData)
        }
    );
}