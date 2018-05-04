var express = require('express');
var router = express.Router();

// DATABASE SETUP
var ObjectId = require('mongodb').ObjectId;


//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests
router.use(function (req, res, next) {
    console.log("\n** Request detected >> " + JSON.stringify(req.body));
    next();
});

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

router.post('/newPublication', function (request, response) {
    var methodCode = "45";

    var requiredData = [];
    requiredData.push(request.body.publicationName);
    requiredData.push(request.body.researcherId);
    var requiredReady = Validate.requiredData_Check(requiredData);

    var objectIdData = [];
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.bachelorDepartment);
    requiredData.push(request.body.masterDepartment);
    requiredData.push(request.body.doctoryDepartment);
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
                Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), this)
            }, function (code, err, functionCallback) {
                if (code != "382") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorDepartment), this)
                }
            }, function (code, err, functionCallback) {
                if (code != "232") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(request.body.masterDepartment), this)
                }
            }, function (code, err, functionCallback) {
                if (code != "282") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryDepartment), this)
                }
            }, function (code, err, functionCallback) {
                if (code != "332") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    var publication = new Publication();
                    publication.researcherId = request.body.researcherId;
                    publication.publicationName = request.body.publicationName;
                    publication.publishLocation = request.body.publishLocation;
                    publication.publishYear = request.body.publishYear;
                    publication.publishType = request.body.publishType;
                    publication.scholarType = request.body.scholarType;
                    publication.address = request.body.address;
                    publication.publicationDatabase = request.body.publicationDatabase;
                    publication.impactFactor = request.body.impactFactor;
                    publication.quartile = request.body.quartile;
                    publication.weight = request.body.weight;
                    publication.detail = request.body.detail;
                    publication.studentName = request.body.studentName;
                    publication.bachelorDepartment = request.body.bachelorDepartment;
                    publication.masterDepartment = request.body.masterDepartment;
                    publication.doctoryDepartment = request.body.doctoryDepartment;

                    Publication_Control.newPublication(publication, this);
                }
            }, function (code, err, functionCallback) {
                if (code != "441") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New Publication was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editPublication/', function (request, response) {
    var methodCode = "46";

    var requiredData = [];
    requiredData.push(request.body.publicationId);
    requiredData.push(request.body.publicationName);
    requiredData.push(request.body.researcherId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.publicationId);
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.bachelorDepartment);
    requiredData.push(request.body.masterDepartment);
    requiredData.push(request.body.doctoryDepartment);
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
            }, function (code, err, functionCallback) {
                if (code != "462") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), this)
                }
            }, function (code, err, functionCallback) {
                if (code != "382") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorDepartment), this)
                }
            }, function (code, err, functionCallback) {
                if (code != "232") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(request.body.masterDepartment), this)
                }
            }, function (code, err, functionCallback) {
                if (code != "282") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryDepartment), this)
                }
            }, function (code, err, result) {
                if (code != "332") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    var publication = new Publication();
                    publication.researcherId = request.body.researcherId;
                    publication.publicationName = request.body.publicationName;
                    publication.publishLocation = request.body.publishLocation;
                    publication.publishYear = request.body.publishYear;
                    publication.publishType = request.body.publishType;
                    publication.scholarType = request.body.scholarType;
                    publication.address = request.body.address;
                    publication.publicationDatabase = request.body.publicationDatabase;
                    publication.impactFactor = request.body.impactFactor;
                    publication.quartile = request.body.quartile;
                    publication.weight = request.body.weight;
                    publication.detail = request.body.detail;
                    publication.studentName = request.body.studentName;
                    publication.bachelorDepartment = request.body.bachelorDepartment;
                    publication.masterDepartment = request.body.masterDepartment;
                    publication.doctoryDepartment = request.body.doctoryDepartment;
                    Publication_Control.updatePublicationByID(new ObjectId(request.body.publicationId), publication, this);
                }
            }, function (code, err, result) {
                if (code != "452") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Publication with _id: " + request.body.publicationId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllPublication/', function (request, response) {
    var methodCode = "47";

    flow.exec(
        function () {
            Publication_Control.getAllPublication(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData("999999", "get All Publication Completed", functionCallback, response)
            }
        }
    );
});

router.post('/getPublicationfromID/', function (request, response) {
    var personel = new Personel();
    var methodCode = "48";

    var thisResearcher;
    var thisPublication;

    var obj = new Object();
    obj.researcherName = "N/A";
    obj.researcherId = "N/A";
    obj.publicationName = "N/A";
    obj.publishLocation = "N/A";
    obj.publishYear = "N/A";
    obj.publishType = "N/A";
    obj.scholarType = "N/A";
    obj.address = "N/A";
    obj.publicationDatabase = "N/A";
    obj.impactFactor = "N/A";
    obj.quartile = "N/A";
    obj.weight = "N/A";
    obj.detail = "N/A";
    obj.studentName = "N/A";
    obj.bachelorDepartment = "N/A";
    obj.masterDepartment = "N/A";
    obj.doctoryDepartment = "N/A";

    var requiredData = [];
    requiredData.push(request.body.publicationId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.publicationId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)


    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                News_Control.checkNewsByID(new ObjectId(request.body.newsID), this);
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    thisNews = result;
                    obj.topicShort = result.topicShort;
                    obj.topicFull = result.topicFull;
                    obj.detailShort = result.detailShort;
                    obj.detailFull = result.detailFull;
                    obj.topicPicture = result.topicPicture;
                    obj.datetimePost = result.datetimePost;
                    obj.datetimeEdit = result.datetimeEdit;
                    obj.author = result.author;
                    obj.readCount = result.readCount;
                    obj.isPinned = result.isPinned;
                    Department_Control.checkDepartmentByID(new ObjectId(thisNews.departmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    obj.departmentName = "N/A";
                }
                else {
                    obj.departmentName = result.departmentName;
                }
                TargetType_Control.checkTargetTypeByID(new ObjectId(thisNews.targetTypeId), this);
            }, function (code, err, result) {
                if (err) {
                    obj.targetTypeName = "N/A";
                }
                else {
                    obj.targetTypeName = result.targetTypeName;
                }
                ResourceType_Control.checkResourceTypeByID(new ObjectId(thisNews.resourceId), this);
            }, function (code, err, result) {
                if (err) {
                    obj.resourceName = "N/A";
                }
                else {
                    obj.resourceName = result.resourceName;
                }
                Tag_Control.checkTagByArrayID(thisNews.tagId, this);
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    console.log("tag" + result)
                    obj.tagData = result;
                    News_Control.countReader(new ObjectId(request.body.newsID), request.body.readCount);
                    Return_control.responseWithCode("999999", obj, response)
                }
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

module.exports = router;

//-----------------------------------------------------------------------------