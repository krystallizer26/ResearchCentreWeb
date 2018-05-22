var flow = require('../services/flow.js')
var ObjectId = require('mongodb').ObjectId;

var Thesis = require('../model/thesis_model.js');
var Researcher_Control = require("../controller/researcher_control.js");

module.exports = {
    newThesis: function (thesis, callback) {
        console.log("Saving Thesis: " + thesis.thesisName_TH);
        thesis.save(function (error, saveResponse) {
            console.log("Saving Thesis >> COMPLETED ");
            if (error) {
                let errCode = "441";
                var alert = "Saving Thesis fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("442", null, saveResponse)
            }
        });
    },
    newThesis_fromScrap: function (thesis, callback) {
        console.log("Saving Thesis: " + thesis.thesisName);

        flow.exec(
            function () {
                Researcher_Control.checkResearcherByResearcherName(thesis.researcherName, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    thesis.researcherId = functionCallback._id
                }
                else {
                    console.log("Researcher with Personal Id " + thesis.researcherPersonalID + "not found for thesis named " + thesis.thesisName)
                    thesis.researcherId = "111111111111111111111111"
                }
                BachelorTeachingDepartment_Control.checkAndInsertBachelorTeachingByBachelorTeachingDepartmentName(thesis.bachelorTeachingDepartmentName_TH, thesis.bachelorTeachingDepartmentName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    thesis.bachelorTeachingDepartmentId = functionCallback._id
                }
                else {
                    thesis.bachelorTeachingDepartmentId = null
                }
                MasterTeachingDepartment_Control.checkAndInsertMasterTeachingByMasterTeachingDepartmentName(thesis.masterTeachingDepartmentName_TH, thesis.masterTeachingDepartmentName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    thesis.masterTeachingDepartmentId = functionCallback._id
                }
                else {
                    thesis.masterTeachingDepartmentId = null
                }
                DoctoryTeachingDepartment_Control.checkAndInsertDoctoryTeachingByDoctoryTeachingDepartmentName(thesis.doctoryTeachingDepartmentName_TH, thesis.doctoryTeachingDepartmentName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    thesis.doctoryTeachingDepartmentId = functionCallback._id
                }
                else {
                    thesis.doctoryTeachingDepartmentId = null
                }

                thesis.save(function (error, saveResponse) {
                    if (error) {
                        let errCode = "582";
                        var alert = "Saving Thesis fail, Error: " + error.message + "@" + thesis.thesisName;
                        console.log("ERROR Code: " + errCode + " " + alert);
                        callback(errCode, alert, null);
                    }
                    else {
                        callback("583", null, saveResponse)
                    }
                });

            }
        );
    },
    updateThesisByID: function (thesisId, thesis, callback) {
        var myquery = { "_id": thesisId };
        var newvalues = {
            $set: {
                "researcherId": thesis.researcherId,
                "thesisName": thesis.thesisName,
                "publishLocation": thesis.publishLocation,
                "publishYear": thesis.publishYear,
                "publishType": thesis.publishType,
                "scholarType": thesis.scholarType,
                "address": thesis.address,
                "thesisDatabase": thesis.thesisDatabase,
                "impactFactor": thesis.impactFactor,
                "quartile": thesis.quartile,
                "weight": thesis.weight,
                "detail": thesis.detail,
                "studentName": thesis.studentName,
                "bachelorDepartment": thesis.bachelorDepartment,
                "masterDepartment": thesis.masterDepartment,
                "doctoryDepartment": thesis.doctoryDepartment,
                "editedDate": Date.now()
            }
        };
        Thesis.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "451";
                var alert = "Error in updating Thesis with _id: " + thesisId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("452", null, updateResponse);
        });
    },
    checkThesisByID: function (thesisId, callback) {
        Thesis.findOne({ "_id": thesisId }, function (error, functionCallback) {
            if (error) {
                let errCode = "461";
                var alert = "Error in finding Thesis with _id: " + thesisId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("462", null, functionCallback)
            }
            else {
                let errCode = "463";
                var alert = "Thesis with _id: " + thesisId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    getAllThesis: function (callback) {
        Thesis.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "471";
                var alert = "Error in getAllThesis , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback.length > 0) {
                let errCode = "472";
                var alert = "Get All Thesis Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "473";
                var alert = "No Thesis Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    deleteThesisByID: function (thesisId, callback) {
        Thesis.remove({ "_id": thesisId }, function (error, newsCallback) {
            if (error) {
                let errCode = "481";
                var alert = "Error in deleting Thesis with _id " + thesisId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("482", null, newsCallback)
            }
        });
    },

    wipeThesis: function (callback) {
        Thesis.remove({}, function (error, deleteCallback) {
            if (error) {
                let errCode = "751";
                var alert = "Error in wiping Reward Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("752", null, deleteCallback)
            }
        });
    },

    getAllThesisPreview: function (callback) {
        Thesis.find({}, {
            "_id": true,
            "researcherId": true,
            "thesisName": true,
            "publishLocation": true,
            "thesisAuthor": true,
            "publishYear": true,
            "publishType": true,
            "thesisDatabase": true
        }, function (error, functionCallback) {
            if (error) {
                let errCode = "591";
                var alert = "Error in getAllThesisPreview , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback.length > 0) {
                let errCode = "592";
                var alert = "Get All Thesis Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "593";
                var alert = "No Researcher Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    getAllThesisPreviewByResearcherId: function (researcherId, limitNum, callback) {
        Thesis.find({ "researcherId": researcherId }, {
            "_id": true,
            "researcherId": true,
            "thesisName": true,
            "publishLocation": true,
            "thesisAuthor": true,
            "publishYear": true,
            "publishType": true,
            "thesisDatabase": true
        }, { sort: { "publishYear": -1 }, limit: limitNum }
            , function (error, functionCallback) {
                if (error) {
                    let errCode = "611";
                    var alert = "Error in getAllThesisPreview , Error : " + error.message;
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
                else if (functionCallback) {
                    let errCode = "612";
                    var alert = "Get All Thesis Completed! ";
                    //console.log(alert);
                    callback(errCode, null, functionCallback)
                }
                else {
                    let errCode = "613";
                    var alert = "No Researcher Founded";
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
            });
    },

    getFullThesisData: function (researcherData, callback) {
        let tmp = JSON.parse(JSON.stringify(researcherData));
        let promotiontmp = null;
        flow.exec(
            function () {
                getFullThesis(researcherData, this);
            }, function (functionCallback) {
                callback("601", null, functionCallback);
            }
        );
    },

    getAllFullThesisDataPreview: function (pubilcation, callback) {
        let forCallback = [];
        console.log("pubilcation.length >> " + pubilcation.length)
        let j = 0;
        if (pubilcation.length == 0) {
            callback("...", null, []);
        }
        else {
            for (let i = 0; i < pubilcation.length; i++) {
                getFullThesisPreview(pubilcation[i], function (a) {
                    //console.log("a >> " + JSON.stringify(a))
                    forCallback.push(a);
                    if (j == pubilcation.length - 1)
                        callback("561", null, forCallback);
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

function getFullThesisPreview(input, callback) {
    let thesisData = JSON.parse(JSON.stringify(input));
    console.log("getFullThesisPreview for " + thesisData.thesisName)
    let academicLevelId_tmp = null;
    let positionId_tmp = null;
    let departmentId_tmp = null;
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(thesisData.researcherId), {}, this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                thesisData["researcherName_TH"] = functionCallback.researcherName_TH;
                thesisData["researcherName_EN"] = functionCallback.researcherName_EN;
                academicLevelId_tmp = functionCallback.academicLevelId;
                positionId_tmp = functionCallback.positionId;
                departmentId_tmp = functionCallback.departmentId;
            }
            else {
                thesisData["researcherName_TH"] = "Not found";
                thesisData["researcherName_EN"] = "Not found";
            }
            Position_Control.checkPositionByID(new ObjectId(positionId_tmp), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                thesisData["positionName_TH"] = functionCallback.positionName_TH;
                thesisData["positionName_EN"] = functionCallback.positionName_EN;
            }
            else {
                thesisData["positionName_TH"] = "Not found";
                thesisData["positionName_EN"] = "Not found";
            }
            AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(academicLevelId_tmp), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                thesisData["academicLevelName_TH"] = functionCallback.academicLevelName_TH;
                thesisData["academicLevelName_EN"] = functionCallback.academicLevelName_EN;
            }
            else {
                thesisData["academicLevelName_TH"] = "Not found";
                thesisData["academicLevelName_EN"] = "Not found";
            }
            Department_Control.checkDepartmentByID(new ObjectId(departmentId_tmp), this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                thesisData["departmentName_TH"] = functionCallback.departmentName_TH;
                thesisData["departmentName_EN"] = functionCallback.departmentName_EN;
            }
            else {
                thesisData["departmentName_TH"] = "Not found";
                thesisData["departmentName_EN"] = "Not found";
            }
            callback(thesisData)
        }
    );
}

function getFullThesis(input, callback) {
    let thesisData = JSON.parse(JSON.stringify(input));
    console.log("getFullThesis for " + thesisData.thesisName)
    let academicLevelId_tmp = null;
    let positionId_tmp = null;
    let departmentId_tmp = null;
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(thesisData.researcherId), this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                thesisData["researcherId"] = functionCallback._id;
                thesisData["researcherName_TH"] = functionCallback.researcherName_TH;
                thesisData["researcherName_EN"] = functionCallback.researcherName_EN;
                academicLevelId_tmp = functionCallback.academicLevelId;
                positionId_tmp = functionCallback.positionId;
                departmentId_tmp = functionCallback.departmentId;
            }
            else {
                thesisData["researcherName_TH"] = "Not found";
                thesisData["researcherName_EN"] = "Not found";
            }
            Position_Control.checkPositionByID(new ObjectId(positionId_tmp), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                thesisData["positionData"] = functionCallback;
            }
            else {
                thesisData["positionData"] = [];
            }
            AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(academicLevelId_tmp), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["academicLevelData"] = functionCallback
            }
            else {
                researcherData["academicLevelData"] = [];
            }
            Department_Control.checkDepartmentByID(new ObjectId(departmentId_tmp), this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                thesisData["departmentName_TH"] = functionCallback.departmentName_TH;
                thesisData["departmentName_EN"] = functionCallback.departmentName_EN;
            }
            else {
                thesisData["departmentName_TH"] = "Not found";
                thesisData["departmentName_EN"] = "Not found";
            }
            BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(researcherData.bachelorDepartmentId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["bachelorTeachingDepartmentName_TH"] = functionCallback.bachelorTeachingDepartmentName_TH;
                researcherData["bachelorTeachingDepartmentName_EN"] = functionCallback.bachelorTeachingDepartmentName_EN;
            }
            else {
                researcherData["bachelorTeachingDepartmentName_TH"] = "Not found";
                researcherData["bachelorTeachingDepartmentName_EN"] = "Not found";
            }
            MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(researcherData.masterDepartmentId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["masterTeachingDepartmentName_TH"] = functionCallback.masterTeachingDepartmentName_TH;
                researcherData["masterTeachingDepartmentName_EN"] = functionCallback.masterTeachingDepartmentName_EN;
            }
            else {
                researcherData["masterTeachingDepartmentName_TH"] = "Not found";
                researcherData["masterTeachingDepartmentName_EN"] = "Not found";
            }
            DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(researcherData.doctoryDepartmentId), this);
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



