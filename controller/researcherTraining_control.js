let flow = require('../services/flow.js')
let ObjectId = require('mongodb').ObjectId;

let ResearcherTraining = require('../model/researcherTraining_model.js');
let Researcher_Control = require("../controller/researcher_control.js");

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
    newResearcherTraining: function (researcherTraining, callback) {
        console.log("Saving ResearcherTraining: " + researcherTraining.trainingName);

        flow.exec(
            function () {
                Researcher_Control.checkResearcherByPersonalID(researcherTraining.researcherPersonalID, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    researcherTraining.researcherId = functionCallback._id
                }
                else {
                    console.log("Researcher with Personal ID " + researcherTraining.researcherPersonalID + " not found for ResearcherTraining named " + researcherTraining.trainingName)
                    researcherTraining.researcherId = "111111111111111111111111"
                }

                researcherTraining.save(function (error, saveResponse) {
                    if (error) {
                        let errCode = "831";
                        let alert = "Saving Publication fail, Error: " + error.message + "@" + researcherTraining.researchName;
                        console.log("ERROR Code: " + errCode + " " + alert);
                        callback(errCode, alert, null);
                    }
                    else {
                        callback("832", null, saveResponse)
                    }
                });

            }
        );
    },
    newResearcherTraining_fromScrap: function (publication_bulk, callback) {
        let j = 0
        let scrapingData = JSON.parse(JSON.stringify(publication_bulk))

        let researcherTraining = new ResearcherTraining();
        let requiredData = [];
        requiredData.push(scrapingData.researcherName);
        let requiredReady = Validate.requiredData_Check(requiredData);

        if (!requiredReady) {
            let alert = "Input Not Valid, check if some data is required."
            console.log(alert);
            callback("New researcherTraining was saved successfully")
        }
        else {
            researcherTraining.researcherName = Validate.scrappingCleanUp(scrapingData.researcherName)
            researcherTraining.researcherPersonalID = Validate.scrappingCleanUp(scrapingData.researcherPersonalID)
            researcherTraining.researchTopic = Validate.scrappingCleanUp(scrapingData.researchTopic)
            researcherTraining.trainingName = Validate.scrappingCleanUp(scrapingData.trainingName)
            researcherTraining.trainingType = Validate.scrappingCleanUp(scrapingData.trainingType)
            researcherTraining.trainingLevel = Validate.scrappingCleanUp(scrapingData.trainingLevel)
            researcherTraining.trainingYear = Validate.scrappingCleanUp(scrapingData.trainingYear)
            researcherTraining.trainingStartDate = Validate.scrappingCleanUp(scrapingData.trainingStartDate)
            researcherTraining.trainingFinishDate = Validate.scrappingCleanUp(scrapingData.trainingFinishDate)
            researcherTraining.trainingLocation = Validate.scrappingCleanUp(scrapingData.trainingLocation)
            researcherTraining.scholarshipType = Validate.scrappingCleanUp(scrapingData.scholarshipType)
            researcherTraining.scholarshipLimit = Validate.scrappingCleanUp(scrapingData.scholarshipLimit)
            researcherTraining.orderCode = Validate.scrappingCleanUp(scrapingData.orderCode)
            researcherTraining.approveDate = Validate.scrappingCleanUp(scrapingData.approveDate)
            researcherTraining.researcherName = Validate.scrappingCleanUp(scrapingData.researcherName)

            flow.exec(
                function () {
                    Researcher_Control.checkResearcherByPersonalID(researcherTraining.researcherPersonalID, this);
                }, function (code, err, functionCallback) {
                    if (!err) {
                        researcherTraining.researcherId = functionCallback._id
                    }
                    else {
                        console.log("Researcher with Personal ID " + researcherTraining.researcherPersonalID + " not found for ResearcherTraining named " + researcherTraining.trainingName)
                        researcherTraining.researcherId = "111111111111111111111111"
                    }

                    researcherTraining.save(function (error, saveResponse) {
                        if (error) {
                            let errCode = "831";
                            let alert = "Saving Publication fail, Error: " + error.message + "@" + researcherTraining.researchName;
                            console.log("ERROR Code: " + errCode + " " + alert);
                        }
                    });
                    callback("New researcherTraining was saved successfully")
                }
            )
        }
    },

    checkResearcherTrainingByID: function (researcherTrainingId, callback) {
        ResearcherTraining.findOne({ "_id": researcherTrainingId }, function (error, functionCallback) {
            if (error) {
                let errCode = "861";
                let alert = "Error in finding ResearcherTraining with _id: " + researcherTrainingId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("862", null, functionCallback)
            }
            else {
                let errCode = "863";
                let alert = "ResearcherTraining with _id: " + researcherTrainingId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },

    getAllResearcherTraining: function (callback) {
        ResearcherTraining.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "651";
                let alert = "Error in getAllPublication , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "652";
                let alert = "Get All Publication Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "653";
                let alert = "No Publication Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },

    deleteResearcherTrainingByID: function (researcherTrainingId, callback) {
        ResearcherTraining.remove({ "_id": researcherTrainingId }, function (error, deleteCallback) {
            if (error) {
                let errCode = "661";
                let alert = "Error in deleting ResearcherTraining with _id " + researcherTrainingId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("662", null, deleteCallback)
            }
        });
    },

    wipeResearcherTraining: function (callback) {
        ResearcherTraining.remove({}, function (error, deleteCallback) {
            if (error) {
                let errCode = "741";
                let alert = "Error in wiping Reward Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("742", null, deleteCallback)
            }
        });
    },

    getAllResearcherTrainingPreview: function (callback) {
        ResearcherTraining.find({}, {
            "_id": true,
            "researcherId": true,
            "researchTopic": true,
            "trainingName": true,
            "trainingType": true,
            "trainingStartDate": true,
            "trainingFinishDate": true,
            "trainingLocation": true,
            "trainingYear": true
        }, function (error, functionCallback) {
            if (error) {
                let errCode = "841";
                let alert = "Error in getAllResearcherTrainingPreview , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback.length > 0) {
                let errCode = "842";
                let alert = "Get All ResearcherTraining Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "843";
                let alert = "No ResearcherTraining Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },

    getAllResearcherTrainingPreviewByResearcherId: function (researcherId, limitNum, callback) {
        ResearcherTraining.find({ "researcherId": researcherId }, {
            "_id": true,
            "researcherId": true,
            "researchTopic": true,
            "trainingName": true,
            "trainingStartDate": true,
            "trainingFinishDate": true,
            "trainingType": true,
            "trainingLocation": true,
            "trainingYear": true
        }, { sort: { "trainingYear": -1 }, limit: limitNum }
            , function (error, functionCallback) {
                if (error) {
                    let errCode = "851";
                    let alert = "Error in getAllResearcherTrainingPreviewByResearcherId , Error : " + error.message;
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
                else if (functionCallback.length > 0) {
                    let errCode = "852";
                    let alert = "Get All ResearcherTraining Completed! ";
                    //console.log(alert);
                    callback(errCode, null, functionCallback)
                }
                else {
                    let errCode = "853";
                    let alert = "No ResearcherTraining Founded";
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
            });
    },

    getFullResearcherTrainingData: function (researcherData, callback) {
        let tmp = JSON.parse(JSON.stringify(researcherData));
        flow.exec(
            function () {
                getFullResearcherTraining(researcherData, this);
            }, function (functionCallback) {
                callback("...", null, functionCallback);
            }
        );
    },

    getAllFullResearcherTrainingDataPreview: function (researcherTraining, callback) {
        let forCallback = [];
        console.log("researcherTraining.length >> " + researcherTraining.length)
        let j = 0;
        if (researcherTraining.length == 0) {
            callback("...", null, []);
        }
        else {
            for (let i = 0; i < researcherTraining.length; i++) {
                getFullResearcherTrainingPreview(researcherTraining[i], function (a) {
                    //console.log("a >> " + JSON.stringify(a))
                    forCallback[i] = a;
                    if (j == researcherTraining.length - 1)
                        callback("...", null, forCallback);
                    else
                        j++;
                });
            }
        }


    }
};

//---------------------------------------------


function getFullResearcherTrainingPreview(input, callback) {
    let researcherTrainingData = JSON.parse(JSON.stringify(input));
    //console.log("getFullResearcherTrainingPreview for " + researcherTrainingData.researchName)
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(researcherTrainingData.researcherId), {}, this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherTrainingData["researcherName_TH"] = functionCallback.researcherName_TH;
                researcherTrainingData["researcherName_EN"] = functionCallback.researcherName_EN;
            }
            else {
                researcherTrainingData["researcherName_TH"] = "Not found";
                researcherTrainingData["researcherName_EN"] = "Not found";
            }

            let start = input.trainingStartDate.split('/')
            let finish = input.trainingFinishDate.split('/')
            researcherTrainingData["dateDisplay"] = start[0] + " - " + finish[0] + " / " + finish[1] + " / " + finish[2];
            callback(researcherTrainingData)
        }
    );
}

function getFullResearcherTraining(input, callback) {
    let researcherTrainingData = JSON.parse(JSON.stringify(input));
    console.log("getFullResearcherTraining for " + researcherTrainingData.researchName)

    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(researcherTrainingData.researcherId), {}, this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researcherTrainingData["researcherName_TH"] = functionCallback.researcherName_TH;
                researcherTrainingData["researcherName_EN"] = functionCallback.researcherName_EN;
            }
            else {
                researcherTrainingData["researcherName_TH"] = "Not found";
                researcherTrainingData["researcherName_EN"] = "Not found";
            }

            let start = input.trainingStartDate.split('/')
            let finish = input.trainingFinishDate.split('/')
            researcherTrainingData["dateDisplay"] = start[0] + " - " + finish[0] + " / " + finish[1] + " / " + finish[2];
            callback(researcherTrainingData)
            
        }
    );
}