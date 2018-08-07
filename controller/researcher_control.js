var flow = require('../services/flow.js')
var ObjectId = require('mongodb').ObjectId;

var Researcher = require('../model/researcher_model.js');

var Validate = require("../controller/validation_controller.js");

var Researcher_Control = require("../controller/researcher_control.js");
var Position_Control = require("../controller/position_control.js");
var Keyword_Control = require("../controller/keyword_control.js");
var AcademicLevel_Control = require("../controller/academicLevel_control.js");
var Department_Control = require("../controller/department_control.js");
var BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
var MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
var DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");
var Publication_Control = require("../controller/publication_control.js");

var Thesis_Control = require("../controller/thesis_control.js");
var IntellectualProperty_Control = require("../controller/intellectualProperty_control.js");
var Reward_Control = require("../controller/reward_control.js");

module.exports = {
    newResearcher: function (researcher, callback) {
        console.log("Saving Researcher: " + researcher.researcherName_TH);
        researcher.save(function (error, saveResponse) {
            console.log("Saving Researcher >> COMPLETED ");
            if (error) {
                let errCode = "361";
                var alert = "Saving Researcher fail, Error: " + error.message;
                //console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("362", null, saveResponse)
            }
        });
    },
    newResearcher_fromScrap: function (publication_bulk, callback) {
        let j = 0
        let scrapingData = JSON.parse(JSON.stringify(publication_bulk))

        var researcher = new Researcher();
        // var requiredData = [];
        // requiredData.push(scrapingData.publicationName);
        // requiredData.push(scrapingData.researcherPersonalID);
        // requiredData.push(scrapingData.researcherName);
        // var requiredReady = Validate.requiredData_Check(requiredData);
        var requiredReady = true

        if (!requiredReady) {
            var alert = "Input Not Valid, check if some data is required. >> publicationName : " + scrapingData.publicationName + " >> researcherPersonalID : " + scrapingData.researcherPersonalID + " >> researcherName : " + scrapingData.researcherName
            console.log(alert);
            callback("New Publications was saved successfully")
        }
        else {
            researcher.researcherName_TH = Validate.scrappingCleanUp(scrapingData.researcherName_TH)
            researcher.researcherName_EN = Validate.scrappingCleanUp(scrapingData.researcherName_EN)
            researcher.researcherName_Combine = Validate.scrappingCleanUp(scrapingData.researcherName_TH) + " / " + Validate.scrappingCleanUp(scrapingData.researcherName_EN)
            researcher.personalID = scrapingData.personalID
            researcher.departmentName_TH = Validate.scrappingCleanUp(scrapingData.departmentName_TH)
            researcher.academicPositionName_TH = Validate.scrappingCleanUp(scrapingData.academicPositionName_TH)
            researcher.academicPositionName_EN = Validate.scrappingCleanUp(scrapingData.academicPositionName_EN)
            researcher.positionName_TH = Validate.scrappingCleanUp(scrapingData.positionName_TH)
            researcher.bachelorGraduation = Validate.scrappingCleanUp(scrapingData.bachelorGraduation)
            researcher.masterGraduation = Validate.scrappingCleanUp(scrapingData.masterGraduation)
            researcher.doctoralGraduation = Validate.scrappingCleanUp(scrapingData.doctoralGraduation)
            researcher.assignDate = scrapingData.assignDate
            researcher.birthDate = scrapingData.birthDate
            researcher.retirementStatus = scrapingData.retirementStatus
            researcher.target = Validate.scrappingCleanUp(scrapingData.target)

            researcher.bachelorTeachingDepartmentName_TH = Validate.scrappingCleanUp(scrapingData.bachelorTeachingDepartmentName_TH)
            researcher.bachelor_AcademicYear = scrapingData.bachelor_AcademicYear
            researcher.bachelor_FacultyBoard_Comment = scrapingData.bachelor_FacultyBoard_Comment
            researcher.bachelor_CouncilBoard_Comment = scrapingData.bachelor_CouncilBoard_Comment
            researcher.bachelor_InstituteBoard_Comment = scrapingData.bachelor_InstituteBoard_Comment

            researcher.masterTeachingDepartmentName_TH = Validate.scrappingCleanUp(scrapingData.masterTeachingDepartmentName_TH)
            researcher.master_AcademicYear = scrapingData.master_AcademicYear
            researcher.master_FacultyBoard_Comment = scrapingData.master_FacultyBoard_Comment
            researcher.master_CouncilBoard_Comment = scrapingData.master_CouncilBoard_Comment
            researcher.master_InstituteBoard_Comment = scrapingData.master_InstituteBoard_Comment

            researcher.doctoryTeachingDepartmentName_TH = Validate.scrappingCleanUp(scrapingData.doctoryTeachingDepartmentName_TH)
            researcher.doctory_AcademicYear = scrapingData.doctory_AcademicYear
            researcher.doctory_FacultyBoard_Comment = scrapingData.doctory_FacultyBoard_Comment
            researcher.doctory_CouncilBoard_Comment = scrapingData.doctory_CouncilBoard_Comment
            researcher.doctory_InstituteBoard_Comment = scrapingData.doctory_InstituteBoard_Comment

            researcher.keywordArray = []
            researcher.keywordString = "";
            if (scrapingData.keyword1_TH != "") {
                researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(scrapingData.keyword1_TH), keyword_EN: Validate.scrappingCleanUp(scrapingData.keyword1_EN), keyword_Combine: (Validate.scrappingCleanUp(scrapingData.keyword1_TH) + " / " + Validate.scrappingCleanUp(scrapingData.keyword1_EN)) })
                researcher.keywordString = researcher.keywordString + (Validate.scrappingCleanUp(scrapingData.keyword1_TH) + " / " + Validate.scrappingCleanUp(scrapingData.keyword1_EN)) + " , "
            }
            if (scrapingData.keyword2_TH != "") {
                researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(scrapingData.keyword2_TH), keyword_EN: Validate.scrappingCleanUp(scrapingData.keyword2_EN), keyword_Combine: (Validate.scrappingCleanUp(scrapingData.keyword2_TH) + " / " + Validate.scrappingCleanUp(scrapingData.keyword2_EN)) })
                researcher.keywordString = researcher.keywordString + (Validate.scrappingCleanUp(scrapingData.keyword2_TH) + " / " + Validate.scrappingCleanUp(scrapingData.keyword2_EN)) + " , "
            }
            if (scrapingData.keyword3_TH != "") {
                researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(scrapingData.keyword3_TH), keyword_EN: Validate.scrappingCleanUp(scrapingData.keyword3_EN), keyword_Combine: (Validate.scrappingCleanUp(scrapingData.keyword3_TH) + " / " + Validate.scrappingCleanUp(scrapingData.keyword3_EN)) })
                researcher.keywordString = researcher.keywordString + (Validate.scrappingCleanUp(scrapingData.keyword3_TH) + " / " + Validate.scrappingCleanUp(scrapingData.keyword3_EN)) + " , "
            }
            if (scrapingData.keyword4_TH != "") {
                researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(scrapingData.keyword4_TH), keyword_EN: Validate.scrappingCleanUp(scrapingData.keyword4_EN), keyword_Combine: (Validate.scrappingCleanUp(scrapingData.keyword4_TH) + " / " + Validate.scrappingCleanUp(scrapingData.keyword4_EN)) })
                researcher.keywordString = researcher.keywordString + (Validate.scrappingCleanUp(scrapingData.keyword4_TH) + " / " + Validate.scrappingCleanUp(scrapingData.keyword4_EN)) + " , "
            }
            if (scrapingData.keyword5_TH != "") {
                researcher.keywordArray.push({ keyword_TH: Validate.scrappingCleanUp(scrapingData.keyword5_TH), keyword_EN: Validate.scrappingCleanUp(scrapingData.keyword5_EN), keyword_Combine: (Validate.scrappingCleanUp(scrapingData.keyword5_TH) + " / " + Validate.scrappingCleanUp(scrapingData.keyword5_EN)) })
                researcher.keywordString = researcher.keywordString + (Validate.scrappingCleanUp(scrapingData.keyword5_TH) + " / " + Validate.scrappingCleanUp(scrapingData.keyword5_EN)) + " , "
            }

            researcher.scopusBefore2560 = scrapingData.scopusBefore2560
            researcher.citationBefore2560 = scrapingData.citationBefore2560
            researcher.hIndex = scrapingData.hIndex

            researcher.citationTotal = scrapingData.citationTotal
            researcher.citationAfter2560 = scrapingData.citationAfter2560
            researcher.citationLifeTime = scrapingData.citationLifeTime
            researcher.citationTCI = scrapingData.citationTCI

            researcher.publicationTotal = scrapingData.publicationTotal
            researcher.publication2560 = scrapingData.publication2560
            researcher.publicationLifeTime = scrapingData.publicationLifeTime
            researcher.publicationTCI = scrapingData.publicationTCI

            researcher.organizationTel = scrapingData.organizationTel
            researcher.mobileTel = scrapingData.mobileTel
            researcher.email = scrapingData.email
            researcher.workplace = scrapingData.workplace
            researcher.facebook = scrapingData.facebook
            researcher.twitter = scrapingData.twitter
            researcher.instragram = scrapingData.instragram
            researcher.line = scrapingData.line
            researcher.personalSite = scrapingData.personalSite
            researcher.insignia1 = scrapingData.insignia1
            researcher.insignia2 = scrapingData.insignia2

            researcher.totalCitationNotSelf = scrapingData.totalCitationNotSelf
            researcher.citation2014 = scrapingData.citation2014
            researcher.citation2015 = scrapingData.citation2015
            researcher.citation2016 = scrapingData.citation2016
            researcher.citation2017 = scrapingData.citation2017
            researcher.citation2018 = scrapingData.citation2018

            researcher.researcherPic = scrapingData.researcherPic

            flow.exec(
                function () {
                    Department_Control.checkDepartmentName(researcher.departmentName_TH, this);
                }, function (code, err, functionCallback) {
                    if (!err) {
                        researcher.departmentId = functionCallback._id
                    }
                    else {
                        researcher.departmentId = null
                    }
                    Position_Control.checkPositionName(researcher.positionName_TH, this);
                }, function (code, err, functionCallback) {
                    if (!err) {
                        researcher.positionId = functionCallback._id
                    }
                    else {
                        researcher.positionId = null
                    }
                    AcademicLevel_Control.checAcademicLevelName(researcher.academicPositionName_TH, this);
                }, function (code, err, functionCallback) {
                    if (!err) {
                        researcher.academicLevelId = functionCallback._id
                    }
                    else {
                        researcher.academicLevelId = null
                    }
                    BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentName(researcher.bachelorTeachingDepartmentName_TH, this);
                }, function (code, err, functionCallback) {
                    if (!err) {
                        researcher.bachelorTeachingDepartmentId = functionCallback._id
                    }
                    else {
                        researcher.bachelorTeachingDepartmentId = null
                    }
                    MasterTeachingDepartment_Control.checkMasterTeachingDepartmentName(researcher.masterTeachingDepartmentName_TH, this);
                }, function (code, err, functionCallback) {
                    if (!err) {
                        researcher.masterTeachingDepartmentId = functionCallback._id
                    }
                    else {
                        researcher.masterTeachingDepartmentId = null
                    }
                    DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentName(researcher.doctoryTeachingDepartmentName_TH, this);
                }, function (code, err, functionCallback) {
                    if (!err) {
                        researcher.doctoryTeachingDepartmentId = functionCallback._id
                    }
                    else {
                        researcher.doctoryTeachingDepartmentId = null
                    }

                    researcher.save(function (error, saveResponse) {
                        if (error) {
                            let errCode = "361";
                            var alert = "Saving Researcher fail, Error: " + error.message;
                            console.log("ERROR Code: " + errCode + " " + alert);
                        }
                    });
                    callback("New Researcher was saved successfully")
                }
            );
        }
    },
    newResearcher_Dummy: function (researcher, callback) {
        researcher.save(function (error, saveResponse) {
            if (error) {
                console.log("Save Dummy Failed")
                let errCode = "361";
                var alert = "Saving Researcher fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                console.log("Save Dummy Completed")
                callback("362", null, saveResponse)
            }
        });
    },
    updateResearcherByID: function (researcherId, newvalues, callback) {
        var myquery = { "_id": researcherId };
        console.log("In Method: " + JSON.stringify(newvalues))
        Researcher.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "371";
                var alert = "Error in updating Researcher with _id: " + researcherId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("372", null, updateResponse);
        });
    },
    checkResearcherByID: function (researcherId, query, callback) {
        console.log("researcherId >q> " + researcherId)
        Researcher.findOne({ "_id": researcherId }, query, function (error, functionCallback) {
            if (error) {
                let errCode = "381";
                var alert = "Error in finding Researcher with _id: " + researcherId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("382", null, functionCallback)
            }
            else {
                let errCode = "383";
                var alert = "Researcher with _id: " + researcherId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    checkResearcherByResearcherName: function (researcherName_TH, callback) {
        Researcher.findOne({ "researcherName_TH": researcherName_TH }, function (error, functionCallback) {
            if (error) {
                let errCode = "571";
                var alert = "Error in finding Researcher with name: " + researcherName_TH + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("572", null, functionCallback)
            }
            else {
                let errCode = "573";
                var alert = "Researcher with name: " + researcherName_TH + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    checkResearcherByPersonalID: function (personalID, callback) {
        Researcher.findOne({ "personalID": personalID }, function (error, functionCallback) {
            if (error) {
                let errCode = "591";
                var alert = "Error in finding Researcher with personalID: " + personalID + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("592", null, functionCallback)
            }
            else {
                let errCode = "593";
                var alert = "Researcher with personalID: " + personalID + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    checkBindedKeywordwithResearcher: function (researcherId, keywordId, callback) {
        Researcher.findOne({ $and: [{ "_id": researcherId }, { "keywordIdArray": keywordId }] }, function (error, findCallback) {
            if (error) {
                var alert = "Error in finding Researcher with _id: " + researcherId + "with bankaccoount Id: " + keywordId + "\nError: " + error.message;
                callback("391", alert, null)
            }
            else if (findCallback) {
                var alert = "Keyword with _id: " + keywordId + " is already binded to this Researcher";
                callback("392", alert, null)
            }
            else {
                var alert = "Keyword with _id: " + keywordId + " is not binded to this Researcher";
                callback("393", alert, null)
            }
        });
    },
    bindKeywordtoResearcher: function (researcherId, keywordId, callback) {
        Researcher.update({ "_id": researcherId }, { $push: { "keywordIdArray": keywordId } }, function (error, findCallback) {
            if (error) {
                var alert = "Error in updating Researcher with _id: " + researcherId + "with Keyword Id: " + keywordId + "\nError: " + error.message;
                callback("401", alert, null)
            }
            else {
                callback("402", alert, null)
            }
        });
    },
    removeKeywordfromResearcher: function (researcherId, keywordId, callback) {
        Researcher.update({ "_id": researcherId }, { $pull: { "keywordIdArray": keywordId } }, function (error, findCallback) {
            if (error) {
                var alert = "Error in updating Researcher with _id: " + researcherId + "with Keyword Id: " + keywordId + "\nError: " + error.message;
                callback("411", alert, null)
            }
            else {
                callback("412", alert, null)
            }
        });
    },

    wipeResearcher: function (callback) {
        Researcher.remove({}, function (error, deleteCallback) {
            if (error) {
                let errCode = "761";
                var alert = "Error in wiping Reward Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("762", null, deleteCallback)
            }
        });
    },

    deleteResearcherByID: function (researcherId, callback) {
        Researcher.remove({ "_id": researcherId }, function (error, newsCallback) {
            if (error) {
                let errCode = "421";
                var alert = "Error in deleting Researcher with _id " + researcherId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("422", null, newsCallback)
            }
        });
    },
    getAllResearcherName: function (callback) {
        Researcher.find({}, {
            "_id": true,
            "researcherName_TH": true,
            "researcherName_EN": true
        }, function (error, functionCallback) {
            if (error) {
                let errCode = "431";
                var alert = "Error in getAllAcademicLevel , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "432";
                var alert = "Get All Researcher Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "433";
                var alert = "No Researcher Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    getAllResearcherPreview: function (callback) {
        Researcher.find({}, {
            "_id": true,
            "researcherName_TH": true,
            "researcherName_EN": true,
            "researcherPic": true,
            "academicLevelId": true,
            "positionId": true,
            "departmentId": true,
            "keywordArray": true,
            "keywordString": true


        }, function (error, functionCallback) {
            if (error) {
                let errCode = "431";
                var alert = "Error in Researcher , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "432";
                var alert = "Get All Researcher Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "433";
                var alert = "No Researcher Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },

    getFullResearcherData: function (researcherData, callback) {
        let tmp = JSON.parse(JSON.stringify(researcherData));
        let promotiontmp = null;
        flow.exec(
            function () {
                getFullResearcher(researcherData, this);
            }, function (functionCallback) {
                callback("551", null, functionCallback);
            }
        );
    },

    getAllFullResearcherDataPreview: function (researcher, callback) {
        let forCallback = [];
        let j = 0;
        for (let i = 0; i < researcher.length; i++) {
            getFullResearcherPreview(researcher[i], function (a) {
                //console.log("a >> " + JSON.stringify(a))
                //console.log("#" + i + " completed")
                forCallback[i] = a;
                console.log("#" + i + " called back <3")
                j++
                if (j == researcher.length) {
                    console.log("ALL SET")
                    callback("561", null, forCallback);
                }
            });
        }

    }
};

//------

// async function qqqqqq(a) {

//     var forCallback = []

//     const  z = await Promise.all(a.map(async (a1) => {
//         const contents = await getFullResearcherPreview(a1)
//         console.log("YEAH")
//     }));
//     return z
// }

var Position_Control = require("../controller/position_control.js");
var AcademicLevel_Control = require("../controller/academicLevel_control.js");
var BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
var MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
var DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");

var forCallback_getFullResearcherPreview = []

function getFullResearcher(input, callback) {
    let researcherData = JSON.parse(JSON.stringify(input));
    researcherData["publicationString"] = ""
    console.log("getFullResearcherData for " + researcherData.researcherName_TH)
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Department_Control.checkDepartmentByID(new ObjectId(researcherData.departmentId), this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["departmentData"] = functionCallback
            }
            else {
                researcherData["departmentData"] = [];
            }
            Position_Control.checkPositionByID(new ObjectId(researcherData.positionId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["positionData"] = functionCallback
            }
            else {
                researcherData["positionData"] = [];
            }
            AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(researcherData.academicLevelId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["academicLevelData"] = functionCallback
            }
            else {
                researcherData["academicLevelData"] = [];
            }
            BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(researcherData.bachelorTeachingDepartmentId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["bachelorDepartment"] = functionCallback
            }
            else {
                researcherData["bachelorDepartment"] = [];
            }
            MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(researcherData.masterTeachingDepartmentId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["masterDepartment"] = functionCallback
            }
            else {
                researcherData["masterDepartment"] = [];
            }
            DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(researcherData.doctoryTeachingDepartmentId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["doctoryDepartment"] = functionCallback
            }
            else {
                researcherData["doctoryDepartment"] = [];
            }
            callback(researcherData)
        }
    );
}


function getFullResearcherPreview( input, callback) {
    let researcherData = JSON.parse(JSON.stringify(input));
    //console.log("getFullResearcherData for " + researcherData.researcherName_TH)
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Department_Control.checkDepartmentByID(new ObjectId(researcherData.departmentId), this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["departmentData"] = functionCallback
            }
            else {
                researcherData["departmentData"] = [];
            }
            Position_Control.checkPositionByID(new ObjectId(researcherData.positionId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["positionData"] = functionCallback
            }
            else {
                researcherData["positionData"] = [];
            }
            AcademicLevel_Control.checkAcademicLevelByID(new ObjectId(researcherData.academicLevelId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherData["academicLevelData"] = functionCallback
            }
            else {
                researcherData["academicLevelData"] = [];
            }

            Publication_Control.getAllPublicationPreviewByResearcherId(new ObjectId(researcherData._id), 0, this);

            // forCallback_getFullResearcherPreview.push(researcherData)
        }, function (code, err, functionCallback) {
            //console.log("#" + num + " Publication_Control back <3")

            if (functionCallback) {
                //console.log("#" + num + " constructing pub <3 @length=" + functionCallback.length)
                let j = 0
                if (functionCallback.length > 0) {
                    for (let i = 0; i < functionCallback.length; i++) {
                        researcherData["publicationString"] = researcherData["publicationString"] + functionCallback[i].publicationName + " / "
                        j++
                        if (j >= functionCallback.length) {
                            //console.log("#" + num + " constructing pub Completed <3")
                            Thesis_Control.getAllThesisPreviewByResearcherId(new ObjectId(researcherData._id), 0, this);
                        }
                    }
                }
                else {
                    Thesis_Control.getAllThesisPreviewByResearcherId(new ObjectId(researcherData._id), 0, this);
                }
            }
            else {
                //console.log("#" + num + " NOT constructing pub <3")
                Thesis_Control.getAllThesisPreviewByResearcherId(new ObjectId(researcherData._id), 0, this);
            }

        }, function (code, err, functionCallback) {
            //console.log("#" + num + " Thesis_Control back <3")
            if (functionCallback) {
                let j = 0
                if (functionCallback.length > 0) {
                    for (let i = 0; i < functionCallback.length; i++) {
                        researcherData["publicationString"] = researcherData["publicationString"] + functionCallback[i].thesisName_TH + "," + functionCallback[i].thesisName_EN + " / "
                        j++
                        if (j >= functionCallback.length) {
                            IntellectualProperty_Control.getAllIntellectualPropertyPreviewByResearcherId(new ObjectId(researcherData._id), 0, this);
                        }
                    }
                }
                else {
                    IntellectualProperty_Control.getAllIntellectualPropertyPreviewByResearcherId(new ObjectId(researcherData._id), 0, this);
                }
            }
            else {
                IntellectualProperty_Control.getAllIntellectualPropertyPreviewByResearcherId(new ObjectId(researcherData._id), 0, this);
            }

        }, function (code, err, functionCallback) {
            //console.log("#" + num + " IntellectualProperty_Control back <3")
            if (functionCallback) {
                let j = 0
                if (functionCallback.length > 0) {
                    for (let i = 0; i < functionCallback.length; i++) {
                        researcherData["publicationString"] = researcherData["publicationString"] + functionCallback[i].intPropertyName + " / "
                        j++
                        if (j >= functionCallback.length) {
                            Reward_Control.getAllRewardPreviewByResearcherId(new ObjectId(researcherData._id), 0, this);
                        }
                    }
                }
                else {
                    Reward_Control.getAllRewardPreviewByResearcherId(new ObjectId(researcherData._id), 0, this);
                }
            }
            else {
                Reward_Control.getAllRewardPreviewByResearcherId(new ObjectId(researcherData._id), 0, this);
            }

        }, function (code, err, functionCallback) {
            //console.log("#" + num + " Reward_Control back <3")
            if (functionCallback) {
                let j = 0
                if (functionCallback.length > 0) {
                    for (let i = 0; i < functionCallback.length; i++) {
                        researcherData["publicationString"] = researcherData["publicationString"] + functionCallback[i].rewardName + " / "
                        j++
                        if (j >= functionCallback.length) {
                            callback(researcherData)
                        }
                    }
                }
                else {
                    callback(researcherData)
                }

            }
            else {
                //console.log("#" + num + " Finishing <3")
                callback(researcherData)
            }
        }
    );
}