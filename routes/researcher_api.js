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
            researcher.researcherName_Combine = Validate.scrappingCleanUp(request.body.researcherName_TH) + " / " + Validate.scrappingCleanUp(request.body.researcherName_EN)
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

            researcher.keywordArray = []
            researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(request.body.keyword1_TH), keyword_EN: Validate.scrappingCleanUp(request.body.keyword1_EN), keyword_Combine: (Validate.scrappingCleanUp(request.body.keyword1_TH) + " / " + Validate.scrappingCleanUp(request.body.keyword1_EN)) })
            researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(request.body.keyword2_TH), keyword_EN: Validate.scrappingCleanUp(request.body.keyword2_EN), keyword_Combine: (Validate.scrappingCleanUp(request.body.keyword2_TH) + " / " + Validate.scrappingCleanUp(request.body.keyword2_EN)) })
            researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(request.body.keyword3_TH), keyword_EN: Validate.scrappingCleanUp(request.body.keyword3_EN), keyword_Combine: (Validate.scrappingCleanUp(request.body.keyword3_TH) + " / " + Validate.scrappingCleanUp(request.body.keyword3_EN)) })
            researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(request.body.keyword4_TH), keyword_EN: Validate.scrappingCleanUp(request.body.keyword4_EN), keyword_Combine: (Validate.scrappingCleanUp(request.body.keyword4_TH) + " / " + Validate.scrappingCleanUp(request.body.keyword4_EN)) })
            researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(request.body.keyword5_TH), keyword_EN: Validate.scrappingCleanUp(request.body.keyword5_EN), keyword_Combine: (Validate.scrappingCleanUp(request.body.keyword5_TH) + " / " + Validate.scrappingCleanUp(request.body.keyword5_EN)) })

            // researcher.keyword1_TH = Validate.scrappingCleanUp(request.body.keyword1_TH)
            // researcher.keyword2_TH = Validate.scrappingCleanUp(request.body.keyword2_TH)
            // researcher.keyword3_TH = Validate.scrappingCleanUp(request.body.keyword3_TH)
            // researcher.keyword4_TH = Validate.scrappingCleanUp(request.body.keyword4_TH)
            // researcher.keyword5_TH = Validate.scrappingCleanUp(request.body.keyword5_TH)

            // researcher.keyword1_EN = Validate.scrappingCleanUp(request.body.keyword1_EN)
            // researcher.keyword2_EN = Validate.scrappingCleanUp(request.body.keyword2_EN)
            // researcher.keyword3_EN = Validate.scrappingCleanUp(request.body.keyword3_EN)
            // researcher.keyword4_EN = Validate.scrappingCleanUp(request.body.keyword4_EN)
            // researcher.keyword5_EN = Validate.scrappingCleanUp(request.body.keyword5_EN)

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
            researcher.researcherName_Combine = Validate.scrappingCleanUp(researcherData[currentPos]["gsx$ชื่อ"]["$t"]) + " / " + Validate.scrappingCleanUp(researcherData[currentPos]["gsx$name"]["$t"])
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

            researcher.keywordArray = []
            researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ1"]["$t"]), keyword_EN: Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword1"]["$t"]), keyword_Combine: (Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ1"]["$t"]) + " / " + Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword1"]["$t"])) })
            researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ2"]["$t"]), keyword_EN: Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword2"]["$t"]), keyword_Combine: (Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ2"]["$t"]) + " / " + Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword2"]["$t"])) })
            researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ3"]["$t"]), keyword_EN: Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword3"]["$t"]), keyword_Combine: (Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ3"]["$t"]) + " / " + Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword3"]["$t"])) })
            researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ4"]["$t"]), keyword_EN: Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword4"]["$t"]), keyword_Combine: (Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ4"]["$t"]) + " / " + Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword4"]["$t"])) })
            researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ5"]["$t"]), keyword_EN: Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword5"]["$t"]), keyword_Combine: (Validate.scrappingCleanUp(researcherData[currentPos]["gsx$คำสำคัญ5"]["$t"]) + " / " + Validate.scrappingCleanUp(researcherData[currentPos]["gsx$keyword5"]["$t"])) })

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
                Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), {}, this);
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

router.post('/getAllResearcherPreview_ai/', function (request, response) {
    response.json([{"_id":"5af1d4bf88b1e23010a32756","researcherName_TH":"ชวาลย์ ศรีวงษ์","keyword5_EN":"Energy storage and alternative materials","keyword4_EN":"Natural rubber-based composite materials","keyword3_EN":"Graphene-based hybrid materials","keyword2_EN":"Nanocomposite materials","keyword1_EN":"Photocatalytic materials","keyword5_TH":"วัสดุทางเลือกและวัสดุกักเก็บพลังงาน","keyword4_TH":"วัสดุผสมยางธรรมชาติ","keyword3_TH":"วัสดุไฮบริด-กราฟีน","keyword2_TH":"วัสดุนาโนคอมโพสิต","keyword1_TH":"วัสดุโฟโตคะตะลิสต์","researcherPic":"","academicLevelId":"5af1c945e6e3503328927994","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e350332892784a","researcherName_EN":"Chaval Sriwong","departmentName_TH":"เคมี","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"อาจารย์","academicLevelName_EN":"Lecturer"},{"_id":"5af1d4bf88b1e23010a3273d","researcherName_TH":"นพรัตน์ โพธิ์ชัย","keyword5_EN":"Numerical Analysis","keyword4_EN":"Nonlivear System","keyword3_EN":"Air model","keyword2_EN":"Water model","keyword1_EN":"Mathematical Model","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"","researcherPic":"","academicLevelId":"5af1c945e6e3503328927982","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"NOPPARAT   POCHAI","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"ผู้ช่วยศาสตราจารย์","academicLevelName_EN":"Assistant Professor"},{"_id":"5af1d4bf88b1e23010a32768","researcherName_TH":"มนตรี  ทองคำ","keyword5_EN":"","keyword4_EN":"","keyword3_EN":"","keyword2_EN":"","keyword1_EN":"","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"","researcherPic":"","academicLevelId":"5af1c945e6e3503328927982","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e350332892784a","researcherName_EN":"Montree  Thongkam","departmentName_TH":"เคมี","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"ผู้ช่วยศาสตราจารย์","academicLevelName_EN":"Assistant Professor"},{"_id":"5af1d4bf88b1e23010a32766","researcherName_TH":"ภัทธาวุธ มนต์วิเศษ","keyword5_EN":"Polymer chemistry","keyword4_EN":"Adhesives","keyword3_EN":"Polymer synthesis","keyword2_EN":"Biopolymer","keyword1_EN":"Hydrogel","keyword5_TH":"เคมีพอลิเมอร์","keyword4_TH":"สารยึดติด","keyword3_TH":"การสังเคราะห์พอลิเมอร์","keyword2_TH":"พอลิเมอร์ชีวภาพ","keyword1_TH":"ไฮโดรเจล","researcherPic":"","academicLevelId":"5af1c945e6e3503328927982","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e350332892784a","researcherName_EN":"Pathavuth Monvisade","departmentName_TH":"เคมี","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"ผู้ช่วยศาสตราจารย์","academicLevelName_EN":"Assistant Professor"},{"_id":"5af1d4bf88b1e23010a32767","researcherName_TH":"ภิเษก รุ่งโรจน์ชัยพร","keyword5_EN":"Catalysl","keyword4_EN":"nanomaterials","keyword3_EN":"Glyceral","keyword2_EN":"Biodiesel","keyword1_EN":"Energy","keyword5_TH":"","keyword4_TH":"คะตะลิสต์","keyword3_TH":"วัสดุนาโน","keyword2_TH":"กลีเซอรอล","keyword1_TH":"พลังงาน","researcherPic":"","academicLevelId":"5af1c945e6e3503328927982","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e350332892784a","researcherName_EN":"Pesak Rungrojchaipon","departmentName_TH":"เคมี","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"ผู้ช่วยศาสตราจารย์","academicLevelName_EN":"Assistant Professor"},{"_id":"5af1d4bf88b1e23010a32748","researcherName_TH":"เดชา สมนะ","keyword5_EN":"","keyword4_EN":"","keyword3_EN":"","keyword2_EN":"","keyword1_EN":"Graph Theory","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"ทฤษฎีกราฟ","researcherPic":"","academicLevelId":"5af1c945e6e3503328927982","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"DECHA   SAMANA","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"ผู้ช่วยศาสตราจารย์","academicLevelName_EN":"Assistant Professor"},{"_id":"5af1d4bf88b1e23010a32750","researcherName_TH":"สิริพร แฮนน่า วินเทอร์","keyword5_EN":"","keyword4_EN":"","keyword3_EN":"","keyword2_EN":"","keyword1_EN":"","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"","researcherPic":"","academicLevelId":"5af1c945e6e3503328927994","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"SIRIPAWN  H.WINTER","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"อาจารย์","academicLevelName_EN":"Lecturer"},{"_id":"5af1d4bf88b1e23010a32752","researcherName_TH":"กนกพร สุพงษ์","keyword5_EN":"","keyword4_EN":"dehydrogenation of Ethanol","keyword3_EN":"acetaldehyde","keyword2_EN":"use of CuFe2O4","keyword1_EN":"catalyst","keyword5_TH":"","keyword4_TH":"ปฏิกิริยาขจัดไฮโรเจนออกจากเอทานอล","keyword3_TH":"อะเซทัลดีไฮด์","keyword2_TH":"การใช้คิวปรัสเฟอร์ไรท์","keyword1_TH":"ตัวเร่งปฏิกิริยา","researcherPic":"","academicLevelId":"5af1c945e6e3503328927986","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e350332892784a","researcherName_EN":"KANOKPORN      SUPONG","departmentName_TH":"เคมี","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"นักวิทยาศาสตร์","academicLevelName_EN":"Scientist"},{"_id":"5af1d4bf88b1e23010a3273f","researcherName_TH":"พุทธพร วานิชกร","keyword5_EN":"","keyword4_EN":"","keyword3_EN":"banach space","keyword2_EN":"point spectum","keyword1_EN":"spectium","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"","researcherPic":"","academicLevelId":"5af1c945e6e3503328927994","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"BUDDHAPORN   VANISHKORN","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"อาจารย์","academicLevelName_EN":"Lecturer"},{"_id":"5af1d4bf88b1e23010a3273c","researcherName_TH":"กัมปนาท นามงาม","keyword5_EN":"","keyword4_EN":"","keyword3_EN":"","keyword2_EN":"","keyword1_EN":"","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"","researcherPic":"","academicLevelId":"5af1c945e6e3503328927994","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"KAMPANAT   NAMNGAM","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"อาจารย์","academicLevelName_EN":"Lecturer"},{"_id":"5af1d4bf88b1e23010a3273e","researcherName_TH":"พันธนี พงศ์สัมพันธ์","keyword5_EN":"","keyword4_EN":"numerical analysis","keyword3_EN":"differential equations","keyword2_EN":"epidemic model","keyword1_EN":"mathematical model","keyword5_TH":"","keyword4_TH":"การวิเคราะห์เชิงตัวเลข","keyword3_TH":"สมการเชิงอนุพันธ์","keyword2_TH":"แบบจำลองการระบาดวิทยา","keyword1_TH":"แบบจำลองเชิงคณิตศาสตร์","researcherPic":"","academicLevelId":"5af1c945e6e3503328927984","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"PUNTANI   PONGSUMPUN","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"รองศาสตราจารย์","academicLevelName_EN":"Academic Officer"},{"_id":"5af1d4bf88b1e23010a32769","researcherName_TH":"รฐวรรธน์       แดงเงิน","keyword5_EN":"","keyword4_EN":"Fluorescent sensor","keyword3_EN":"Dynamics Simulation","keyword2_EN":"Quantum Chemistry","keyword1_EN":"Proton transfer","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"","researcherPic":"","academicLevelId":"5af1c945e6e3503328927994","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e350332892784a","researcherName_EN":"Rathawat Daengngern","departmentName_TH":"เคมี","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"อาจารย์","academicLevelName_EN":"Lecturer"},{"_id":"5af1d4bf88b1e23010a32755","researcherName_TH":"การุณย์ สาดอ่อน","keyword5_EN":"Organic light emitting diodes","keyword4_EN":"Biological activity","keyword3_EN":"Secondary metabolites","keyword2_EN":"Fungi","keyword1_EN":"Natural product","keyword5_TH":"ไดโอดเปล่งแสงอินทรีย์","keyword4_TH":"ฤทธิ์ทางชีวภาพ","keyword3_TH":"เมแทบอไลต์ทุติยภูมิ","keyword2_TH":"เชื้อรา","keyword1_TH":"ผลิตภัณฑ์ธรรมชาติ","researcherPic":"","academicLevelId":"5af1c945e6e3503328927994","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e350332892784a","researcherName_EN":"Karoon Sadorn","departmentName_TH":"เคมี","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"อาจารย์","academicLevelName_EN":"Lecturer"},{"_id":"5af1d4bf88b1e23010a32758","researcherName_TH":"ณัฐวุฒิ เชิงชั้น","keyword5_EN":"Test kit","keyword4_EN":"Flow-based technique","keyword3_EN":"Method development","keyword2_EN":"Instrumentation analysis","keyword1_EN":"Analytical chemistry","keyword5_TH":"ชุดทดสอบภาคสนาม","keyword4_TH":"เทคนิควิเคราะห์ที่อาศัยการไหล","keyword3_TH":"การพัฒนาวิธีวิเคราะห์","keyword2_TH":"การวิเคราะห์เชิงเครื่องมือ","keyword1_TH":"เคมีวิเคราะห์","researcherPic":"","academicLevelId":"5af1c945e6e3503328927982","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e350332892784a","researcherName_EN":"Nathawut Choengchan","departmentName_TH":"เคมี","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"ผู้ช่วยศาสตราจารย์","academicLevelName_EN":"Assistant Professor"},{"_id":"5af1d4bf88b1e23010a3274a","researcherName_TH":"ธวัชชัย คำประภัสสร","keyword5_EN":"Fuzzy and Multiset","keyword4_EN":"Prime Submodules","keyword3_EN":"Prime Ideals","keyword2_EN":"Commutative and Noncommutative Algebra","keyword1_EN":"Module and Ring Theory","keyword5_TH":"ฟัซซีและมัลติเซต","keyword4_TH":"มอดูลย่อยเฉพาะ","keyword3_TH":"ไอดีลเฉพาะ","keyword2_TH":"พีชคณิตสลับที่และไม่สลับที่","keyword1_TH":"ทฤษฎีมอดูลและริง","researcherPic":"","academicLevelId":"5af1c945e6e3503328927982","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"THAWATCHAI   KHUMPRAPUSSORN","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"ผู้ช่วยศาสตราจารย์","academicLevelName_EN":"Assistant Professor"},{"_id":"5af1d4bf88b1e23010a3275e","researcherName_TH":"บรรจง บุญชม","keyword5_EN":"Calcium compounds","keyword4_EN":"Shell wastes","keyword3_EN":"metal phosphate materials","keyword2_EN":"Thermodynamics","keyword1_EN":"Kinetics","keyword5_TH":"สารประกอบแคลเซียมต่างๆ","keyword4_TH":"ขยะเปลือกหอย เปลือกไข่นานาชนิด","keyword3_TH":"สารประกอบโลหะฟอสเฟตต่างๆ","keyword2_TH":"เทอร์โมไดนามิกส์","keyword1_TH":"จลนพลศาสตร์","researcherPic":"","academicLevelId":"5af1c945e6e3503328927982","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e350332892784a","researcherName_EN":"Banjong Boonchom","departmentName_TH":"เคมี","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"ผู้ช่วยศาสตราจารย์","academicLevelName_EN":"Assistant Professor"},{"_id":"5af1d4bf88b1e23010a3274f","researcherName_TH":"ศิริกุล สิริธีรากุล","keyword5_EN":"PED","keyword4_EN":"tremfer","keyword3_EN":"heat","keyword2_EN":"Element","keyword1_EN":"Finite","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"","researcherPic":"","academicLevelId":"5af1c945e6e3503328927994","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"SIRIKUL   SIRITEERAKUL","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"อาจารย์","academicLevelName_EN":"Lecturer"},{"_id":"5af1d4bf88b1e23010a32751","researcherName_TH":"อาทิตย์ แข็งธัญการ","keyword5_EN":"fopology","keyword4_EN":"eqnation","keyword3_EN":"fumctional","keyword2_EN":"fix point","keyword1_EN":"iterative","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"vori  ational Analysis","researcherPic":"","academicLevelId":"5af1c945e6e3503328927982","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"ATID   KANGTUNYAKARN","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"ผู้ช่วยศาสตราจารย์","academicLevelName_EN":"Assistant Professor"},{"_id":"5af1d4bf88b1e23010a3276c","researcherName_TH":"สามารถ คงทวีเลิศ","keyword5_EN":"","keyword4_EN":"","keyword3_EN":"","keyword2_EN":"","keyword1_EN":"","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"","researcherPic":"","academicLevelId":"5af1c945e6e3503328927994","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e350332892784a","researcherName_EN":"Samart Kongtaweelert","departmentName_TH":"เคมี","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"อาจารย์","academicLevelName_EN":"Lecturer"},{"_id":"5af1d4bf88b1e23010a3274d","researcherName_TH":"ภูษณิศา ล้อมทอง","keyword5_EN":"Integral equation","keyword4_EN":"Numerical optimization","keyword3_EN":"Image processing","keyword2_EN":"Numerical PDEs","keyword1_EN":"High performance computing","keyword5_TH":"สมการเชิงปริพันธ์","keyword4_TH":"การหาค่าเหมาะที่สุดเชิงตัวเลข","keyword3_TH":"การประมวลผลภาพ","keyword2_TH":"สมการเชิงอนุพันธ์ย่อยเชิงตัวเลข","keyword1_TH":"การคำนวณประสิทธิภาพสูง","researcherPic":"","academicLevelId":"5af1c945e6e3503328927994","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"อาจารย์","academicLevelName_EN":"Lecturer"},{"_id":"5af1d4bf88b1e23010a3274e","researcherName_TH":"วรรณพร สรรประเสริฐ","keyword5_EN":"","keyword4_EN":"","keyword3_EN":"","keyword2_EN":"","keyword1_EN":"Graph Theory","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"ทฤษฎีกราฟ","researcherPic":"","academicLevelId":"5af1c945e6e3503328927994","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"WANNAPORN   SANPRASERT","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"อาจารย์","academicLevelName_EN":"Lecturer"},{"_id":"5af1d4bf88b1e23010a3275d","researcherName_TH":"ประยงค์ ดวงดี","keyword5_EN":"","keyword4_EN":"","keyword3_EN":"","keyword2_EN":"","keyword1_EN":"","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"","researcherPic":"","academicLevelId":"5af1c945e6e3503328927984","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e350332892784a","researcherName_EN":"","departmentName_TH":"เคมี","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"รองศาสตราจารย์","academicLevelName_EN":"Academic Officer"},{"_id":"5af1d4bf88b1e23010a32764","researcherName_TH":"พัชราภรณ์ วีระชวนะศักดิ์","keyword5_EN":"","keyword4_EN":"","keyword3_EN":"","keyword2_EN":"","keyword1_EN":"","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"","researcherPic":"","academicLevelId":"5af1c945e6e3503328927994","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e350332892784a","researcherName_EN":"Patcharaporn Weerachawanasak","departmentName_TH":"เคมี","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"อาจารย์","academicLevelName_EN":"Lecturer"},{"_id":"5af1d4bf88b1e23010a32744","researcherName_TH":"จินดา ไชยช่วย","keyword5_EN":"","keyword4_EN":"","keyword3_EN":"","keyword2_EN":"","keyword1_EN":"","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"","keyword2_TH":"","keyword1_TH":"","researcherPic":"","academicLevelId":"5af1c945e6e3503328927994","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"CHINDA   CHAICHUAY","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"อาจารย์","academicLevelName_EN":"Lecturer"},{"_id":"5af1d4bf88b1e23010a3274b","researcherName_TH":"บุษยมาส พิมพ์พรรณชาติ","keyword5_EN":"stem","keyword4_EN":"batteries,","keyword3_EN":"air pollution","keyword2_EN":"water quality","keyword1_EN":"mathematical modeling","keyword5_TH":"สะเต็ม","keyword4_TH":"แบตเตอรี่ สะเต็ม","keyword3_TH":"มลพิษทางอากาศ แบตเตอรี่ สะเต็ม","keyword2_TH":"คุณภาพน้ำ มลพิษทางอากาศ แบตเตอรี่ สะเต็ม","keyword1_TH":"แบบจำลองทางคณิตศาสตร์","researcherPic":"","academicLevelId":"5af1c945e6e3503328927994","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"BUSAYAMAS   PIMPUNCHART","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"อาจารย์","academicLevelName_EN":"Lecturer"},{"_id":"5af1d4bf88b1e23010a3274c","researcherName_TH":"ไพรบูลย์ พันธรักษ์พงศ์","keyword5_EN":"","keyword4_EN":"","keyword3_EN":"Data Mining","keyword2_EN":"Data Clustering","keyword1_EN":"Business Data Analysis","keyword5_TH":"","keyword4_TH":"","keyword3_TH":"เหมืองข้อมูล","keyword2_TH":"การจัดกลุ่มข้อมูล","keyword1_TH":"การวิเคราะห์ข้อมูลธุรกิจ","researcherPic":"","academicLevelId":"5af1c945e6e3503328927984","positionId":"5af1c944e6e35033289278fb","departmentId":"5af1c943e6e3503328927845","researcherName_EN":"PRAIBOON   PANTARAGPHONG","departmentName_TH":"คณิตศาสตร์","departmentName_EN":null,"positionName_TH":"","positionName_EN":null,"academicLevelName_TH":"รองศาสตราจารย์","academicLevelName_EN":"Academic Officer"}])
    
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