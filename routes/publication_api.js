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
var Publication = require('../model/publication_model.js');

//Controller
var Researcher_Control = require("../controller/researcher_control.js");
var Position_Control = require("../controller/position_control.js");
var Keyword_Control = require("../controller/keyword_control.js");
var AcademicLevel_Control = require("../controller/academicLevel_control.js");
var Department_Control = require("../controller/department_control.js");
var BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
var MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
var DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");
var Publication_Control = require("../controller/publication_control.js");

router.post('/newPublication_EachScrap', function (request, response) {
    var methodCode = "45";

    var requiredData = [];
    requiredData.push(request.body.publicationName);
    requiredData.push(request.body.researcherPersonalID);
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
                var publication = new Publication();
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

router.post('/newPublication_bulk', function (request, response) {
    var methodCode = "51";

    var requiredData = [];
    requiredData.push(request.body.publicationData);
    var requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required.";
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        let publicationData = JSON.parse(request.body.publicationData);
        publicationData = publicationData.feed.entry;

        let researcherCount = publicationData.length;
        console.log("Inserting " + researcherCount + " researchers");

        var counter = [];
        for (let i = 0; i < researcherCount; i++) {
            counter.push(i);
        }

        let currentPos = 0;
        flow.serialForEach(counter, function (val) {
            currentPos = val

            var publication = new Publication();
            publication.researcherName = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$ชื่อ"]["$t"])
            publication.publicationName = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$ชื่อผลงานวิจัย"]["$t"])
            publication.publicationAuthor = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$ชือเจ้าของผลงาน"]["$t"])
            publication.publishLocation = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$แหล่งเผยแพร่ผลงาน"]["$t"])
            publication.publishYear = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$ปีพ.ศ."]["$t"])
            publication.publishType = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$ลักษณะการเผยแพร่"]["$t"])
            publication.scholarType = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$ประเภททุนที่สนับสนุน"]["$t"])
            publication.address = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$address"]["$t"])
            publication.publicationDatabase = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$ฐานข้อมูล"]["$t"])
            publication.impactFactor = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$impactfactor"]["$t"])
            publication.quartile = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$quartile"]["$t"])
            publication.weight = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$ค่าน้ำหนัก"]["$t"])
            publication.detail = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$หมายเหตุ"]["$t"])

            publication.studentName = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$ชื่อนักศึกษา"]["$t"])
            publication.bachelorTeachingDepartmentName_TH = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$หลักสูตรระดับปริญญาตรี"]["$t"])
            publication.masterTeachingDepartmentName_TH = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$หลักสูตรระดับปริญญาโท"]["$t"])
            publication.doctoryTeachingDepartmentName_TH = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$หลักสูตรระดับปริญญาโท_2"]["$t"])
            publication.graduationYear = Validate.scrappingCleanUp(publicationData[currentPos]["gsx$ปีที่สำเร็จการศึกษา"]["$t"])

            Publication_Control.newPublication_fromScrap(publication, this);

        }, function (code, err, finctionCallback) {
            // do nothing after each loop
        }, function () {
            Return_Control.responseWithCode(ReturnCode.success, "New Publication(s) was saved successfully", response);
        });
    }
});

// router.post('/editPublication/', function (request, response) {
//     var methodCode = "46";

//     var requiredData = [];
//     requiredData.push(request.body.publicationId);
//     requiredData.push(request.body.publicationName);
//     requiredData.push(request.body.researcherId);
//     var requiredReady = Validate.requiredData_Check(requiredData)

//     var objectIdData = [];
//     objectIdData.push(request.body.publicationId);
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
//                     var publication = new Publication();
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
    var methodCode = "47";

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
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Publication Completed", functionCallback, response)
            }
        }
    );
});

router.post('/getAllPublicationPreviewByResearcherId/', function (request, response) {
    var methodCode = "51";

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
    var methodCode = "48";

    var requiredData = [];
    requiredData.push(request.body.publicationId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.publicationId);
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
    var methodCode = "49";

    var requiredData = [];
    requiredData.push(request.body.publicationId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.publicationId);
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

router.post('/wipePublication/', function (request, response) {
    var methodCode = "64";

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