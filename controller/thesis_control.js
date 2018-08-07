let flow = require('../services/flow.js')
let ObjectId = require('mongodb').ObjectId;

let Thesis = require('../model/thesis_model.js');

let Validate = require("../controller/validation_controller.js");
let Researcher_Control = require("../controller/researcher_control.js");
let Position_Control = require("../controller/position_control.js");
let Keyword_Control = require("../controller/keyword_control.js");
let AcademicLevel_Control = require("../controller/academicLevel_control.js");
let Department_Control = require("../controller/department_control.js");
let BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
let MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
let DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");

module.exports = {
    newThesis: function (thesis, callback) {
        console.log("Saving Thesis: " + thesis.thesisName_TH);

        flow.exec(
            function () {
                Researcher_Control.checkResearcherByPersonalID(thesis.researcherPersonalID, this);
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
                        let alert = "Saving Thesis fail, Error: " + error.message + "@" + thesis.thesisName_TH;
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
    newThesis_fromScrap: function (publication_bulk, callback) {
        let j = 0
        let scrapingData = JSON.parse(JSON.stringify(publication_bulk))

        let thesis = new Thesis();

        let requiredData = [];
        requiredData.push(scrapingData.researcherName);
        let requiredReady = Validate.requiredData_Check(requiredData);

        if (!requiredReady) {
            let alert = "Input Not Valid, check if some data is required."
            console.log(alert);
            callback("New thesis was saved successfully")
        }
        else {
            thesis.researcherName = Validate.scrappingCleanUp(scrapingData.researcherName)
            thesis.researcherPersonalID = Validate.scrappingCleanUp(scrapingData.researcherPersonalID)
            thesis.studentName = Validate.scrappingCleanUp(scrapingData.studentName)
            thesis.studentCode = Validate.scrappingCleanUp(scrapingData.studentCode)
            thesis.studentTel = Validate.scrappingCleanUp(scrapingData.studentTel)
            thesis.studentEmail = Validate.scrappingCleanUp(scrapingData.studentEmail)
            thesis.masterDepartmentName = Validate.scrappingCleanUp(scrapingData.masterDepartmentName)
            thesis.doctoryDepartmentName = Validate.scrappingCleanUp(scrapingData.doctoryDepartmentName)
            thesis.thesisName_TH = Validate.scrappingCleanUp(scrapingData.thesisName_TH)
            thesis.thesisName_EN = Validate.scrappingCleanUp(scrapingData.thesisName_EN)
            thesis.coProfessor1 = Validate.scrappingCleanUp(scrapingData.coProfessor1)
            thesis.coProfessor2 = Validate.scrappingCleanUp(scrapingData.coProfessor2)
            thesis.chiefCommitee = Validate.scrappingCleanUp(scrapingData.chiefCommitee)
            thesis.commitee1 = Validate.scrappingCleanUp(scrapingData.commitee1)
            thesis.commitee2 = Validate.scrappingCleanUp(scrapingData.commitee2)
            thesis.commitee3 = Validate.scrappingCleanUp(scrapingData.commitee3)
            thesis.professorAssignDate = Validate.scrappingCleanUp(scrapingData.professorAssignDate)
            thesis.thesisNameAssignDate = Validate.scrappingCleanUp(scrapingData.thesisNameAssignDate)
            thesis.thesisNameAnnounceDate = Validate.scrappingCleanUp(scrapingData.thesisNameAnnounceDate)
            thesis.qualifyTestDate = Validate.scrappingCleanUp(scrapingData.qualifyTestDate)
            thesis.outlineTestDate = Validate.scrappingCleanUp(scrapingData.outlineTestDate)
            thesis.thesisTestDate = Validate.scrappingCleanUp(scrapingData.thesisTestDate)
            thesis.gradutionDate = Validate.scrappingCleanUp(scrapingData.gradutionDate)
            thesis.gradutionProduct = []
            thesis.gradutionProduct.push(Validate.scrappingCleanUp(scrapingData.gradutionProduct1))
            thesis.gradutionProduct.push(Validate.scrappingCleanUp(scrapingData.gradutionProduct2))
            thesis.gradutionProduct.push(Validate.scrappingCleanUp(scrapingData.gradutionProduct3))

            flow.exec(
                function () {
                    Researcher_Control.checkResearcherByPersonalID(thesis.researcherPersonalID, this);
                }, function (code, err, functionCallback) {
                    if (!err) {
                        thesis.researcherId = functionCallback._id
                    }
                    else {
                        console.log("Researcher with Name " + thesis.researcherName + " not found for Thesis named " + thesis.thesisName_TH)
                        thesis.researcherId = "111111111111111111111111"
                    }
                    MasterTeachingDepartment_Control.checkMasterTeachingDepartmentName(thesis.masterDepartmentName, this);
                }, function (code, err, functionCallback) {
                    if (!err) {
                        thesis.masterDepartmentId = functionCallback._id
                    }
                    else {
                        thesis.masterDepartmentId = null
                    }
                    DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentName(thesis.doctoryDepartmentName, this);
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
                            let alert = "Saving Thesis fail, Error: " + error.message + "@" + thesis.thesisName_TH;
                            console.log("ERROR Code: " + errCode + " " + alert);
                        }
                    });
                    callback("New thesis was saved successfully")
                }
            );
        }
    },

    getAllThesisPreview: function (callback) {
        Thesis.find({}, {
            "_id": true,
            "researcherId": true,
            "studentName": true,
            "studentCode": true,
            "masterDepartmentId": true,
            "doctoryDepartmentId": true,
            "thesisName_TH": true,
            "thesisName_EN": true,
            "coProfessor1": true,
            "coProfessor2": true,
            "thesisNameAssignDate": true,
            "thesisNameAnnounceDate": true,
            "qualifyTestDate": true,
            "outlineTestDate": true,
            "thesisTestDate": true,
            "gradutionDate": true
        }, function (error, functionCallback) {
            if (error) {
                let errCode = "781";
                let alert = "Error in getAllThesisPreview , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback.length > 0) {
                let errCode = "782";
                let alert = "Get All Thesis Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "783";
                let alert = "No Thesis Founded";
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
            "studentCode": true,
            "masterDepartmentId": true,
            "doctoryDepartmentId": true,
            "thesisName_TH": true,
            "thesisName_EN": true,
            "coProfessor1": true,
            "coProfessor2": true,
            "thesisNameAssignDate": true,
            "thesisNameAnnounceDate": true,
            "qualifyTestDate": true,
            "outlineTestDate": true,
            "thesisTestDate": true,
            "gradutionDate": true
        }, { sort: { "thesisName_TH": -1 }, limit: limitNum }
            , function (error, functionCallback) {
                if (error) {
                    let errCode = "791";
                    let alert = "Error in getAllThesisPreviewByResearcherId , Error : " + error.message;
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
                else if (functionCallback.length > 0) {
                    let errCode = "792";
                    let alert = "Get All Thesis Completed! ";
                    //console.log(alert);
                    callback(errCode, null, functionCallback)
                }
                else {
                    let errCode = "793";
                    let alert = "No Thesis Founded";
                    //console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
            });
    },

    checkThesisByID: function (thesisId, callback) {
        Thesis.findOne({ "_id": thesisId }, function (error, functionCallback) {
            if (error) {
                let errCode = "801";
                let alert = "Error in finding Thesis with _id: " + thesisId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("802", null, functionCallback)
            }
            else {
                let errCode = "803";
                let alert = "Thesis with _id: " + thesisId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },

    deleteThesisByID: function (thesisId, callback) {
        Thesis.remove({ "_id": thesisId }, function (error, deleteCallback) {
            if (error) {
                let errCode = "811";
                let alert = "Error in deleting Thesis with _id " + thesisId + " Error: " + error.message;
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
                let alert = "Error in wiping Thesis Error: " + error.message;
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
                //console.log(" >W> " + thesis[i].thesisName_TH)
                getFullThesisPreview(thesis[i], function (a) {
                    //console.log("a >> " + JSON.stringify(a))
                    forCallback[i] = a;
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

let Department_Control = require("../controller/department_control.js");
let Position_Control = require("../controller/position_control.js");
let AcademicLevel_Control = require("../controller/academicLevel_control.js");
let BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
let MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
let DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");

function getFullThesisPreview(input, callback) {
    let thesisData = JSON.parse(JSON.stringify(input));
    console.log("getFullThesisPreview for " + thesisData.thesisName_TH)
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

            thesisData["thesisStatus"] = checkThesisStatus(thesisData);
            thesisData["qeStatus"] = checkQEStatus(thesisData);
            thesisData["studentType"] = checkStudentType(thesisData);

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

            thesisData["thesisStatus"] = checkThesisStatus(thesisData);
            thesisData["qeStatus"] = checkQEStatus(thesisData);
            thesisData["studentType"] = checkStudentType(thesisData);

            callback(thesisData)
        }
    );
}

function checkThesisStatus(thesisData) {
    let status = null;
    if (thesisData.gradutionDate != "")
        status = "จบการศึกษาแล้ว"
    else if (thesisData.thesisTestDate != "")
        status = "ผ่านการสอบวิทยานิพนธ์แล้ว >> รอการจบการศึกษา"
    else if (thesisData.outlineTestDate != "")
        status = "ผ่านการสอบเค้าโครงแล้ว >> รอสอบวิทยานิพนธ์"
    else
        status = "รอการสอบเค้าโครง"
    return status
}

function checkQEStatus(thesisData) {
    let status = null;
    if (thesisData.doctoryTeachingDepartmentName_TH != "") {
        if (thesisData.qualifyTestDate != "")
            status = "ผ่านการสอบคุณสมบัติแล้ว";
        else
            status = "รอสอบคุณสมบัติ";
    }
    else {
        status = "นักศึกษาปริญญาโท ไม่จำเป็นต้องสอบคุณสมบัติ"
    }
    return status
}

function checkStudentType(thesisData) {
    let status = null;
    if (thesisData.doctoryTeachingDepartmentName_TH != "") {
        status = "นักศึกษาปริญญาเอก";
    }
    else {
        status = "นักศึกษาปริญญาโท"
    }
    return status
}