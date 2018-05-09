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
                //console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("362", null, saveResponse)
            }
        });
    },
    newResearcher_fromScrap: function (researcher, callback) {
        console.log("Saving Researcher: " + researcher.researcherName_TH);

        flow.exec(
            function () {
                Department_Control.checkAndInsertDepartmentByDepartmentName(researcher.departmentName_TH, researcher.departmentName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    researcher.departmentId = functionCallback._id
                }
                else {
                    researcher.departmentId = null
                }
                Position_Control.checkAndInsertPositionByPositionName(researcher.positionName_TH, researcher.positionName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    researcher.positionId = functionCallback._id
                }
                else {
                    researcher.positionId = null
                }
                AcademicLevel_Control.checkAndInsertAcademicLevelByAcademicLevelName(researcher.academicPositionName_TH, researcher.academicPositionName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    researcher.academicLevelId = functionCallback._id
                }
                else {
                    researcher.academicLevelId = null
                }
                BachelorTeachingDepartment_Control.checkAndInsertBachelorTeachingByBachelorTeachingDepartmentName(researcher.bachelorTeachingDepartmentName_TH, researcher.bachelorTeachingDepartmentName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    researcher.bachelorTeachingDepartmentId = functionCallback._id
                }
                else {
                    researcher.bachelorTeachingDepartmentId = null
                }
                MasterTeachingDepartment_Control.checkAndInsertMasterTeachingByMasterTeachingDepartmentName(researcher.masterTeachingDepartmentName_TH, researcher.masterTeachingDepartmentName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    researcher.masterTeachingDepartmentId = functionCallback._id
                }
                else {
                    researcher.masterTeachingDepartmentId = null
                }
                DoctoryTeachingDepartment_Control.checkAndInsertDoctoryTeachingByDoctoryTeachingDepartmentName(researcher.doctoryTeachingDepartmentName_TH, researcher.doctoryTeachingDepartmentName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    researcher.doctoryTeachingDepartmentId = functionCallback._id
                }
                else {
                    researcher.doctoryTeachingDepartmentId = null
                }

                researcher.save(function (error, saveResponse) {
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

            }
        );
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
    checkResearcherByResearcherName: function (researcherName_TH, callback) {
        Researcher.findOne({ "researcherName_TH": researcherName_TH }, function (error, functionCallback) {
            if (error) {
                let errCode = "571";
                var alert = "Error in finding Researcher with name: " + researcherName_TH + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("572", null, functionCallback)
            }
            else {
                let errCode = "573";
                var alert = "Researcher with name: " + researcherName_TH + " not found";
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
        Researcher.find({}, {
            "_id": true,
            "researcherName_TH": true,
            "researcherName_EN": true,
            "researcherPic": true,
            "academicLevelId": true,
            "positionId": true,
            "departmentId": true,

            "keyword1_TH": true,
            "keyword2_TH": true,
            "keyword3_TH": true,
            "keyword4_TH": true,
            "keyword5_TH": true,
            "keyword1_EN": true,
            "keyword2_EN": true,
            "keyword3_EN": true,
            "keyword4_EN": true,
            "keyword5_EN": true

        }, function (error, functionCallback) {
            if (error) {
                let errCode = "431";
                var alert = "Error in getAllAcademicLevel , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "432";
                var alert = "Get All Researcher Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "433";
                var alert = "No Researcher Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },

    getFullResearcherData: function (researcherData, callback) {
        let tmp = JSON.parse(JSON.stringify(researcherData));
        let promotiontmp = null;
        flow.exec(
            function () {
                getFullResearcher(researcherData, this);
            }, function (functionCallback) {
                callback("551", null, functionCallback);
            }
        );
    },

    getAllFullResearcherDataPreview: function (researcher, callback) {
        for (let i = 0; i < researcher.length; i++) {
            getFullResearcherPreview(researcher[i], function (a) {
                console.log("a >> " + JSON.stringify(a))
                forCallback.push(a);
                if (i == researcher.length-1)
                    callback("561", null, forCallback);
            });
        }

    }
};

//------

// async function qqqqqq(a) {

//     var forCallback = []

//     const  z = await Promise.all(a.map(async (a1) => {
//         const contents = await getFullResearcherPreview(a1)
//         console.log("YEAH")
//     }));
//     return z
// }

var Position_Control = require("../controller/position_control.js");
var AcademicLevel_Control = require("../controller/academicLevel_control.js");
var BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
var MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
var DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");

var forCallback_getFullResearcherPreview = []

function getFullResearcher(input, callback) {
    let researcherData = JSON.parse(JSON.stringify(input));
    console.log("getFullResearcherData for " + researcherData.researcherName_TH)
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Department_Control.checkDepartmentByID(new ObjectId(researcherData.departmentId), this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["departmentName_TH"] = functionCallback.departmentName_TH;
                researcherData["departmentName_EN"] = functionCallback.departmentName_EN;
            }
            else {
                researcherData["departmentName_TH"] = "Not found";
                researcherData["departmentName_EN"] = "Not found";
            }
            Position_Control.checkPositionByID(new ObjectId(researcherData.positionId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["positionName_TH"] = functionCallback.positionName_TH;
                researcherData["positionName_EN"] = functionCallback.positionName_EN;
            }
            else {
                researcherData["positionName_TH"] = "Not found";
                researcherData["positionName_EN"] = "Not found";
            }
            AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(researcherData.academicLevelId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["academicLevelName_TH"] = functionCallback.academicLevelName_TH;
                researcherData["academicLevelName_EN"] = functionCallback.academicLevelName_EN;
            }
            else {
                researcherData["academicLevelName_TH"] = "Not found";
                researcherData["academicLevelName_EN"] = "Not found";
            }
            BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(researcherData.bachelorTeachingDepartmentId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["bachelorTeachingDepartmentName_TH"] = functionCallback.bachelorTeachingDepartmentName_TH;
                researcherData["bachelorTeachingDepartmentName_EN"] = functionCallback.bachelorTeachingDepartmentName_EN;
            }
            else {
                researcherData["bachelorTeachingDepartmentName_TH"] = "Not found";
                researcherData["bachelorTeachingDepartmentName_EN"] = "Not found";
            }
            MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(researcherData.masterTeachingDepartmentId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["masterTeachingDepartmentName_TH"] = functionCallback.masterTeachingDepartmentName_TH;
                researcherData["masterTeachingDepartmentName_EN"] = functionCallback.masterTeachingDepartmentName_EN;
            }
            else {
                researcherData["masterTeachingDepartmentName_TH"] = "Not found";
                researcherData["masterTeachingDepartmentName_EN"] = "Not found";
            }
            DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(researcherData.doctoryTeachingDepartmentId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["doctoryTeachingDepartmentName_TH"] = functionCallback.doctoryTeachingDepartmentName_TH;
                researcherData["doctoryTeachingDepartmentName_EN"] = functionCallback.doctoryTeachingDepartmentName_EN;
            }
            else {
                researcherData["doctoryTeachingDepartmentName_TH"] = "Not found";
                researcherData["doctoryTeachingDepartmentName_EN"] = "Not found";
            }
            callback(researcherData)
        }
    );
}


function getFullResearcherPreview(input, callback) {
    let researcherData = JSON.parse(JSON.stringify(input));
    console.log("getFullResearcherData for " + researcherData.researcherName_TH)
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Department_Control.checkDepartmentByID(new ObjectId(researcherData.departmentId), this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["departmentName_TH"] = functionCallback.departmentName_TH;
                researcherData["departmentName_EN"] = functionCallback.departmentName_EN;
            }
            else {
                researcherData["departmentName_TH"] = "Not found";
                researcherData["departmentName_EN"] = "Not found";
            }
            Position_Control.checkPositionByID(new ObjectId(researcherData.positionId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["positionName_TH"] = functionCallback.positionName_TH;
                researcherData["positionName_EN"] = functionCallback.positionName_EN;
            }
            else {
                researcherData["positionName_TH"] = "Not found";
                researcherData["positionName_EN"] = "Not found";
            }
            AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(researcherData.academicLevelId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["academicLevelName_TH"] = functionCallback.academicLevelName_TH;
                researcherData["academicLevelName_EN"] = functionCallback.academicLevelName_EN;
            }
            else {
                researcherData["academicLevelName_TH"] = "Not found";
                researcherData["academicLevelName_EN"] = "Not found";
            }
            callback(researcherData)

            // forCallback_getFullResearcherPreview.push(researcherData)
        }
    );
}