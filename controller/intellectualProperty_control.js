let flow = require('../services/flow.js')
let ObjectId = require('mongodb').ObjectId;

let IntellectualProperty = require('../model/intellectualProperty_model.js');

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
    newIntellectualProperty: function (intellectualProperty, callback) {
        console.log("Saving IntellectualProperty: " + intellectualProperty.intellectualPropertyName);

        flow.exec(
            function () {
                Researcher_Control.checkResearcherByPersonalID(intellectualProperty.researcherPersonalID, this);
            }, function (code, err, functionCallback) {
                if (!err) {
                    intellectualProperty.researcherId = functionCallback._id
                }
                else {
                    console.log("Researcher with personalID " + intellectualProperty.researcherPersonalID + " not found for IntellectualProperty named " + intellectualProperty.intPropertyName)
                    intellectualProperty.researcherId = "111111111111111111111111"
                }

                intellectualProperty.save(function (error, saveResponse) {
                    if (error) {
                        let errCode = "681";
                        let alert = "Saving Publication fail, Error: " + error.message + "@" + intellectualProperty.intPropertyName;
                        console.log("ERROR Code: " + errCode + " " + alert);
                        callback(errCode, alert, null);
                    }
                    else {
                        callback("682", null, saveResponse)
                    }
                });

            }
        );
    },
    newIntellectualProperty_fromScrap: function (publication_bulk, callback) {
        let j = 0
        let scrapingData = JSON.parse(JSON.stringify(publication_bulk))

        let intellectualProperty = new IntellectualProperty();
        let requiredData = [];
        requiredData.push(scrapingData.researcherName);
        requiredData.push(scrapingData.researcherPersonalID);
        requiredData.push(scrapingData.intPropertyName);
        let requiredReady = Validate.requiredData_Check(requiredData);

        if (!requiredReady) {
            let alert = "Input Not Valid, check if some data is required."
            console.log(alert);
            callback("New Publications was saved successfully")
        }
        else {
            intellectualProperty.researcherName = Validate.scrappingCleanUp(scrapingData.researcherName)
            intellectualProperty.researcherPersonalID = Validate.scrappingCleanUp(scrapingData.researcherPersonalID)
            intellectualProperty.intPropertyCode = Validate.scrappingCleanUp(scrapingData.intPropertyCode)
            intellectualProperty.intPropertyName = Validate.scrappingCleanUp(scrapingData.intPropertyName)
            intellectualProperty.intPropertyRegisterDate = Validate.scrappingCleanUp(scrapingData.intPropertyRegisterDate)
            intellectualProperty.licenseCode = Validate.scrappingCleanUp(scrapingData.licenseCode)
            intellectualProperty.intPropertyName = Validate.scrappingCleanUp(scrapingData.intPropertyName)
            intellectualProperty.licenseType = Validate.scrappingCleanUp(scrapingData.licenseType)
            intellectualProperty.claimBy = Validate.scrappingCleanUp(scrapingData.claimBy)
            intellectualProperty.coCreation = Validate.scrappingCleanUp(scrapingData.coCreation)

            let Researcher_Control = require("./researcher_control.js");
            flow.exec(
                function () {
                    Researcher_Control.checkResearcherByPersonalID(intellectualProperty.researcherPersonalID, this);
                }, function (code, err, functionCallback) {
                    if (!err) {
                        intellectualProperty.researcherId = functionCallback._id
                    }
                    else {
                        console.log("Researcher with personalID " + intellectualProperty.researcherPersonalID + " not found for IntellectualProperty named " + intellectualProperty.intPropertyName)
                        intellectualProperty.researcherId = "111111111111111111111111"
                    }

                    intellectualProperty.save(function (error, saveResponse) {
                        if (error) {
                            let errCode = "681";
                            let alert = "Saving intellectualProperty fail, Error: " + error.message + "@" + intellectualProperty.intPropertyName;
                            console.log("ERROR Code: " + errCode + " " + alert);
                            callback(errCode, alert, null);
                        }
                        else {
                            callback("682", null, saveResponse)
                        }
                    });
                    callback("New intellectualProperty was saved successfully")

                }
            );
        }
    },

    getAllIntellectualPropertyPreview: function (callback) {
        IntellectualProperty.find({}, {
            "_id": true,
            "researcherId": true,
            "intPropertyRegisterDate": true,
            "intPropertyCode": true,
            "licenseCode": true,
            "intPropertyName": true,
            "claimBy": true,
            "licenseType": true
        }, function (error, functionCallback) {
            if (error) {
                let errCode = "691";
                let alert = "Error in getAllIntellectualPropertyPreview , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback.length > 0) {
                let errCode = "692";
                let alert = "Get All IntellectualProperty Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "693";
                let alert = "No IntellectualProperty Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },

    getAllIntellectualProperty: function (callback) {
        IntellectualProperty.find({}, {
        }, function (error, functionCallback) {
            if (error) {
                let errCode = "691";
                let alert = "Error in getAllIntellectualPropertyPreview , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback.length > 0) {
                let errCode = "692";
                let alert = "Get All IntellectualProperty Completed! ";
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "693";
                let alert = "No IntellectualProperty Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },

    getAllIntellectualPropertyPreviewByResearcherId: function (researcherId, limitNum, callback) {
        IntellectualProperty.find({ "researcherId": researcherId }, {
            "_id": true,
            "researcherId": true,
            "intPropertyRegisterDate": true,
            "intPropertyCode": true,
            "licenseCode": true,
            "intPropertyName": true,
            "claimBy": true,
            "licenseType": true
        }, { /*sort: { "intellectualPropertyYear": -1 },*/ limit: limitNum }
            , function (error, functionCallback) {
                if (error) {
                    let errCode = "701";
                    let alert = "Error in getAllIntellectualPropertyPreviewByResearcherId , Error : " + error.message;
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
                else if (functionCallback.length > 0) {
                    let errCode = "702";
                    let alert = "Get All IntellectualProperty Completed! ";
                    //console.log(alert);
                    callback(errCode, null, functionCallback)
                }
                else {
                    let errCode = "703";
                    let alert = "No IntellectualProperty Founded";
                    //console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
            });
    },

    getAllIntellectualPropertyByResearcherId: function (researcherId, limitNum, callback) {
        IntellectualProperty.find({ "researcherId": researcherId }, {
        }, { /*sort: { "intellectualPropertyYear": -1 },*/ limit: limitNum }
            , function (error, functionCallback) {
                if (error) {
                    let errCode = "701";
                    let alert = "Error in getAllIntellectualPropertyPreviewByResearcherId , Error : " + error.message;
                    console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
                else if (functionCallback.length > 0) {
                    let errCode = "702";
                    let alert = "Get All IntellectualProperty Completed! ";
                    //console.log(alert);
                    callback(errCode, null, functionCallback)
                }
                else {
                    let errCode = "703";
                    let alert = "No IntellectualProperty Founded";
                    //console.log("ERROR Code: " + errCode + " " + alert);
                    callback(errCode, alert, null)
                }
            });
    },

    checkIntellectualPropertyByID: function (intellectualPropertyId, callback) {
        IntellectualProperty.findOne({ "_id": intellectualPropertyId }, function (error, functionCallback) {
            if (error) {
                let errCode = "711";
                let alert = "Error in finding IntellectualProperty with _id: " + intellectualPropertyId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("712", null, functionCallback)
            }
            else {
                let errCode = "713";
                let alert = "IntellectualProperty with _id: " + intellectualPropertyId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },

    deleteIntellectualPropertyByID: function (intellectualPropertyId, callback) {
        IntellectualProperty.remove({ "_id": intellectualPropertyId }, function (error, deleteCallback) {
            if (error) {
                let errCode = "721";
                let alert = "Error in deleting IntellectualProperty with _id " + intellectualPropertyId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("722", null, deleteCallback)
            }
        });
    },

    wipeIntellectualProperty: function (callback) {
        IntellectualProperty.remove({}, function (error, deleteCallback) {
            if (error) {
                let errCode = "731";
                let alert = "Error in wiping IntellectualProperty Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("732", null, deleteCallback)
            }
        });
    },

    getFullIntellectualPropertyData: function (researcherData, callback) {
        let tmp = JSON.parse(JSON.stringify(researcherData));
        flow.exec(
            function () {
                getFullIntellectualProperty(researcherData, this);
            }, function (functionCallback) {
                callback("...", null, functionCallback);
            }
        );
    },

    getAllFullIntellectualPropertyDataPreview: function (intellectualProperty, callback) {
        let forCallback = [];
        console.log("intellectualProperty.length >> " + intellectualProperty.length)
        let j = 0;
        if (intellectualProperty.length == 0) {
            callback("...", null, []);
        }
        else {
            for (let i = 0; i < intellectualProperty.length; i++) {
                getFullIntellectualPropertyPreview(intellectualProperty[i], function (a) {
                    //console.log("a >> " + JSON.stringify(a))
                    forCallback.push(a);
                    if (j == intellectualProperty.length - 1)
                        callback("...", null, forCallback);
                    else
                        j++;
                });
            }
        }


    }
};

//---------------------------------------------


function getFullIntellectualPropertyPreview(input, callback) {
    let intellectualPropertyData = JSON.parse(JSON.stringify(input));
    console.log("getFullIntellectualPropertyPreview for " + intellectualPropertyData.researchName)

    let Researcher_Control = require("./researcher_control.js");

    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(intellectualPropertyData.researcherId), {}, this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                intellectualPropertyData["researcherName_TH"] = functionCallback.researcherName_TH;
                intellectualPropertyData["researcherName_EN"] = functionCallback.researcherName_EN;
            }
            else {
                intellectualPropertyData["researcherName_TH"] = "Not found";
                intellectualPropertyData["researcherName_EN"] = "Not found";
            }
            callback(intellectualPropertyData)
        }
    );
}

function getFullIntellectualProperty(input, callback) {
    let intellectualPropertyData = JSON.parse(JSON.stringify(input));
    console.log("getFullIntellectualProperty for " + intellectualPropertyData.researchName)

    let Researcher_Control = require("./researcher_control.js");

    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Researcher_Control.checkResearcherByID(new ObjectId(intellectualPropertyData.researcherId), {}, this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                intellectualPropertyData["researcherName_TH"] = functionCallback.researcherName_TH;
                intellectualPropertyData["researcherName_EN"] = functionCallback.researcherName_EN;
            }
            else {
                intellectualPropertyData["researcherName_TH"] = "Not found";
                intellectualPropertyData["researcherName_EN"] = "Not found";
            }
            callback(intellectualPropertyData)
        }
    );
}