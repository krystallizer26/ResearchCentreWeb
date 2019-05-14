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
let Researcher = require('../model/researcher_model.js');

//Controller
let Researcher_Control = require("../controller/researcher_control.js");
let Position_Control = require("../controller/position_control.js");
let Keyword_Control = require("../controller/keyword_control.js");
let AcademicLevel_Control = require("../controller/academicLevel_control.js");
let Department_Control = require("../controller/department_control.js");
let BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
let MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
let DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");

router.post('/newResearcher', function(request, response) {
    let methodCode = "36";

    let requiredData = [];
    requiredData.push(request.body.researcherName_TH);
    requiredData.push(request.body.researcherName_EN);
    requiredData.push(request.body.personalID);
    let requiredReady = Validate.requiredData_Check(requiredData);

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required. "
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, alert, response);
    } else {
        flow.exec(
            function() {
                let researcher = new Researcher();
                researcher.researcherName_TH = Validate.scrappingCleanUp(request.body.researcherName_TH)
                researcher.researcherName_EN = Validate.scrappingCleanUp(request.body.researcherName_EN)
                researcher.researcherName_Combine = Validate.scrappingCleanUp(request.body.researcherName_TH) + " / " + Validate.scrappingCleanUp(request.body.researcherName_EN)
                researcher.personalID = request.body.personalID

                researcher.keywordArray = []
                researcher.keywordString = "";

                Researcher_Control.newResearcher(researcher, this);

            },
            function(code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New Researcher was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.get('/newResearcher_Dummy', function(request, response) {
    let methodCode = "36";

    flow.exec(
        function() {
            let researcher = new Researcher();
            researcher._id = new ObjectId("111111111111111111111111")
            researcher.researcherName_TH = "___สำหรับเก็บข้อมูลที่ไม่พบข้อมูลของนักวิจัยที่เกี่ยวข้อง"
            researcher.researcherName_Combine = " ___สำหรับเก็บข้อมูลที่ไม่พบข้อมูลของนักวิจัยที่เกี่ยวข้อง / ___Researcher Not Found"
            researcher.researcherName_EN = "___Researcher Not Found"

            Researcher_Control.newResearcher_Dummy(researcher, this);

        },
        function(code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            } else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "New Researcher was saved successfully as _id defined", functionCallback._id, response);
            }
        }
    );
});

router.post('/editResearcher/', function(request, response) {
    let methodCode = "39";

    let requiredData = [];
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.researcherName_TH);
    requiredData.push(request.body.researcherName_EN);
    requiredData.push(request.body.personalID);
    requiredData.push(request.body.departmentId);
    requiredData.push(request.body.positionId);
    requiredData.push(request.body.academicLevelId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let booleanData = [];
    booleanData.push(request.body.retirementStatus);
    let booleanReady = Validate.booleanData_Check(booleanData)

    let objectIdData = [];
    objectIdData.push(request.body.researcherId);
    objectIdData.push(request.body.academicLevelId);
    objectIdData.push(request.body.departmentId);
    objectIdData.push(request.body.positionId);
    let objectIdReady = Validate.objectIDData_Check(objectIdData)

    let numberData = [];
    numberData.push(request.body.personalID);
    let numberReady = Validate.numberData_Check(numberData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    } else if (!booleanReady) {
        let alert = "Input Not Valid, check if some data is not boolean."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "002", alert, response)
    } else if (!objectIdReady) {
        let alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    } else if (!numberReady) {
        let alert = "Input Not Valid, check if some data must contain only numeric character."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "004", alert, response)
    } else {
        flow.exec(
            function() {
                Department_Control.checkDepartmentByID(new ObjectId(request.body.departmentId), this);
            },
            function(code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    Position_Control.checkPositionByID(new ObjectId(request.body.positionId), this);
                }
            },
            function(code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(request.body.academicLevelId), this);
                }
            },
            function(code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorTeachingDepartmentId), this);
                }
            },
            function(code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(request.body.masterTeachingDepartmentId), this);
                }
            },
            function(code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryTeachingDepartmentId), this);
                }
            },
            function(code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    let query = { "_id": true }
                    Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), query, this);
                }
            },
            function(code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {

                    let keywordString = ""
                    for (let i = 0; i < request.body.keywordArray.length; i++) {
                        researcher.keywordString = researcher.keywordString + (request.body.keywordArray[i].keyword_TH + " / " + request.body.keywordArray[i].keyword_EN + " , ")
                    }
                    let query = {
                        $set: {
                            "researcherName_TH": request.body.researcherName_TH,
                            "researcherName_EN": request.body.researcherName_EN,
                            "researcherName_Combine": request.body.researcherName_TH + " / " + request.body.researcherName_EN,
                            "gender": request.body.gender,
                            "personalID": request.body.personalID,
                            "birthDate": request.body.birthDate,
                            "departmentId": request.body.departmentId,
                            "positionId": request.body.positionId,
                            "academicLevelId": request.body.academicLevelId,
                            "bachelorGraduation": request.body.bachelorGraduation,
                            "masterGraduation": request.body.masterGraduation,
                            "doctoralGraduation": request.body.doctoralGraduation,
                            "target": request.body.target,
                            "assignDate": request.body.assignDate,
                            "retirementStatus": request.body.retirementStatus,
                            "researcherPic": request.body.researcherPic,

                            "keywordArray": request.body.keywordArray,
                            "keywordString": keywordString,

                            "bachelorTeachingDepartmentId": request.body.bachelorTeachingDepartmentId,
                            "bachelor_AcademicYear": request.body.bachelor_AcademicYear,
                            "bachelor_FacultyBoard_Comment": request.body.bachelor_FacultyBoard_Comment,
                            "bachelor_CouncilBoard_Comment": request.body.bachelor_CouncilBoard_Comment,
                            "bachelor_InstituteBoard_Comment": request.body.bachelor_InstituteBoard_Comment,

                            "masterTeachingDepartmentId": request.body.masterTeachingDepartmentId,
                            "master_AcademicYear": request.body.master_AcademicYear,
                            "master_FacultyBoard_Comment": request.body.master_FacultyBoard_Comment,
                            "master_CouncilBoard_Comment": request.body.master_CouncilBoard_Comment,
                            "master_InstituteBoard_Comment": request.body.master_InstituteBoard_Comment,

                            "doctoryTeachingDepartmentId": request.body.doctoryTeachingDepartmentId,
                            "doctory_AcademicYear": request.body.doctory_AcademicYear,
                            "doctory_FacultyBoard_Comment": request.body.doctory_FacultyBoard_Comment,
                            "doctory_CouncilBoard_Comment": request.body.doctory_CouncilBoard_Comment,
                            "doctory_InstituteBoard_Comment": request.body.doctory_InstituteBoard_Comment,

                            "organizationTel": request.body.organizationTel,
                            "mobileTel": request.body.mobileTel,
                            "email": request.body.email,
                            "workplace": request.body.workplace,
                            "facebook": request.body.facebook,
                            "twitter": request.body.twitter,
                            "instragram": request.body.instragram,
                            "line": request.body.line,
                            "personalSite": request.body.personalSite,
                            "insignia1": request.body.insignia1,
                            "insignia2": request.body.insignia2,

                            "editedDate": Date.now()
                        }
                    }
                    Researcher_Control.updateResearcherByID(new ObjectId(request.body.researcherId), query, this);
                }
            },
            function(code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    Return_Control.responseWithCode(ReturnCode.success, "Researcher with _id: " + request.body.researcherId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/editResearcherPublication/', function(request, response) {
    let methodCode = "85";

    let requiredData = [];
    requiredData.push(request.body.researcherId);
    requiredData.push(request.body.citationTotal);
    requiredData.push(request.body.publicationTotal);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.researcherId);
    let objectIdReady = Validate.objectIDData_Check(objectIdData)

    let numberData = [];
    numberData.push(request.body.personalID);
    let numberReady = Validate.numberData_Check(numberData)

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
                let query = { "_id": true }
                Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), query, this);
            },
            function(code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    let query = {
                        $set: {
                            "citationTotal": request.body.citationTotal,
                            "publicationTotal": request.body.publicationTotal,
                            "editedDate": Date.now()
                        }
                    }
                    Researcher_Control.updateResearcherByID(new ObjectId(request.body.researcherId), query, this);
                }
            },
            function(code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    Return_Control.responseWithCode(ReturnCode.success, "Researcher with _id: " + request.body.researcherId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllResearcherName/', function(request, response) {
    let methodCode = "44";

    flow.exec(
        function() {
            Researcher_Control.getAllResearcherName(this);
        },
        function(code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            } else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Researcher Completed", functionCallback, response)
            }
        }
    );
});

router.post('/getAllResearcherPreview/', function(request, response) {
    let methodCode = "44";

    flow.exec(
        function() {
            Researcher_Control.getAllResearcherPreview(this);
        },
        function(code, err, functionCallback) {
            if (code === "431") {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            } else if (code === "432") {
                Researcher_Control.getAllFullResearcherDataPreview(functionCallback, this);
            } else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "No Researcher Founded", [], response)
            }
        },
        function(code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            } else {
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get All Researcher Completed", functionCallback, response)
            }
        }
    );
});

router.post('/getResearcherfromID/', function(request, response) {
    let methodCode = "42";

    let requiredData = [];
    requiredData.push(request.body.researcherId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.researcherId);
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
                Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), {}, this);
            },
            function(code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    Researcher_Control.getFullResearcherData(functionCallback, this);
                }
            },
            function(code, err, functionCallback) {
                //console.log("functionCallback: "+ JSON.stringify(functionCallback))
                Return_Control.responseWithCodeAndData(ReturnCode.success, "get Researcher with _id " + request.body.researcherId + " Completed", functionCallback, response)
            }
        );
    }
});


router.post('/deleteResearcher/', function(request, response) {
    let methodCode = "43";

    let requiredData = [];
    requiredData.push(request.body.researcherId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.researcherId);
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
                let query = { "_id": true }
                Researcher_Control.checkResearcherByID(new ObjectId(request.body.researcherId), this);
            },
            function(code, err, result) {
                if (code != "382") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    Researcher_Control.deleteResearcherByID(new ObjectId(request.body.researcherId), this);
                }
            },
            function(code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                } else {
                    Return_Control.responseWithCode(ReturnCode.success, "Researcher with _id: " + request.body.researcherId + " has deleted successfully.", response);
                }
            }
        );
    }
});

router.get('/wipeResearcher/', function(request, response) {
    let methodCode = "65";

    flow.exec(
        function() {
            Researcher_Control.wipeResearcher(this);

        },
        function(code, err, result) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            } else {
                Return_Control.responseWithCode(ReturnCode.success, "All Researcher has been deleted successfully.", response);
            }
        }
    );
});

var schedule = require('node-schedule');
schedule.scheduleJob('0 3 * * *', function(date_called) {
    Researcher_Control.wipeResearcher(function(code, err, result) {
        console.log("RESEARCHER WIPED")
    });
});

module.exports = router;

//-----------------------------------------------------------------------------

function next(callback) {
    callback(0)
}