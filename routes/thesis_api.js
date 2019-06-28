let express = require('express');
let router = express.Router();

// DATABASE SETUP
let ObjectId = require('mongodb').ObjectId;


//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests

//Must use
let flow = require('../services/flow.js')
let ReturnCode = require('../model/returnCode.js');
let Validate = require("../controller/validation_controller.js");
let Return_Control = require('../controller/return_control.js');

//Model
let Thesis = require('../model/thesis_model.js');

//Controller
let Researcher_Control = require("../controller/researcher_control.js");
let Position_Control = require("../controller/position_control.js");
let Keyword_Control = require("../controller/keyword_control.js");
let AcademicLevel_Control = require("../controller/academicLevel_control.js");
let Department_Control = require("../controller/department_control.js");
let BachelorDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
let MasterDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
let DoctoryDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");
let Thesis_Control = require("../controller/thesis_control.js");

router.post('/newThesis_EachScrap', function(request, response) {
    let methodCode = "73";

    let requiredData = [];
    requiredData.push(request.body.researcherName);
    let requiredReady = Validate.requiredData_Check(requiredData);

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    } else {
        flow.exec(
            function() {
                let thesis = new Thesis();
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

            },
            function(code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New Thesis was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

// router.post('/editThesis/', function (request, response) {
//     let methodCode = "46";

//     let requiredData = [];
//     requiredData.push(request.body.thesisId);
//     requiredData.push(request.body.thesisName);
//     requiredData.push(request.body.researcherId);
//     let requiredReady = Validate.requiredData_Check(requiredData)

//     let objectIdData = [];
//     objectIdData.push(request.body.thesisId);
//     requiredData.push(request.body.researcherId);
//     requiredData.push(request.body.bachelorDepartment);
//     requiredData.push(request.body.masterDepartment);
//     requiredData.push(request.body.doctoryDepartment);
//     let objectIdReady = Validate.objectIDData_Check(objectIdData)

//     if (!requiredReady) {
//         let alert = "Input Not Valid, check if some data is required."
//         console.log(alert);
//         Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
//     }
//     else if (!objectIdReady) {
//         let alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
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
//                     let thesis = new Thesis();
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

router.post('/getAllThesisPreview/', function(request, response) {
    let methodCode = "74";

    flow.exec(
        function() {
            Thesis_Control.getAllThesisPreview(this);
        },
        function(code, err, functionCallback) {
            if (code === "781") {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            } else if (code === "782") {
                Thesis_Control.getAllFullThesisDataPreview(functionCallback, this);
            } else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "No Thesis Founded", [], response)
            }
        },
        function(code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            } else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Thesis Completed", functionCallback, response)
            }
        }
    );
});

router.post('/getAllThesis/', function(request, response) {
    let methodCode = "74";

    flow.exec(
        function() {
            Thesis_Control.getAllThesis(this);
        },
        function(code, err, functionCallback) {
            if (code === "781") {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            } else if (code === "782") {
                Thesis_Control.getAllFullThesisDataPreview(functionCallback, this);
            } else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "No Thesis Founded", [], response)
            }
        },
        function(code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            } else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Thesis Completed", functionCallback, response)
            }
        }
    );
});
router.post('/getAllThesisPreviewByResearcherId/', function(request, response) {
    let methodCode = "75";

    let requiredData = [];
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.limit);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let numberData = [];
    numberData.push(request.body.limit);
    let numberReady = Validate.numberData_Check(numberData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required.";
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    } else if (!numberReady) {
        let alert = "Input Not Valid, check if some data have to be number.";
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "002", alert, response)
    } else {
        flow.exec(
            function() {
                Thesis_Control.getAllThesisPreviewByResearcherId(request.body.researcherId, parseInt(request.body.limit), this);
            },
            function(code, err, functionCallback) {
                if (code === "791") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else if (code === "792") {
                    Thesis_Control.getAllFullThesisDataPreview(functionCallback, this);
                } else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "No Thesis Founded", [], response)
                }
            },
            function(code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Thesis Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/getAllThesisByResearcherId/', function(request, response) {
    let methodCode = "75";

    let requiredData = [];
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.limit);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let numberData = [];
    numberData.push(request.body.limit);
    let numberReady = Validate.numberData_Check(numberData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required.";
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    } else if (!numberReady) {
        let alert = "Input Not Valid, check if some data have to be number.";
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "002", alert, response)
    } else {
        flow.exec(
            function() {
                Thesis_Control.getAllThesisByResearcherId(request.body.researcherId, parseInt(request.body.limit), this);
            },
            function(code, err, functionCallback) {
                if (code === "791") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else if (code === "792") {
                    Thesis_Control.getAllFullThesisDataPreview(functionCallback, this);
                } else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "No Thesis Founded", [], response)
                }
            },
            function(code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Thesis Completed", functionCallback, response)
                }
            }
        );
    }
});
router.post('/getThesisfromID/', function(request, response) {
    let methodCode = "76";

    let requiredData = [];
    requiredData.push(request.body.thesisId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.thesisId);
    let objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    } else if (!objectIdReady) {
        let alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    } else {
        flow.exec(
            function() {
                Thesis_Control.checkThesisByID(new ObjectId(request.body.thesisId), this);
            },
            function(code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    Thesis_Control.getFullThesisData(functionCallback, this);
                }
            },
            function(code, err, functionCallback) {
                //console.log("functionCallback: "+ JSON.stringify(functionCallback))
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get Thesis with _id " + request.body.thesisId + " Completed", functionCallback, response)
            }
        );
    }
});

router.post('/deleteThesis/', function(request, response) {
    let methodCode = "77";

    let requiredData = [];
    requiredData.push(request.body.thesisId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.thesisId);
    let objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    } else if (!objectIdReady) {
        let alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    } else {
        flow.exec(
            function() {
                Thesis_Control.checkThesisByID(new ObjectId(request.body.thesisId), this);
            },
            function(code, err, result) {
                if (code != "802") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    Thesis_Control.deleteThesisByID(new ObjectId(request.body.thesisId), this);
                }
            },
            function(code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    Return_Control.responseWithCode(ReturnCode.success, "Thesis_Control with _id: " + request.body.thesisId + " has deleted successfully.", response);
                }
            }
        );
    }
});

router.get('/wipeThesis/', function(request, response) {
    let methodCode = "78";

    flow.exec(
        function() {
            Thesis_Control.wipeThesis(this);

        },
        function(code, err, result) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            } else {
                Return_Control.responseWithCode(ReturnCode.success, "All Thesis has been deleted successfully.", response);
            }
        }
    );
});

// var schedule = require('node-schedule');
// schedule.scheduleJob('0 3 * * *', function(date_called) {
//     Thesis_Control.wipeThesis(function(code, err, result) {
//         console.log("THESIS WIPED")
//     });
// });

module.exports = router;

//-----------------------------------------------------------------------------