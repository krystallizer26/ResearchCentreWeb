var flow = require('../services/flow.js')
var ObjectId = require('mongodb').ObjectId;

var ResearchFund = require('../model/researchFund_model.js');
var Researcher_Control = require("../controller/researcher_control.js");

module.exports = {
    newResearchFund_fromScrap: function (researchFund, callback) {
        console.log("Saving ResearchFund: " + researchFund.researchName);

        flow.exec(
            function () {
                Researcher_Control.checkResearcherByPersonalID(researchFund.researcherPersonalID, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    researchFund.researcherId = functionCallback._id
                }
                else {
                    console.log("Researcher with personalID " + researchFund.researcherPersonalID + " not found for Research named " + researchFund.researchName)
                    researchFund.researcherId = "111111111111111111111111"
                }

                researchFund.save(function (error, saveResponse) {
                    if (error) {
                        let errCode = "621";
                        var alert = "Saving Publication fail, Error: " + error.message + "@" + researchFund.researchName;
                        console.log("ERROR Code: " + errCode + " " + alert);
                        callback(errCode, alert, null);
                    }
                    else {
                        callback("622", null, saveResponse)
                    }
                });

            }
        );
    },

    checkResearchFundByID: function (researchFundId, callback) {
        ResearchFund.findOne({ "_id": researchFundId }, function (error, functionCallback) {
            if (error) {
                let errCode = "671";
                var alert = "Error in finding ResearchFund with _id: " + researchFundId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("672", null, functionCallback)
            }
            else {
                let errCode = "673";
                var alert = "ResearchFund with _id: " + researchFundId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },

    getAllResearchFund: function (callback) {
        ResearchFund.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "651";
                var alert = "Error in getAllPublication , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "652";
                var alert = "Get All Publication Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "653";
                var alert = "No Publication Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },

    deleteResearchFundByID: function (researchFundId, callback) {
        ResearchFund.remove({ "_id": researchFundId }, function (error, deleteCallback) {
            if (error) {
                let errCode = "661";
                var alert = "Error in deleting ResearchFund with _id " + researchFundId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("662", null, deleteCallback)
            }
        });
    },

    wipeResearchFund: function (callback) {
        ResearchFund.remove({}, function (error, deleteCallback) {
            if (error) {
                let errCode = "741";
                var alert = "Error in wiping Reward Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("742", null, deleteCallback)
            }
        });
    },

    getAllResearchFundPreview: function (callback) {
        ResearchFund.find({}, {
            "_id": true,
            "researcherId": true,
            "researchName": true,
            "fundSource": true,
            "fundSource2": true,
            "scholarshipYear": true
        }, function (error, functionCallback) {
            if (error) {
                let errCode = "631";
                var alert = "Error in getAllResearchFundPreview , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback.length > 0) {
                let errCode = "632";
                var alert = "Get All ResearchFund Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "633";
                var alert = "No ResearchFund Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },

    getAllResearchFundPreviewByResearcherId: function (researcherId, limitNum, callback) {
        ResearchFund.find({ "researcherId": researcherId }, {
            "_id": true,
            "researcherId": true,
            "researchName": true,
            "fundSource": true,
            "fundSource2": true,
            "scholarshipYear": true
        }, { sort: { "scholarshipYear": -1 }, limit: limitNum }
            , function (error, functionCallback) {
                if (error) {
                    let errCode = "641";
                    var alert = "Error in getAllResearchFundPreviewByResearcherId , Error : " + error.message;
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
                else if (functionCallback.length > 0) {
                    let errCode = "642";
                    var alert = "Get All ResearchFund Completed! ";
                    //console.log(alert);
                    callback(errCode, null, functionCallback)
                }
                else {
                    let errCode = "643";
                    var alert = "No ResearchFund Founded";
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
            });
    },

    getFullResearchFundData: function (researcherData, callback) {
        let tmp = JSON.parse(JSON.stringify(researcherData));
        flow.exec(
            function () {
                getFullResearchFund(researcherData, this);
            }, function (functionCallback) {
                callback("...", null, functionCallback);
            }
        );
    },

    getAllFullResearchFundDataPreview: function (researchFund, callback) {
        let forCallback = [];
        console.log("researchFund.length >> " + researchFund.length)
        let j = 0;
        if (researchFund.length == 0) {
            callback("...", null, []);
        }
        else {
            for (let i = 0; i < researchFund.length; i++) {
                getFullResearchFundPreview(researchFund[i], function (a) {
                    //console.log("a >> " + JSON.stringify(a))
                    forCallback.push(a);
                    if (j == researchFund.length - 1)
                        callback("...", null, forCallback);
                    else
                        j++;
                });
            }
        }


    }
};

//---------------------------------------------

var Department_Control = require("../controller/department_control.js");
var Position_Control = require("../controller/position_control.js");
var AcademicLevel_Control = require("../controller/academicLevel_control.js");
var BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
var MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
var DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");

function getFullResearchFundPreview(input, callback) {
    let researchFundData = JSON.parse(JSON.stringify(input));
    console.log("getFullResearchFundPreview for " + researchFundData.researchName)
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(researchFundData.researcherId), {}, this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researchFundData["researcherName_TH"] = functionCallback.researcherName_TH;
                researchFundData["researcherName_EN"] = functionCallback.researcherName_EN;
            }
            else {
                researchFundData["researcherName_TH"] = "Not found";
                researchFundData["researcherName_EN"] = "Not found";
            }
            callback(researchFundData)
        }
    );
}

function getFullResearchFund(input, callback) {
    let researchFundData = JSON.parse(JSON.stringify(input));
    console.log("getFullResearchFund for " + researchFundData.researchName)

    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(researchFundData.researcherId), {}, this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researchFundData["researcherName_TH"] = functionCallback.researcherName_TH;
                researchFundData["researcherName_EN"] = functionCallback.researcherName_EN;
            }
            else {
                researchFundData["researcherName_TH"] = "Not found";
                researchFundData["researcherName_EN"] = "Not found";
            }
            callback(researchFundData)
        }
    );
}