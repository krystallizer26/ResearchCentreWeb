var express = require('express');
var router = express.Router();

// DATABASE SETUP
var ObjectId = require('mongodb').ObjectId;


//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests

//Must use
var flow = require('../services/flow.js')
var ReturnCode = require('../model/returnCode.js');
var Validate = require("../controller/validation_controller.js");
var Return_Control = require('../controller/return_control.js');

//Model
var Thesis = require('../model/thesis_model.js');

//Controller
var Researcher_Control = require("../controller/researcher_control.js");
var Position_Control = require("../controller/position_control.js");
var Keyword_Control = require("../controller/keyword_control.js");
var AcademicLevel_Control = require("../controller/academicLevel_control.js");
var Department_Control = require("../controller/department_control.js");
var BachelorDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
var MasterDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
var DoctoryDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");
var Thesis_Control = require("../controller/thesis_control.js");

router.post('/newThesis_EachScrap', function (request, response) {
    var methodCode = "73";

    var requiredData = [];
    requiredData.push(request.body.researcherName);
    var requiredReady = Validate.requiredData_Check(requiredData);

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                var thesis = new Thesis();
                thesis.researcherName = Validate.scrappingCleanUp(request.body.researcherName)
                thesis.researcherPersonalID = Validate.scrappingCleanUp(request.body.researcherPersonalID)
                thesis.studentName = Validate.scrappingCleanUp(request.body.studentName)
                thesis.studentCode = Validate.scrappingCleanUp(request.body.studentCode)
                thesis.studentTel = Validate.scrappingCleanUp(request.body.studentTel)
                thesis.studentEmail = Validate.scrappingCleanUp(request.body.studentEmail)
                thesis.masterDepartmentName = Validate.scrappingCleanUp(request.body.masterDepartmentName)
                thesis.doctoryDepartmentName = Validate.scrappingCleanUp(request.body.doctoryDepartmentName)
                thesis.thesisName_TH = Validate.scrappingCleanUp(request.body.thesisName_TH)
                thesis.thesisName_EN = Validate.scrappingCleanUp(request.body.thesisName_EN)
                thesis.coProfessor1 = Validate.scrappingCleanUp(request.body.coProfessor1)
                thesis.coProfessor2 = Validate.scrappingCleanUp(request.body.coProfessor2)
                thesis.chiefCommitee = Validate.scrappingCleanUp(request.body.chiefCommitee)
                thesis.commitee1 = Validate.scrappingCleanUp(request.body.commitee1)
                thesis.commitee2 = Validate.scrappingCleanUp(request.body.commitee2)
                thesis.commitee3 = Validate.scrappingCleanUp(request.body.commitee3)
                thesis.professorAssignDate = Validate.scrappingCleanUp(request.body.professorAssignDate)
                thesis.thesisNameAssignDate = Validate.scrappingCleanUp(request.body.thesisNameAssignDate)
                thesis.thesisNameAnnounceDate = Validate.scrappingCleanUp(request.body.thesisNameAnnounceDate)
                thesis.qualifyTestDate = Validate.scrappingCleanUp(request.body.qualifyTestDate)
                thesis.outlineTestDate = Validate.scrappingCleanUp(request.body.outlineTestDate)
                thesis.thesisTestDate = Validate.scrappingCleanUp(request.body.thesisTestDate)
                thesis.gradutionDate = Validate.scrappingCleanUp(request.body.gradutionDate)

                Thesis_Control.newThesis_fromScrap(thesis, this);

            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New Thesis was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

// router.post('/editThesis/', function (request, response) {
//     var methodCode = "46";

//     var requiredData = [];
//     requiredData.push(request.body.thesisId);
//     requiredData.push(request.body.thesisName);
//     requiredData.push(request.body.researcherId);
//     var requiredReady = Validate.requiredData_Check(requiredData)

//     var objectIdData = [];
//     objectIdData.push(request.body.thesisId);
//     requiredData.push(request.body.researcherId);
//     requiredData.push(request.body.bachelorDepartment);
//     requiredData.push(request.body.masterDepartment);
//     requiredData.push(request.body.doctoryDepartment);
//     var objectIdReady = Validate.objectIDData_Check(objectIdData)

//     if (!requiredReady) {
//         var alert = "Input Not Valid, check if some data is required."
//         console.log(alert);
//         Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
//     }
//     else if (!objectIdReady) {
//         var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
//         console.log(alert);
//         Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
//     }
//     else {
//         flow.exec(
//             function () {
//                 Thesis_Control.checkThesisByID(new ObjectId(request.body.thesisId), this);
//             }, function (code, err, functionCallback) {
//                 if (code != "462") {
//                     Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
//                 }
//                 else {
//                     Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), this)
//                 }
//             }, function (code, err, functionCallback) {
//                 if (code != "382") {
//                     Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
//                 }
//                 else {
//                     BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorDepartment), this)
//                 }
//             }, function (code, err, functionCallback) {
//                 if (code != "232") {
//                     Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
//                 }
//                 else {
//                     MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(request.body.masterDepartment), this)
//                 }
//             }, function (code, err, functionCallback) {
//                 if (code != "282") {
//                     Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
//                 }
//                 else {
//                     DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryDepartment), this)
//                 }
//             }, function (code, err, result) {
//                 if (code != "332") {
//                     Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
//                 }
//                 else {
//                     var thesis = new Thesis();
//                     thesis.researcherId = request.body.researcherId;
//                     thesis.thesisName = request.body.thesisName;
//                     thesis.publishLocation = request.body.publishLocation;
//                     thesis.publishYear = request.body.publishYear;
//                     thesis.publishType = request.body.publishType;
//                     thesis.scholarType = request.body.scholarType;
//                     thesis.address = request.body.address;
//                     thesis.thesisDatabase = request.body.thesisDatabase;
//                     thesis.impactFactor = request.body.impactFactor;
//                     thesis.quartile = request.body.quartile;
//                     thesis.weight = request.body.weight;
//                     thesis.detail = request.body.detail;
//                     thesis.studentName = request.body.studentName;
//                     thesis.bachelorDepartment = request.body.bachelorDepartment;
//                     thesis.masterDepartment = request.body.masterDepartment;
//                     thesis.doctoryDepartment = request.body.doctoryDepartment;
//                     Thesis_Control.updateThesisByID(new ObjectId(request.body.thesisId), thesis, this);
//                 }
//             }, function (code, err, result) {
//                 if (code != "452") {
//                     Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
//                 }
//                 else {
//                     Return_Control.responseWithCode(ReturnCode.success, "Thesis with _id: " + request.body.thesisId + " has updated successfully.", response);
//                 }
//             }
//         );
//     }
// });

router.post('/getAllThesisPreview/', function (request, response) {
    var methodCode = "74";

    flow.exec(
        function () {
            Thesis_Control.getAllThesisPreview(this);
        }, function (code, err, functionCallback) {
            if (code === "781") {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else if (code === "782") {
                Thesis_Control.getAllFullThesisDataPreview(functionCallback, this);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "No Thesis Founded", [], response)
            }
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Thesis Completed", functionCallback, response)
            }
        }
    );
});

router.post('/getAllThesisPreviewByResearcherId/', function (request, response) {
    var methodCode = "75";

    var requiredData = [];
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.limit);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var numberData = [];
    numberData.push(request.body.limit);
    var numberReady = Validate.numberData_Check(numberData)

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
    else {
        flow.exec(
            function () {
                Thesis_Control.getAllThesisPreviewByResearcherId(request.body.researcherId, parseInt(request.body.limit), this);
            }, function (code, err, functionCallback) {
                if (code === "791") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else if (code === "792") {
                    Thesis_Control.getAllFullThesisDataPreview(functionCallback, this);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "No Thesis Founded", [], response)
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Thesis Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/getThesisfromID/', function (request, response) {
    var methodCode = "76";

    var requiredData = [];
    requiredData.push(request.body.thesisId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.thesisId);
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
                Thesis_Control.checkThesisByID(new ObjectId(request.body.thesisId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Thesis_Control.getFullThesisData(functionCallback, this);
                }
            }, function (code, err, functionCallback) {
                //console.log("functionCallback: "+ JSON.stringify(functionCallback))
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get Thesis with _id " + request.body.thesisId + " Completed", functionCallback, response)
            }
        );
    }
});

router.post('/deleteThesis/', function (request, response) {
    var methodCode = "77";

    var requiredData = [];
    requiredData.push(request.body.thesisId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.thesisId);
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
                Thesis_Control.checkThesisByID(new ObjectId(request.body.thesisId), this);
            }, function (code, err, result) {
                if (code != "802") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Thesis_Control.deleteThesisByID(new ObjectId(request.body.thesisId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Thesis_Control with _id: " + request.body.thesisId + " has deleted successfully.", response);
                }
            }
        );
    }
});

router.post('/wipeThesis/', function (request, response) {
    var methodCode = "78";

    flow.exec(
        function () {
            Thesis_Control.wipeThesis(this);

        }, function (code, err, result) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCode(ReturnCode.success, "All Thesis has been deleted successfully.", response);
            }
        }
    );
});

module.exports = router;

//-----------------------------------------------------------------------------