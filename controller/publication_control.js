var flow = require('../services/flow.js')
var ObjectId = require('mongodb').ObjectId;

var Publication = require('../model/publication_model.js');
var Researcher_Control = require("../controller/researcher_control.js");

module.exports = {
    newPublication: function (publication, callback) {
        console.log("Saving Publication: " + publication.publicationName_TH);
        publication.save(function (error, saveResponse) {
            console.log("Saving Publication >> COMPLETED ");
            if (error) {
                let errCode = "441";
                var alert = "Saving Publication fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("442", null, saveResponse)
            }
        });
    },
    newPublication_fromScrap: function (publication, callback) {
        console.log("Saving Publication: " + publication.publicationName);

        flow.exec(
            function () {
                Researcher_Control.checkResearcherByResearcherName(publication.researcherName, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    publication.researcherId = functionCallback._id
                }
                else {
                    callback("581", null, null)
                }
                BachelorTeachingDepartment_Control.checkAndInsertBachelorTeachingByBachelorTeachingDepartmentName(publication.bachelorTeachingDepartmentName_TH, publication.bachelorTeachingDepartmentName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    publication.bachelorTeachingDepartmentId = functionCallback._id
                }
                else {
                    publication.bachelorTeachingDepartmentId = null
                }
                MasterTeachingDepartment_Control.checkAndInsertMasterTeachingByMasterTeachingDepartmentName(publication.masterTeachingDepartmentName_TH, publication.masterTeachingDepartmentName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    publication.masterTeachingDepartmentId = functionCallback._id
                }
                else {
                    publication.masterTeachingDepartmentId = null
                }
                DoctoryTeachingDepartment_Control.checkAndInsertDoctoryTeachingByDoctoryTeachingDepartmentName(publication.doctoryTeachingDepartmentName_TH, publication.doctoryTeachingDepartmentName_EN, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    publication.doctoryTeachingDepartmentId = functionCallback._id
                }
                else {
                    publication.doctoryTeachingDepartmentId = null
                }

                publication.save(function (error, saveResponse) {
                    if (error) {
                        let errCode = "582";
                        var alert = "Saving Publication fail, Error: " + error.message;
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
    updatePublicationByID: function (publicationId, publication, callback) {
        var myquery = { "_id": publicationId };
        var newvalues = {
            $set: {
                "researcherId": publication.researcherId,
                "publicationName": publication.publicationName,
                "publishLocation": publication.publishLocation,
                "publishYear": publication.publishYear,
                "publishType": publication.publishType,
                "scholarType": publication.scholarType,
                "address": publication.address,
                "publicationDatabase": publication.publicationDatabase,
                "impactFactor": publication.impactFactor,
                "quartile": publication.quartile,
                "weight": publication.weight,
                "detail": publication.detail,
                "studentName": publication.studentName,
                "bachelorDepartment": publication.bachelorDepartment,
                "masterDepartment": publication.masterDepartment,
                "doctoryDepartment": publication.doctoryDepartment,
                "editedDate": Date.now()
            }
        };
        Publication.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "451";
                var alert = "Error in updating Publication with _id: " + publicationId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("452", null, updateResponse);
        });
    },
    checkPublicationByID: function (publicationId, callback) {
        Publication.findOne({ "_id": publicationId }, function (error, functionCallback) {
            if (error) {
                let errCode = "461";
                var alert = "Error in finding Publication with _id: " + publicationId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("462", null, functionCallback)
            }
            else {
                let errCode = "463";
                var alert = "Publication with _id: " + publicationId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    getAllPublication: function (callback) {
        Publication.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "471";
                var alert = "Error in getAllPublication , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "472";
                var alert = "Get All Publication Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "473";
                var alert = "No Publication Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    deletePublicationByID: function (publicationId, callback) {
        Publication.remove({ "_id": publicationId }, function (error, newsCallback) {
            if (error) {
                let errCode = "481";
                var alert = "Error in deleting Publication with _id " + publicationId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("482", null, newsCallback)
            }
        });
    },
    getAllPublicationPreview: function (callback) {
        Publication.find({}, {
            "_id": true,
            "researcherId": true,
            "publicationName": true,
            "publishLocation": true,
            "publishYear": true,
            "publishType": true,
            "publicationDatabase": true
        }, function (error, functionCallback) {
            if (error) {
                let errCode = "591";
                var alert = "Error in getAllPublicationPreview , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "592";
                var alert = "Get All Publication Completed! ";
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

    getFullPublicationData: function (researcherData, callback) {
        let tmp = JSON.parse(JSON.stringify(researcherData));
        let promotiontmp = null;
        flow.exec(
            function () {
                getFullPublication(researcherData, this);
            }, function (functionCallback) {
                callback("601", null, functionCallback);
            }
        );
    },

    getAllFullPublicationDataPreview: function (pubilcation, callback) {
        var counterArray = []
        var forCallback = []
        for (let i = 0; i < pubilcation.length; i++) {
            counterArray.push(i)
        }
        let currentPos = 0;
        flow.serialForEach(counterArray, function (pos) {
            currentPos = pos;
            //console.log("historyArray[currentPos] " + historyArray[currentPos]);
            getFullPublicationPreview(pubilcation[currentPos], this);
        }, function (functionCallback) {
            forCallback.push(functionCallback);
        }, function () {
            //console.log("callback")
            callback("561", null, forCallback);
        });

    }
};

//---------------------------------------------

var Department_Control = require("../controller/department_control.js");
var Position_Control = require("../controller/position_control.js");
var AcademicLevel_Control = require("../controller/academicLevel_control.js");
var BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
var MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
var DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");

function getFullPublicationPreview(input, callback) {
    let publicationData = JSON.parse(JSON.stringify(input));
    console.log("getFullPublicationPreview for " + publicationData.publicationName)
    let academicLevelId_tmp = null;
    let positionId_tmp = null;
    let departmentId_tmp = null;
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(publicationData.researcherId), this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                publicationData["researcherName_TH"] = functionCallback.researcherName_TH;
                publicationData["researcherName_EN"] = functionCallback.researcherName_EN;
                academicLevelId_tmp = functionCallback.academicLevelId;
                positionId_tmp = functionCallback.positionId;
                departmentId_tmp = functionCallback.departmentId;
            }
            else {
                publicationData["researcherName_TH"] = "Not found";
                publicationData["researcherName_EN"] = "Not found";
            }
            Position_Control.checkPositionByID(new ObjectId(positionId_tmp), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                publicationData["positionName_TH"] = functionCallback.positionName_TH;
                publicationData["positionName_EN"] = functionCallback.positionName_EN;
            }
            else {
                publicationData["positionName_TH"] = "Not found";
                publicationData["positionName_EN"] = "Not found";
            }
            AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(academicLevelId_tmp), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                publicationData["academicLevelName_TH"] = functionCallback.academicLevelName_TH;
                publicationData["academicLevelName_EN"] = functionCallback.academicLevelName_EN;
            }
            else {
                publicationData["academicLevelName_TH"] = "Not found";
                publicationData["academicLevelName_EN"] = "Not found";
            }
            Department_Control.checkDepartmentByID(new ObjectId(departmentId_tmp), this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                publicationData["departmentName_TH"] = functionCallback.departmentName_TH;
                publicationData["departmentName_EN"] = functionCallback.departmentName_EN;
            }
            else {
                publicationData["departmentName_TH"] = "Not found";
                publicationData["departmentName_EN"] = "Not found";
            }
            callback(publicationData)
        }
    );
}

function getFullPublicationPreview(input, callback) {
    let publicationData = JSON.parse(JSON.stringify(input));
    console.log("getFullPublicationPreview for " + publicationData.publicationName)
    let academicLevelId_tmp = null;
    let positionId_tmp = null;
    let departmentId_tmp = null;
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(publicationData.researcherId), this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                publicationData["researcherName_TH"] = functionCallback.researcherName_TH;
                publicationData["researcherName_EN"] = functionCallback.researcherName_EN;
                academicLevelId_tmp = functionCallback.academicLevelId;
                positionId_tmp = functionCallback.positionId;
                departmentId_tmp = functionCallback.departmentId;
            }
            else {
                publicationData["researcherName_TH"] = "Not found";
                publicationData["researcherName_EN"] = "Not found";
            }
            Position_Control.checkPositionByID(new ObjectId(positionId_tmp), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                publicationData["positionName_TH"] = functionCallback.positionName_TH;
                publicationData["positionName_EN"] = functionCallback.positionName_EN;
            }
            else {
                publicationData["positionName_TH"] = "Not found";
                publicationData["positionName_EN"] = "Not found";
            }
            AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(academicLevelId_tmp), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                publicationData["academicLevelName_TH"] = functionCallback.academicLevelName_TH;
                publicationData["academicLevelName_EN"] = functionCallback.academicLevelName_EN;
            }
            else {
                publicationData["academicLevelName_TH"] = "Not found";
                publicationData["academicLevelName_EN"] = "Not found";
            }
            Department_Control.checkDepartmentByID(new ObjectId(departmentId_tmp), this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                publicationData["departmentName_TH"] = functionCallback.departmentName_TH;
                publicationData["departmentName_EN"] = functionCallback.departmentName_EN;
            }
            else {
                publicationData["departmentName_TH"] = "Not found";
                publicationData["departmentName_EN"] = "Not found";
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