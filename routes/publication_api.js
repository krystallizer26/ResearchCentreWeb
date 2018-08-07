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
let Publication = require('../model/publication_model.js');

//Controller
let Researcher_Control = require("../controller/researcher_control.js");
let Position_Control = require("../controller/position_control.js");
let Keyword_Control = require("../controller/keyword_control.js");
let AcademicLevel_Control = require("../controller/academicLevel_control.js");
let Department_Control = require("../controller/department_control.js");
let BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
let MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
let DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");
let Publication_Control = require("../controller/publication_control.js");

router.post('/newPublication', function (request, response) {
    let methodCode = "45";

    let requiredData = [];
    requiredData.push(request.body.publicationName);
    requiredData.push(request.body.researcherPersonalID);
    requiredData.push(request.body.researcherName);
    let requiredReady = Validate.requiredData_Check(requiredData);

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                let publication = new Publication();
                publication.researcherName = Validate.scrappingCleanUp(request.body.researcherName)
                publication.researcherPersonalID = Validate.scrappingCleanUp(request.body.researcherPersonalID)
                publication.publicationName = Validate.scrappingCleanUp(request.body.publicationName)
                publication.publicationAuthor = Validate.scrappingCleanUp(request.body.publicationAuthor)
                publication.publishLocation = Validate.scrappingCleanUp(request.body.publishLocation)
                publication.publishYear = Validate.scrappingCleanUp(request.body.publishYear)
                publication.publishType_raw = Validate.scrappingCleanUp(request.body.publishType_raw)
                publication.publishType = "Others"
                if (publication.publishType_raw == "วารสารฯ ระดับนานาชาติ")
                    publication.publishType = "InternationalJournal"
                if (publication.publishType_raw == "การประชุมฯ ระดับนานาชาติ")
                    publication.publishType = "InternationalConference"
                if (publication.publishType_raw == "การประชุมฯ ระดับชาติ")
                    publication.publishType = "NationalConference"
                if (publication.publishType_raw == "วารสารฯ ระดับชาติ")
                    publication.publishType = "NationalJournal"
                publication.scholarType = Validate.scrappingCleanUp(request.body.scholarType)
                publication.address = Validate.scrappingCleanUp(request.body.address)
                publication.publicationDatabase = Validate.scrappingCleanUp(request.body.publicationDatabase)
                publication.impactFactor = Validate.scrappingCleanUp(request.body.impactFactor)
                publication.quartile = Validate.scrappingCleanUp(request.body.quartile)
                publication.weight = Validate.scrappingCleanUp(request.body.weight)
                publication.detail = Validate.scrappingCleanUp(request.body.detail)

                publication.studentName = Validate.scrappingCleanUp(request.body.studentName)
                publication.bachelorTeachingDepartmentName_TH = Validate.scrappingCleanUp(request.body.bachelorTeachingDepartmentName_TH)
                publication.masterTeachingDepartmentName_TH = Validate.scrappingCleanUp(request.body.masterTeachingDepartmentName_TH)
                publication.doctoryTeachingDepartmentName_TH = Validate.scrappingCleanUp(request.body.doctoryTeachingDepartmentName_TH)
                publication.graduationYear = Validate.scrappingCleanUp(request.body.graduationYear)
                publication.publicationRaw = Validate.scrappingCleanUp(request.body.doi)

                Publication_Control.newPublication_fromScrap(publication, this);

            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New Publication was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

// router.post('/editPublication/', function (request, response) {
//     let methodCode = "46";

//     let requiredData = [];
//     requiredData.push(request.body.publicationId);
//     requiredData.push(request.body.publicationName);
//     requiredData.push(request.body.researcherId);
//     let requiredReady = Validate.requiredData_Check(requiredData)

//     let objectIdData = [];
//     objectIdData.push(request.body.publicationId);
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
//                 Publication_Control.checkPublicationByID(new ObjectId(request.body.publicationId), this);
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
//                     let publication = new Publication();
//                     publication.researcherId = request.body.researcherId;
//                     publication.publicationName = request.body.publicationName;
//                     publication.publishLocation = request.body.publishLocation;
//                     publication.publishYear = request.body.publishYear;
//                     publication.publishType = request.body.publishType;
//                     publication.scholarType = request.body.scholarType;
//                     publication.address = request.body.address;
//                     publication.publicationDatabase = request.body.publicationDatabase;
//                     publication.impactFactor = request.body.impactFactor;
//                     publication.quartile = request.body.quartile;
//                     publication.weight = request.body.weight;
//                     publication.detail = request.body.detail;
//                     publication.studentName = request.body.studentName;
//                     publication.bachelorDepartment = request.body.bachelorDepartment;
//                     publication.masterDepartment = request.body.masterDepartment;
//                     publication.doctoryDepartment = request.body.doctoryDepartment;
//                     Publication_Control.updatePublicationByID(new ObjectId(request.body.publicationId), publication, this);
//                 }
//             }, function (code, err, result) {
//                 if (code != "452") {
//                     Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
//                 }
//                 else {
//                     Return_Control.responseWithCode(ReturnCode.success, "Publication with _id: " + request.body.publicationId + " has updated successfully.", response);
//                 }
//             }
//         );
//     }
// });

router.post('/getAllPublicationPreview/', function (request, response) {
    let methodCode = "47";

    flow.exec(
        function () {
            Publication_Control.getAllPublicationPreview(this);
        }, function (code, err, functionCallback) {
            if (code === "591") {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else if (code === "592") {
                Publication_Control.getAllFullPublicationDataPreview(functionCallback, this);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "No Publication Founded", [], response)
            }
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                console.log("READY !!")
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Publication Completed", functionCallback, response)
            }
        }
    );
});

router.post('/getAllPublicationPreviewByResearcherId/', function (request, response) {
    let methodCode = "51";

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
    }
    else if (!numberReady) {
        let alert = "Input Not Valid, check if some data have to be number.";
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "002", alert, response)
    }
    else {
        flow.exec(
            function () {
                Publication_Control.getAllPublicationPreviewByResearcherId(request.body.researcherId, parseInt(request.body.limit), this);
            }, function (code, err, functionCallback) {
                if (code === "611") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else if (code === "612") {
                    Publication_Control.getAllFullPublicationDataPreview(functionCallback, this);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "No Publication Founded", [], response)
                }
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Publication Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/getPublicationfromID/', function (request, response) {
    let methodCode = "48";

    let requiredData = [];
    requiredData.push(request.body.publicationId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.publicationId);
    let objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        let alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Publication_Control.checkPublicationByID(new ObjectId(request.body.publicationId), query, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Publication_Control.getFullPublicationData(functionCallback, this);
                }
            }, function (code, err, functionCallback) {
                //console.log("functionCallback: "+ JSON.stringify(functionCallback))
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get Researcher with _id " + request.body.researcherId + " Completed", functionCallback, response)
            }
        );
    }
});

router.post('/deletePublication/', function (request, response) {
    let methodCode = "49";

    let requiredData = [];
    requiredData.push(request.body.publicationId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.publicationId);
    let objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        let alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Publication_Control.checkPublicationByID(new ObjectId(request.body.publicationId), this);
            }, function (code, err, result) {
                if (code != "232") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Publication_Control.deletePublicationByID(new ObjectId(request.body.publicationId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Publication_Control with _id: " + request.body.publicationId + " has deleted successfully.", response);
                }
            }
        );
    }
});

router.get('/wipePublication/', function (request, response) {
    let methodCode = "64";

    flow.exec(
        function () {
            Publication_Control.wipePublication(this);

        }, function (code, err, result) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCode(ReturnCode.success, "All Publication has been deleted successfully.", response);
            }
        }
    );
});

module.exports = router;

//-----------------------------------------------------------------------------