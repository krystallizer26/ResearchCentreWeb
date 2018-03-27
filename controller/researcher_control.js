var flow = require('../services/flow.js')
var ObjectId = require('mongodb').ObjectId;

var Researcher = require('../model/researcher_model.js');

var Department_Control = require("../controller/department_control.js");

module.exports = {
    newResearcher: function (researcher, callback) {
        console.log("Saving Researcher: " + researcher.researcherName_TH);
        researcher.save(function (error, saveResponse) {
            console.log("Saving Researcher >> COMPLETED ");
            if (error) {
                let errCode = "361";
                var alert = "Saving Researcher fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("362", null, saveResponse)
            }
        });
    },
    updateResearcherByID: function (researcherId, newvalues, callback) {
        var myquery = { "_id": researcherId };
        console.log("In Method: " + JSON.stringify(newvalues))
        Researcher.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "371";
                var alert = "Error in updating Researcher with _id: " + researcherId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("372", null, updateResponse);
        });
    },
    checkResearcherByID: function (researcherId, query, callback) {
        Researcher.findOne({ "_id": researcherId }, query, function (error, functionCallback) {
            if (error) {
                let errCode = "381";
                var alert = "Error in finding Researcher with _id: " + researcherId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("382", null, functionCallback)
            }
            else {
                let errCode = "383";
                var alert = "Researcher with _id: " + researcherId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    checkBindedKeywordwithResearcher: function (researcherId, keywordId, callback) {
        Researcher.findOne({ $and: [{ "_id": researcherId }, { "keywordIdArray": keywordId }] }, function (error, findCallback) {
            if (error) {
                var alert = "Error in finding Researcher with _id: " + researcherId + "with bankaccoount Id: " + keywordId + "\nError: " + error.message;
                callback("391", alert, null)
            }
            else if (findCallback) {
                var alert = "Keyword with _id: " + keywordId + " is already binded to this Researcher";
                callback("392", alert, null)
            }
            else {
                var alert = "Keyword with _id: " + keywordId + " is not binded to this Researcher";
                callback("393", alert, null)
            }
        });
    },
    bindKeywordtoResearcher: function (researcherId, keywordId, callback) {
        Researcher.update({ "_id": researcherId }, { $push: { "keywordIdArray": keywordId } }, function (error, findCallback) {
            if (error) {
                var alert = "Error in updating Researcher with _id: " + researcherId + "with Keyword Id: " + keywordId + "\nError: " + error.message;
                callback("401", alert, null)
            }
            else {
                callback("402", alert, null)
            }
        });
    },
    removeKeywordfromResearcher: function (researcherId, keywordId, callback) {
        Researcher.update({ "_id": researcherId }, { $pull: { "keywordIdArray": keywordId } }, function (error, findCallback) {
            if (error) {
                var alert = "Error in updating Researcher with _id: " + researcherId + "with Keyword Id: " + keywordId + "\nError: " + error.message;
                callback("411", alert, null)
            }
            else {
                callback("412", alert, null)
            }
        });
    },
    deleteResearcherByID: function (researcherId, callback) {
        Researcher.remove({ "_id": researcherId }, function (error, newsCallback) {
            if (error) {
                let errCode = "421";
                var alert = "Error in deleting Researcher with _id " + researcherId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("422", null, newsCallback)
            }
        });
    },
    getAllResearcherPreview: function (callback) {
        Researcher.find({}, { "_id": true, "researcherName_TH": true, "researcherName_EN": true, "researcherPic": true }, function (error, functionCallback) {
            if (error) {
                let errCode = "431";
                var alert = "Error in getAllAcademicLevel , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "432";
                var alert = "Get All Researcher Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "433";
                var alert = "No AcademicLevel Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    getAllResearcherDataById: function (researcherData, callback) {
        let tmp = JSON.parse(JSON.stringify(researcherData));
        let promotiontmp = null;
        flow.exec(
            function () {
                //console.log("history.requestId: "+history.requestID)
                Department_Control.checkDepartmentByID(new ObjectId(researcherData.departmentId), this)
            }, function (code, err, functionCallback) {
                if (functionCallback) {
                    tmp["departmentName_TH"] = functionCallback.departmentName_TH;
                    tmp["departmentName_EN"] = functionCallback.departmentName_EN;
                }
                else {
                    tmp["departmentName_TH"] = "Not found";
                    tmp["departmentName_EN"] = "Not found";
                }
                Position_Control.checkPositionByID(new ObjectId(researcherData.positionId), this);
            }, function (code, err, functionCallback) {
                if (functionCallback) {
                    tmp["positionName_TH"] = functionCallback.positionName_TH;
                    tmp["positionName_EN"] = functionCallback.positionName_EN;
                }
                else {
                    tmp["positionName_TH"] = "Not found";
                    tmp["positionName_EN"] = "Not found";
                }
                AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(researcherData.academicLevelId), this);
            }, function (code, err, functionCallback) {
                if (functionCallback) {
                    tmp["academicLevelName_TH"] = functionCallback.academicLevelName_TH;
                    tmp["academicLevelName_EN"] = functionCallback.academicLevelName_EN;
                }
                else {
                    tmp["academicLevelName_TH"] = "Not found";
                    tmp["academicLevelName_EN"] = "Not found";
                }
                BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(researcherData.bachelorTeachingDepartmentId), this);
            }, function (code, err, functionCallback) {
                if (functionCallback) {
                    tmp["bachelorTeachingDepartmentName_TH"] = functionCallback.bachelorTeachingDepartmentName_TH;
                    tmp["bachelorTeachingDepartmentName_EN"] = functionCallback.bachelorTeachingDepartmentName_EN;
                }
                else {
                    tmp["bachelorTeachingDepartmentName_TH"] = "Not found";
                    tmp["bachelorTeachingDepartmentName_EN"] = "Not found";
                }
                MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(researcherData.masterTeachingDepartmentId), this);
            }, function (code, err, functionCallback) {
                if (functionCallback) {
                    tmp["masterTeachingDepartmentName_TH"] = functionCallback.masterTeachingDepartmentName_TH;
                    tmp["masterTeachingDepartmentName_EN"] = functionCallback.masterTeachingDepartmentName_EN;
                }
                else {
                    tmp["masterTeachingDepartmentName_TH"] = "Not found";
                    tmp["masterTeachingDepartmentName_EN"] = "Not found";
                }
                DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(researcherData.doctoryTeachingDepartmentId), this);
            }, function (code, err, functionCallback) {
                if (functionCallback) {
                    tmp["doctoryTeachingDepartmentName_TH"] = functionCallback.doctoryTeachingDepartmentName_TH;
                    tmp["doctoryTeachingDepartmentName_EN"] = functionCallback.doctoryTeachingDepartmentName_EN;
                }
                else {
                    tmp["doctoryTeachingDepartmentName_TH"] = "Not found";
                    tmp["doctoryTeachingDepartmentName_EN"] = "Not found";
                }
                Keyword_Control.convertKeywordFromIDArray(researcherData.keywordIdArray, this);
            }, function (functionCallback) {
                console.log("functionCallback:"+functionCallback)
                tmp["keyword"] = functionCallback;
                callback(tmp)
            }
        );
    }
};

//------

var Position_Control = require("../controller/position_control.js");
var AcademicLevel_Control = require("../controller/academicLevel_control.js");
var BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
var MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
var DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");
var Keyword_Control = require("../controller/keyword_control.js");