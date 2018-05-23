var flow = require('../services/flow.js')
var ObjectId = require('mongodb').ObjectId;

var Thesis = require('../model/thesis_model.js');
var Researcher_Control = require("../controller/researcher_control.js");

module.exports = {
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
                    console.log("Researcher with Name " + thesis.researcherName + " not found for Thesis named " + thesis.thesisName_TH)
                    thesis.researcherId = "111111111111111111111111"
                }
                MasterTeachingDepartment_Control.checkAndInsertMasterTeachingByMasterTeachingDepartmentName(thesis.masterDepartmentName, thesis.masterDepartmentName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    thesis.masterDepartmentId = functionCallback._id
                }
                else {
                    thesis.masterDepartmentId = null
                }
                DoctoryTeachingDepartment_Control.checkAndInsertDoctoryTeachingByDoctoryTeachingDepartmentName(thesis.doctoryDepartmentName, thesis.doctoryDepartmentName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    thesis.doctoryDepartmentId = functionCallback._id
                }
                else {
                    thesis.doctoryDepartmentId = null
                }

                thesis.save(function (error, saveResponse) {
                    if (error) {
                        let errCode = "772";
                        var alert = "Saving Thesis fail, Error: " + error.message + "@" + thesis.thesisName_TH;
                        console.log("ERROR Code: " + errCode + " " + alert);
                        callback(errCode, alert, null);
                    }
                    else {
                        callback("773", null, saveResponse)
                    }
                });
            }
        );
    },

    getAllThesisPreview: function (callback) {
        Thesis.find({}, {
            "_id": true,
            "researcherId": true,
            "studentName": true,
            "masterDepartmentId": true,
            "doctoryDepartmentId": true,
            "thesisName_TH": true,
            "thesisName_EN": true,
            "coProfessor1": true,
            "coProfessor2": true
        }, function (error, functionCallback) {
            if (error) {
                let errCode = "781";
                var alert = "Error in getAllThesisPreview , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback.length > 0) {
                let errCode = "782";
                var alert = "Get All Thesis Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "783";
                var alert = "No Thesis Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },

    getAllThesisPreviewByResearcherId: function (researcherId, limitNum, callback) {
        Thesis.find({ "researcherId": researcherId }, {
            "_id": true,
            "researcherId": true,
            "studentName": true,
            "masterDepartmentId": true,
            "doctoryDepartmentId": true,
            "thesisName_TH": true,
            "thesisName_EN": true,
            "coProfessor1": true,
            "coProfessor2": true
        }, { sort: { "thesisName_TH": -1 }, limit: limitNum }
            , function (error, functionCallback) {
                if (error) {
                    let errCode = "791";
                    var alert = "Error in getAllThesisPreviewByResearcherId , Error : " + error.message;
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
                else if (functionCallback.length > 0) {
                    let errCode = "792";
                    var alert = "Get All Thesis Completed! ";
                    //console.log(alert);
                    callback(errCode, null, functionCallback)
                }
                else {
                    let errCode = "793";
                    var alert = "No Thesis Founded";
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
            });
    },

    checkThesisByID: function (thesisId, callback) {
        Thesis.findOne({ "_id": thesisId }, function (error, functionCallback) {
            if (error) {
                let errCode = "801";
                var alert = "Error in finding Thesis with _id: " + thesisId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("802", null, functionCallback)
            }
            else {
                let errCode = "803";
                var alert = "Thesis with _id: " + thesisId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },

    deleteThesisByID: function (thesisId, callback) {
        Thesis.remove({ "_id": thesisId }, function (error, deleteCallback) {
            if (error) {
                let errCode = "811";
                var alert = "Error in deleting Thesis with _id " + thesisId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("812", null, deleteCallback)
            }
        });
    },

    wipeThesis: function (callback) {
        Thesis.remove({}, function (error, deleteCallback) {
            if (error) {
                let errCode = "821";
                var alert = "Error in wiping Thesis Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("822", null, deleteCallback)
            }
        });
    },

    getFullThesisData: function (researcherData, callback) {
        let tmp = JSON.parse(JSON.stringify(researcherData));
        flow.exec(
            function () {
                getFullThesis(researcherData, this);
            }, function (functionCallback) {
                callback("...", null, functionCallback);
            }
        );
    },

    getAllFullThesisDataPreview: function (thesis, callback) {
        let forCallback = [];
        console.log("thesis.length >> " + thesis.length)
        let j = 0;
        if (thesis.length == 0) {
            callback("...", null, []);
        }
        else {
            for (let i = 0; i < thesis.length; i++) {
                getFullThesisPreview(thesis[i], function (a) {
                    //console.log("a >> " + JSON.stringify(a))
                    forCallback.push(a);
                    if (j == thesis.length - 1)
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

function getFullThesisPreview(input, callback) {
    let thesisData = JSON.parse(JSON.stringify(input));
    console.log("getFullThesisPreview for " + thesisData.researchName)
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(thesisData.researcherId), {}, this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                thesisData["researcherName_TH"] = functionCallback.researcherName_TH;
                thesisData["researcherName_EN"] = functionCallback.researcherName_EN;
            }
            else {
                thesisData["researcherName_TH"] = "Not found";
                thesisData["researcherName_EN"] = "Not found";
            }
            MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(thesisData.masterDepartmentId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                thesisData["masterTeachingDepartmentName_TH"] = functionCallback.masterTeachingDepartmentName_TH;
                thesisData["masterTeachingDepartmentName_EN"] = functionCallback.masterTeachingDepartmentName_EN;
            }
            else {
                thesisData["masterTeachingDepartmentName_TH"] = "Not found";
                thesisData["masterTeachingDepartmentName_EN"] = "Not found";
            }
            DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(thesisData.doctoryDepartmentId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                thesisData["doctoryTeachingDepartmentName_TH"] = functionCallback.doctoryTeachingDepartmentName_TH;
                thesisData["doctoryTeachingDepartmentName_EN"] = functionCallback.doctoryTeachingDepartmentName_EN;
            }
            else {
                thesisData["doctoryTeachingDepartmentName_TH"] = "Not found";
                thesisData["doctoryTeachingDepartmentName_EN"] = "Not found";
            }
            callback(thesisData)
        }
    );
}

function getFullThesis(input, callback) {
    let thesisData = JSON.parse(JSON.stringify(input));
    console.log("getFullThesis for " + thesisData.thesisName_TH)
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(thesisData.researcherId), {}, this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                thesisData["researcherName_TH"] = functionCallback.researcherName_TH;
                thesisData["researcherName_EN"] = functionCallback.researcherName_EN;
            }
            else {
                thesisData["researcherName_TH"] = "Not found";
                thesisData["researcherName_EN"] = "Not found";
            }
            MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(thesisData.masterDepartmentId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                thesisData["masterTeachingDepartmentName_TH"] = functionCallback.masterTeachingDepartmentName_TH;
                thesisData["masterTeachingDepartmentName_EN"] = functionCallback.masterTeachingDepartmentName_EN;
            }
            else {
                thesisData["masterTeachingDepartmentName_TH"] = "Not found";
                thesisData["masterTeachingDepartmentName_EN"] = "Not found";
            }
            DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(thesisData.doctoryDepartmentId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                thesisData["doctoryTeachingDepartmentName_TH"] = functionCallback.doctoryTeachingDepartmentName_TH;
                thesisData["doctoryTeachingDepartmentName_EN"] = functionCallback.doctoryTeachingDepartmentName_EN;
            }
            else {
                thesisData["doctoryTeachingDepartmentName_TH"] = "Not found";
                thesisData["doctoryTeachingDepartmentName_EN"] = "Not found";
            }
            callback(thesisData)
        }
    );
}