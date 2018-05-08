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
var Researcher = require('../model/researcher_model.js');

//Controller
var Researcher_Control = require("../controller/researcher_control.js");
var Position_Control = require("../controller/position_control.js");
var Keyword_Control = require("../controller/keyword_control.js");
var AcademicLevel_Control = require("../controller/academicLevel_control.js");
var Department_Control = require("../controller/department_control.js");
var BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
var MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
var DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");

router.post('/newResearcher_EachScrap', function (request, response) {
    var methodCode = "36";

    flow.exec(
        function () {
            var researcher = new Researcher();
            researcher.researcherName_TH = Validate.scrappingCleanUp(request.body.researcherName_TH)
            researcher.researcherName_EN = Validate.scrappingCleanUp(request.body.researcherName_EN)
            researcher.personalID = request.body.personalID
            researcher.departmentName_TH = Validate.scrappingCleanUp(request.body.departmentName_TH)
            researcher.academicPositionName_TH = Validate.scrappingCleanUp(request.body.academicPositionName_TH)
            researcher.academicPositionName_EN = Validate.scrappingCleanUp(request.body.academicPositionName_EN)
            researcher.positionName_TH = Validate.scrappingCleanUp(request.body.positionName_TH)
            researcher.bachelorGraduation = Validate.scrappingCleanUp(request.body.bachelorGraduation)
            researcher.masterGraduation = Validate.scrappingCleanUp(request.body.masterGraduation)
            researcher.doctoralGraduation = Validate.scrappingCleanUp(request.body.doctoralGraduation)
            researcher.assignDate = request.body.assignDate
            researcher.birthDate = request.body.birthDate
            researcher.retirementStatus = request.body.retirementStatus
            researcher.target = Validate.scrappingCleanUp(request.body.target)

            researcher.bachelorTeachingDepartmentName_TH = Validate.scrappingCleanUp(request.body.bachelorTeachingDepartmentName_TH)
            researcher.bachelor_AcademicYear = request.body.bachelor_AcademicYear
            researcher.bachelor_FacultyBoard_Comment = request.body.bachelor_FacultyBoard_Comment
            researcher.bachelor_CouncilBoard_Comment = request.body.bachelor_CouncilBoard_Comment
            researcher.bachelor_InstituteBoard_Comment = request.body.bachelor_InstituteBoard_Comment

            researcher.masterTeachingDepartmentName_TH = Validate.scrappingCleanUp(request.body.masterTeachingDepartmentName_TH)
            researcher.master_AcademicYear = request.body.master_AcademicYear
            researcher.master_FacultyBoard_Comment = request.body.master_FacultyBoard_Comment
            researcher.master_CouncilBoard_Comment = request.body.master_CouncilBoard_Comment
            researcher.master_InstituteBoard_Comment = request.body.master_InstituteBoard_Comment

            researcher.doctoryTeachingDepartmentName_TH = Validate.scrappingCleanUp(request.body.doctoryTeachingDepartmentName_TH)
            researcher.doctory_AcademicYear = request.body.doctory_AcademicYear
            researcher.doctory_FacultyBoard_Comment = request.body.doctory_FacultyBoard_Comment
            researcher.doctory_CouncilBoard_Comment = request.body.doctory_CouncilBoard_Comment
            researcher.doctory_InstituteBoard_Comment = request.body.doctory_InstituteBoard_Comment

            researcher.keyword1_TH = Validate.scrappingCleanUp(request.body.keyword1_TH)
            researcher.keyword2_TH = Validate.scrappingCleanUp(request.body.keyword2_TH)
            researcher.keyword3_TH = Validate.scrappingCleanUp(request.body.keyword3_TH)
            researcher.keyword4_TH = Validate.scrappingCleanUp(request.body.keyword4_TH)
            researcher.keyword5_TH = Validate.scrappingCleanUp(request.body.keyword5_TH)
            researcher.keyword1_EN = Validate.scrappingCleanUp(request.body.keyword1_EN)
            researcher.keyword2_EN = Validate.scrappingCleanUp(request.body.keyword2_EN)
            researcher.keyword3_EN = Validate.scrappingCleanUp(request.body.keyword3_EN)
            researcher.keyword4_EN = Validate.scrappingCleanUp(request.body.keyword4_EN)
            researcher.keyword5_EN = Validate.scrappingCleanUp(request.body.keyword5_EN)

            researcher.scopusBefore2560 = request.body.scopusBefore2560
            researcher.citationBefore2560 = request.body.citationBefore2560
            researcher.hIndex = request.body.hIndex

            researcher.citationTotal = request.body.citationTotal
            researcher.citationAfter2560 = request.body.citationAfter2560
            researcher.citationLifeTime = request.body.citationLifeTime
            researcher.citationTCI = request.body.citationTCI

            researcher.publicationTotal = request.body.publicationTotal
            researcher.publication2560 = request.body.publication2560
            researcher.publicationLifeTime = request.body.publicationLifeTime
            researcher.publicationTCI = request.body.publicationTCI

            researcher.researcherPic = request.body.researcherPic

            Researcher_Control.newResearcher_fromScrap(researcher, this);

        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "New Researcher was saved successfully as _id defined", functionCallback._id, response);
            }
        }
    );
});

router.post('/newResearcher_bulk', function (request, response) {
    var methodCode = "50";

    var requiredData = [];
    requiredData.push(request.body.researcherData);
    var requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required.";
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        let researcherData = JSON.parse(request.body.researcherData);
        researcherData = researcherData.feed.entry;

        let researcherCount = researcherData.length;
        console.log("Inserting " + researcherCount + " researchers");

        var counter = [];
        for (let i = 0; i < researcherCount; i++) {
            counter.push(i);
        }

        let currentPos = 0;
        flow.serialForEach(counter, function (val) {
            currentPos = val

            var researcher = new Researcher();
            researcher.researcherName_TH = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$ชื่อ"]["$t"])
            researcher.researcherName_EN = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$name"]["$t"])
            researcher.personalID = researcherData[currentPos]["gsx$_cokwr"]["$t"]
            researcher.departmentName_TH = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$ภาควิชา"]["$t"])
            researcher.academicPositionName_TH = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$ตำแหน่งวิชาการ"]["$t"])
            researcher.academicPositionName_EN = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$academicposition"]["$t"])
            researcher.positionName_TH = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$ตำแหน่งงาน"]["$t"])
            researcher.bachelorGraduation = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$ปริญญาตรีปีที่จบประเทศ"]["$t"])
            researcher.masterGraduation = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$ปริญญาโทปีที่จบประเทศ"]["$t"])
            researcher.doctoralGraduation = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$ปริญญาตเอกปีที่จบประเทศ"]["$t"])
            researcher.assignDate = researcherData[currentPos]["gsx$วันที่บรรจุ"]["$t"]
            researcher.birthDate = researcherData[currentPos]["gsx$วันเดือนปีเกิด"]["$t"]
            researcher.retirementStatus = researcherData[currentPos]["gsx$สถานภาพเกษียณ"]["$t"]
            researcher.target = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$อุตสาหกรรมเป้าหมาย"]["$t"])

            researcher.bachelorTeachingDepartmentName_TH = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$อาจารย์ประจำหลักสูตรป.ตรี"]["$t"])
            researcher.bachelor_AcademicYear = researcherData[currentPos]["gsx$เริ่มใช้ปีการศึกษา"]["$t"]
            researcher.bachelor_FacultyBoard_Comment = researcherData[currentPos]["gsx$มติกรรมการคณะวิทยาศาสตร์"]["$t"]
            researcher.bachelor_CouncilBoard_Comment = researcherData[currentPos]["gsx$มติกรรมการสภาวิชาการ"]["$t"]
            researcher.bachelor_InstituteBoard_Comment = researcherData[currentPos]["gsx$มติกรรมการสภาสถาบัน"]["$t"]

            researcher.masterTeachingDepartmentName_TH = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$อาจารย์ประจำหลักสูตรป.โท"]["$t"])
            researcher.master_AcademicYear = researcherData[currentPos]["gsx$เร่ิมใช้ปีการศึกษา"]["$t"]
            researcher.master_FacultyBoard_Comment = researcherData[currentPos]["gsx$มติกรรมการคณะวิทยาศาสตร์_2"]["$t"]
            researcher.master_CouncilBoard_Comment = researcherData[currentPos]["gsx$มติกรรมการสภาวิชาการ_2"]["$t"]
            researcher.master_InstituteBoard_Comment = researcherData[currentPos]["gsx$มติกรรมการสภาสถาบัน_2"]["$t"]

            researcher.doctoryTeachingDepartmentName_TH = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$อาจารย์ประจำหลักสูตรป.เอก"]["$t"])
            researcher.doctory_AcademicYear = researcherData[currentPos]["gsx$เร่ิมใช้ปีการศึกษา_2"]["$t"]
            researcher.doctory_FacultyBoard_Comment = researcherData[currentPos]["gsx$มติกรรมการคณะวิทยาศาสตร์_3"]["$t"]
            researcher.doctory_CouncilBoard_Comment = researcherData[currentPos]["gsx$มติกรรมการสภาวิชาการ_3"]["$t"]
            researcher.doctory_InstituteBoard_Comment = researcherData[currentPos]["gsx$มติกรรมการสภาสถาบัน_3"]["$t"]

            researcher.keyword1_TH = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ1"]["$t"])
            researcher.keyword2_TH = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ2"]["$t"])
            researcher.keyword3_TH = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ3"]["$t"])
            researcher.keyword4_TH = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ4"]["$t"])
            researcher.keyword5_TH = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ5"]["$t"])
            researcher.keyword1_EN = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword1"]["$t"])
            researcher.keyword2_EN = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword2"]["$t"])
            researcher.keyword3_EN = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword3"]["$t"])
            researcher.keyword4_EN = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword4"]["$t"])
            researcher.keyword5_EN = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword5"]["$t"])

            researcher.scopusBefore2560 = researcherData[currentPos]["gsx$scopus2556-2560"]["$t"]
            researcher.citationBefore2560 = researcherData[currentPos]["gsx$citation2556-2560"]["$t"]
            researcher.hIndex = researcherData[currentPos]["gsx$h-index"]["$t"]

            researcher.citationTotal = researcherData[currentPos]["gsx$totalcitation"]["$t"]
            researcher.citationAfter2560 = researcherData[currentPos]["gsx$citation2016"]["$t"]
            researcher.citationLifeTime = researcherData[currentPos]["gsx$life-timecitation"]["$t"]
            researcher.citationTCI = researcherData[currentPos]["gsx$tci"]["$t"]

            researcher.publicationTotal = researcherData[currentPos]["gsx$totalpublication"]["$t"]
            researcher.publication2560 = researcherData[currentPos]["gsx$publicationin2017"]["$t"]
            researcher.publicationLifeTime = researcherData[currentPos]["gsx$life-timepublication"]["$t"]
            researcher.publicationTCI = researcherData[currentPos]["gsx$tci_2"]["$t"]

            Researcher_Control.newResearcher_fromScrap(researcher, this);

        }, function (code, err, finctionCallback) {
            // do nothing after each loop
        }, function () {
            Return_Control.responseWithCode(ReturnCode.success, "New Researcher(s) was saved successfully", response);
        });
    }
});

// router.post('/editResearcher/', function (request, response) {
//     var methodCode = "39";

//     var requiredData = [];
//     requiredData.push(request.body.researcherId);
//     requiredData.push(request.body.researcherFName_TH);
//     requiredData.push(request.body.researcherFName_EN);
//     requiredData.push(request.body.researcherLName_TH);
//     requiredData.push(request.body.researcherLName_EN);
//     requiredData.push(request.body.gender);
//     requiredData.push(request.body.personalID);
//     requiredData.push(request.body.departmentId);
//     requiredData.push(request.body.positionId);
//     requiredData.push(request.body.academicLevelId);
//     var requiredReady = Validate.requiredData_Check(requiredData)

//     var booleanData = [];
//     booleanData.push(request.body.retirementStatus);
//     var booleanReady = Validate.booleanData_Check(booleanData)

//     var objectIdData = [];
//     objectIdData.push(request.body.researcherId);
//     objectIdData.push(request.body.academicLevelId);
//     objectIdData.push(request.body.departmentId);
//     objectIdData.push(request.body.positionId);
//     var objectIdReady = Validate.objectIDData_Check(objectIdData)

//     var numberData = [];
//     numberData.push(request.body.personalID);
//     var numberReady = Validate.numberData_Check(numberData)

//     if (!requiredReady) {
//         var alert = "Input Not Valid, check if some data is required."
//         console.log(alert);
//         Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
//     }
//     else if (!booleanReady) {
//         var alert = "Input Not Valid, check if some data is not boolean."
//         console.log(alert);
//         Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "002", alert, response)
//     }
//     else if (!objectIdReady) {
//         var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
//         console.log(alert);
//         Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
//     }
//     else if (!numberReady) {
//         var alert = "Input Not Valid, check if some data must contain only numeric character."
//         console.log(alert);
//         Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "004", alert, response)
//     }
//     else if (request.body.personalID.length != 13) {
//         var alert = "Input Not Valid, check if personalId is in a correct pattern. (13 numeric-only character)"
//         console.log(alert);
//         Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "005", alert, response)
//     }
//     else {
//         flow.exec(
//             function () {
//                 Department_Control.checkDepartmentByID(new ObjectId(request.body.departmentId), this);
//             }, function (code, err, functionCallback) {
//                 if (err) {
//                     Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
//                 }
//                 else {
//                     Position_Control.checkPositionByID(new ObjectId(request.body.positionId), this);
//                 }
//             }, function (code, err, functionCallback) {
//                 if (err) {
//                     Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
//                 }
//                 else {
//                     AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(request.body.academicLevelId), this);
//                 }
//             }, function (code, err, functionCallback) {
//                 if (err) {
//                     Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
//                 }
//                 else {
//                     let query = { "_id": true }
//                     Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), query, this);
//                 }
//             }, function (code, err, result) {
//                 if (err) {
//                     Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
//                 }
//                 else {
//                     let query = {
//                         $set: {
//                             "researcherFName_TH": request.body.researcherFName_TH,
//                             "researcherFName_EN": request.body.researcherFName_EN,
//                             "researcherLName_TH": request.body.researcherLName_TH,
//                             "researcherLName_EN": request.body.researcherLName_EN,
//                             "gender": request.body.gender,
//                             "personalID": request.body.personalID,
//                             "birthDate": request.body.birthDate,
//                             "departmentId": request.body.departmentId,
//                             "positionId": request.body.positionId,
//                             "academicLevelId": request.body.academicLevelId,
//                             "bachelorGraduation": request.body.bachelorGraduation,
//                             "masterGraduation": request.body.masterGraduation,
//                             "doctoralGraduation": request.body.doctoralGraduation,
//                             "target": request.body.target,
//                             "assignDate": request.body.assignDate,
//                             "retirementStatus": request.body.retirementStatus,
//                             "researcherPic": request.body.researcherPic,
//                             "editedDate": Date.now()
//                         }
//                     }
//                     Researcher_Control.updateResearcherByID(new ObjectId(request.body.researcherId), query, this);
//                 }
//             }, function (code, err, result) {
//                 if (err) {
//                     Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
//                 }
//                 else {
//                     Return_Control.responseWithCode(ReturnCode.success, "Researcher with _id: " + request.body.researcherId + " has updated successfully.", response);
//                 }
//             }
//         );
//     }
// });

router.post('/getAllResearcherPreview/', function (request, response) {
    var methodCode = "44";

    flow.exec(
        function () {
            Researcher_Control.getAllResearcherPreview(this);
        }, function (code, err, functionCallback) {
            if (code === "431") {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else if (code === "432") {
                Researcher_Control.getAllFullResearcherDataPreview(functionCallback, this);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "No Researcher Founded", [], response)
            }
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Researcher Completed", functionCallback, response)
            }
        }
    );
});

router.post('/getResearcherfromID/', function (request, response) {
    var methodCode = "42";

    var requiredData = [];
    requiredData.push(request.body.researcherId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.researcherId);
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
                Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), query, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Researcher_Control.getFullResearcherData(functionCallback, this);
                }
            }, function (code, err, functionCallback) {
                //console.log("functionCallback: "+ JSON.stringify(functionCallback))
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get Researcher with _id " + request.body.researcherId + " Completed", functionCallback, response)
            }
        );
    }
});

router.post('/deleteResearcher/', function (request, response) {
    var methodCode = "43";

    var requiredData = [];
    requiredData.push(request.body.researcherId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.researcherId);
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
                let query = { "_id": true }
                Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), this);
            }, function (code, err, result) {
                if (code != "382") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Researcher_Control.deleteResearcherByID(new ObjectId(request.body.researcherId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Researcher with _id: " + request.body.researcherId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------

function next(callback) {
    callback(0)
}