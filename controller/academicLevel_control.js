let AcademicLevel = require('../model/academicLevel_model.js');

module.exports = {
    newAcademicLevel: function (academicLevel, callback) {
        console.log("Saving AcademicLevel: " + academicLevel.academicLevelName_TH);
        academicLevel.save(function (error, saveResponse) {
            console.log("Saving AcademicLevel >> COMPLETED ");
            if (error) {
                let errCode = "161";
                let alert = "Saving AcademicLevel fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("162", null, saveResponse)
            }
        });
    },
    updateAcademicLevelByID: function (academicLevelId, academicLevel, callback) {
        let myquery = { "_id": academicLevelId };
        let newvalues = { $set: { "academicLevelName_TH": academicLevel.academicLevelName_TH, "academicLevelName_EN": academicLevel.academicLevelName_EN, "editedDate": Date.now() } };
        AcademicLevel.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "171";
                let alert = "Error in updating AcademicLevel with _id: " + academicLevelId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("172", null, updateResponse);
        });
    },
    checkAcademicLevelByID: function (academicLevelId, callback) {
        AcademicLevel.findOne({ "_id": academicLevelId }, function (error, functionCallback) {
            if (error) {
                let errCode = "181";
                let alert = "Error in finding AcademicLevel with _id: " + academicLevelId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("182", null, functionCallback)
            }
            else {
                let errCode = "183";
                let alert = "AcademicLevel with _id: " + academicLevelId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    checAcademicLevelName: function (academicPositionName_TH, callback) {
        AcademicLevel.findOne({ "academicLevelName_TH": academicPositionName_TH }, function (error, functionCallback) {
            if (error) {
                let errCode = "521";
                let alert = "Error in finding AcademicLevel with name: " + academicPositionName_TH + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("522", null, functionCallback)
            }
            else {
                let errCode = "523";
                let alert = academicPositionName_TH + " not founded";
                //console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    checkAndInsertAcademicLevelByAcademicLevelName: function (academicPositionName_TH, academicPositionName_EN, callback) {
        AcademicLevel.findOne({ "academicLevelName_TH": academicPositionName_TH }, function (error, functionCallback) {
            if (error) {
                let errCode = "511";
                let alert = "Error in finding AcademicLevel with name: " + academicPositionName_TH + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("512", null, functionCallback)
            }
            else {
                let alert = "AcademicLevel with academicPositionName_TH: " + academicPositionName_TH + " not found";
                
                let academicLevel = new AcademicLevel();
                academicLevel.academicLevelName_TH = academicPositionName_TH;
                academicLevel.academicLevelName_EN = academicPositionName_EN;
                console.log("Saving AcademicLevel: " + academicLevel.academicLevelName_TH);
                academicLevel.save(function (error, saveResponse) {
                    if (error) {
                        let errCode = "513";
                        let alert = "Saving AcademicLevel fail, Error: " + error.message;
                        console.log("ERROR Code: " + errCode + " " + alert);
                        callback(errCode, alert, null);
                    }
                    else {
                        callback("514", null, saveResponse)
                    }
                });
            }
        });
    },
    getAllAcademicLevel: function (callback) {
        AcademicLevel.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "191";
                let alert = "Error in getAllAcademicLevel , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "192";
                let alert = "Get All AcademicLevel Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "193";
                let alert = "No AcademicLevel Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    deleteAcademicLevelByID: function (academicLevelId, callback) {
        AcademicLevel.remove({ "_id": academicLevelId }, function (error, newsCallback) {
            if (error) {
                let errCode = "201";
                let alert = "Error in deleting AcademicLevel with _id " + academicLevelId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("202", null, newsCallback)
            }
        });
    }
};