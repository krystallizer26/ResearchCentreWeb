let flow = require('../services/flow.js')
let ObjectId = require('mongodb').ObjectId;

let ResearchFund = require('../model/researchFund_model.js');

let Validate = require("../controller/validation_controller.js");
let Researcher_Control = require("./researcher_control.js");
let Position_Control = require("../controller/position_control.js");
let Keyword_Control = require("../controller/keyword_control.js");
let AcademicLevel_Control = require("../controller/academicLevel_control.js");
let Department_Control = require("../controller/department_control.js");
let BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");
let MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");
let DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");

module.exports = {
    newResearchFund: function (researchFund, callback) {
        console.log("Saving ResearchFund: " + researchFund.researchName);

        flow.exec(
            function () {
                Researcher_Control.checkResearcherByPersonalID(researchFund.researcherPersonalID, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    researchFund.researcherId = functionCallback._id
                }
                else {
                    console.log("Researcher with personalID " + researchFund.researcherPersonalID + " not found for Research named " + researchFund.researchName)
                    researchFund.researcherId = "111111111111111111111111"
                }

                researchFund.save(function (error, saveResponse) {
                    if (error) {
                        let errCode = "621";
                        let alert = "Saving Publication fail, Error: " + error.message + "@" + researchFund.researchName;
                        console.log("ERROR Code: " + errCode + " " + alert);
                        callback(errCode, alert, null);
                    }
                    else {
                        callback("622", null, saveResponse)
                    }
                });

            }
        );
    },
    newResearchFund_fromScrap: function (publication_bulk, callback) {
        let j = 0
        let scrapingData = JSON.parse(JSON.stringify(publication_bulk))

        let researchFund = new ResearchFund();
        let requiredData = [];
        requiredData.push(scrapingData.researcherName);
        requiredData.push(scrapingData.researcherPersonalID);
        requiredData.push(scrapingData.researchName);
        let requiredReady = Validate.requiredData_Check(requiredData);

        if (!requiredReady) {
            let alert = "Input Not Valid, check if some data is required."
            console.log(alert);
            callback("New Publications was saved successfully")
        }
        else {
            researchFund.researcherName = Validate.scrappingCleanUp(scrapingData.researcherName)
            researchFund.researcherPersonalID = Validate.scrappingCleanUp(scrapingData.researcherPersonalID)
            researchFund.researchName = Validate.scrappingCleanUp(scrapingData.researchName)
            researchFund.fundSource = Validate.scrappingCleanUp(scrapingData.fundSource)
            researchFund.scholarshipYear = Validate.scrappingCleanUp(scrapingData.scholarshipYear)
            researchFund.scholarshipStart = Validate.scrappingCleanUp(scrapingData.scholarshipStart)
            researchFund.scholarshipPeriod = Validate.scrappingCleanUp(scrapingData.scholarshipPeriod)
            researchFund.progress6MonthDate = Validate.scrappingCleanUp(scrapingData.progress6MonthDate)
            researchFund.progress6MonthPercent = Validate.scrappingCleanUp(scrapingData.progress6MonthPercent)
            researchFund.progress12MonthDate = Validate.scrappingCleanUp(scrapingData.progress12MonthDate)
            researchFund.progress12MonthPercent = Validate.scrappingCleanUp(scrapingData.progress12MonthPercent)
            researchFund.extend1 = Validate.scrappingCleanUp(scrapingData.extend1)
            researchFund.extend2 = Validate.scrappingCleanUp(scrapingData.extend2)
            researchFund.fullPaperDate = Validate.scrappingCleanUp(scrapingData.fullPaperDate)

            researchFund.result1 = Validate.scrappingCleanUp(scrapingData.result1)
            researchFund.result2 = Validate.scrappingCleanUp(scrapingData.result2)
            researchFund.finishDate = Validate.scrappingCleanUp(scrapingData.finishDate)
            researchFund.perYear = Validate.scrappingCleanUp(scrapingData.perYear)
            researchFund.continueYear = Validate.scrappingCleanUp(scrapingData.continueYear)
            researchFund.maximumFund = Validate.scrappingCleanUp(scrapingData.maximumFund)
            researchFund.ratio = Validate.scrappingCleanUp(scrapingData.ratio)
            researchFund.role = Validate.scrappingCleanUp(scrapingData.role)
            researchFund.before2561Inside = Validate.scrappingCleanUp(scrapingData.before2561Inside)
            researchFund.before2561Outside = Validate.scrappingCleanUp(scrapingData.before2561Outside)
            researchFund.after2561 = Validate.scrappingCleanUp(scrapingData.after2561)
            researchFund.detail = Validate.scrappingCleanUp(scrapingData.detail)

            let Researcher_Control = require("./researcher_control.js");
            flow.exec(
                function () {
                    Researcher_Control.checkResearcherByPersonalID(researchFund.researcherPersonalID, this);
                }, function (code, err, functionCallback) {
                    if (!err) {
                        researchFund.researcherId = functionCallback._id
                    }
                    else {
                        console.log("Researcher with personalID " + researchFund.researcherPersonalID + " not found for Research named " + researchFund.researchName)
                        researchFund.researcherId = "111111111111111111111111"
                    }

                    researchFund.save(function (error, saveResponse) {
                        if (error) {
                            let errCode = "621";
                            let alert = "Saving researchFund fail, Error: " + error.message + "@" + researchFund.researchName;
                            console.log("ERROR Code: " + errCode + " " + alert);
                        }
                    });
                    callback("New Researcher was saved successfully")

                }
            );
        }
    },

    checkResearchFundByID: function (researchFundId, callback) {
        ResearchFund.findOne({ "_id": researchFundId }, function (error, functionCallback) {
            if (error) {
                let errCode = "671";
                let alert = "Error in finding ResearchFund with _id: " + researchFundId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("672", null, functionCallback)
            }
            else {
                let errCode = "673";
                let alert = "ResearchFund with _id: " + researchFundId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },

    getAllResearchFund: function (callback) {
        ResearchFund.find({}, {}, function (error, functionCallback) {
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

    deleteResearchFundByID: function (researchFundId, callback) {
        ResearchFund.remove({ "_id": researchFundId }, function (error, deleteCallback) {
            if (error) {
                let errCode = "661";
                let alert = "Error in deleting ResearchFund with _id " + researchFundId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("662", null, deleteCallback)
            }
        });
    },

    wipeResearchFund: function (callback) {
        ResearchFund.remove({}, function (error, deleteCallback) {
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
    
    getAllResearchFundPreview: function (callback) {
        ResearchFund.find({}, {
            "_id": true,
            "researcherId": true,
            "researchName": true,
            "fundSource": true,
            "fundSource2": true,
            "scholarshipPeriod": true,
            "scholarshipYear": true
        }, function (error, functionCallback) {
            if (error) {
                let errCode = "631";
                let alert = "Error in getAllResearchFundPreview , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback.length > 0) {
                let errCode = "632";
                let alert = "Get All ResearchFund Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "633";
                let alert = "No ResearchFund Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    
    getAllResearchFund: function (callback) {
        ResearchFund.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "631";
                let alert = "Error in getAllResearchFundPreview , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback.length > 0) {
                let errCode = "632";
                let alert = "Get All ResearchFund Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "633";
                let alert = "No ResearchFund Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },

    getAllResearchFundPreviewByResearcherId: function (researcherId, limitNum, callback) {
        ResearchFund.find({ "researcherId": researcherId }, {
            "_id": true,
            "researcherId": true,
            "researchName": true,
            "fundSource": true,
            "fundSource2": true,
            "scholarshipPeriod": true,
            "scholarshipYear": true
        }, { sort: { "scholarshipYear": -1 }, limit: limitNum }
            , function (error, functionCallback) {
                if (error) {
                    let errCode = "641";
                    let alert = "Error in getAllResearchFundPreviewByResearcherId , Error : " + error.message;
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
                else if (functionCallback.length > 0) {
                    let errCode = "642";
                    let alert = "Get All ResearchFund Completed! ";
                    //console.log(alert);
                    callback(errCode, null, functionCallback)
                }
                else {
                    let errCode = "643";
                    let alert = "No ResearchFund Founded";
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
            });
    },

    getAllResearchFundByResearcherId: function (researcherId, limitNum, callback) {
        ResearchFund.find({ "researcherId": researcherId }, {}, { sort: { "scholarshipYear": -1 }, limit: limitNum }
            , function (error, functionCallback) {
                if (error) {
                    let errCode = "641";
                    let alert = "Error in getAllResearchFundPreviewByResearcherId , Error : " + error.message;
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
                else if (functionCallback.length > 0) {
                    let errCode = "642";
                    let alert = "Get All ResearchFund Completed! ";
                    //console.log(alert);
                    callback(errCode, null, functionCallback)
                }
                else {
                    let errCode = "643";
                    let alert = "No ResearchFund Founded";
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
            });
    },

    getFullResearchFundData: function (researcherData, callback) {
        let tmp = JSON.parse(JSON.stringify(researcherData));
        flow.exec(
            function () {
                getFullResearchFund(researcherData, this);
            }, function (functionCallback) {
                callback("...", null, functionCallback);
            }
        );
    },

    getAllFullResearchFundDataPreview: function (researchFund, callback) {
        let forCallback = [];
        console.log("researchFund.length >> " + researchFund.length)
        let j = 0;
        if (researchFund.length == 0) {
            callback("...", null, []);
        }
        else {
            for (let i = 0; i < researchFund.length; i++) {
                getFullResearchFundPreview(researchFund[i], function (a) {
                    //console.log("a >> " + JSON.stringify(a))
                    forCallback.push(a);
                    if (j == researchFund.length - 1)
                        callback("...", null, forCallback);
                    else
                        j++;
                });
            }
        }


    }
};

//---------------------------------------------

function getFullResearchFundPreview(input, callback) {
    let researchFundData = JSON.parse(JSON.stringify(input));
    console.log("getFullResearchFundPreview for " + researchFundData.researchName)
    let Researcher_Control = require("./researcher_control.js");
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(researchFundData.researcherId), {}, this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researchFundData["researcherName_TH"] = functionCallback.researcherName_TH;
                researchFundData["researcherName_EN"] = functionCallback.researcherName_EN;
            }
            else {
                researchFundData["researcherName_TH"] = "Not found";
                researchFundData["researcherName_EN"] = "Not found";
            }
            callback(researchFundData)
        }
    );
}

function getFullResearchFund(input, callback) {
    let researchFundData = JSON.parse(JSON.stringify(input));
    console.log("getFullResearchFund for " + researchFundData.researchName)

    let Researcher_Control = require("./researcher_control.js");
    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(researchFundData.researcherId), {}, this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                researchFundData["researcherName_TH"] = functionCallback.researcherName_TH;
                researchFundData["researcherName_EN"] = functionCallback.researcherName_EN;
            }
            else {
                researchFundData["researcherName_TH"] = "Not found";
                researchFundData["researcherName_EN"] = "Not found";
            }
            callback(researchFundData)
        }
    );
}