var AcademicLevel = require('../model/academicLevel_model.js');

module.exports = {
    newAcademicLevel: function (academicLevel, callback) {
        console.log("Saving AcademicLevel: " + academicLevel.academicLevelName_TH);
        academicLevel.save(function (error, saveResponse) {
            console.log("Saving AcademicLevel >> COMPLETED ");
            if (error) {
                let errCode = "161";
                var alert = "Saving AcademicLevel fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("162", null, saveResponse)
            }
        });
    },
    updateAcademicLevelByID: function (academicLevelId, academicLevel, callback) {
        var myquery = { "_id": academicLevelId };
        var newvalues = { $set: { "academicLevelName_TH": academicLevel.academicLevelName_TH, "academicLevelName_EN": academicLevel.academicLevelName_EN, "editedDate": Date.now() } };
        AcademicLevel.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "171";
                var alert = "Error in updating AcademicLevel with _id: " + academicLevelId + "\nError: " + error.message;
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
                var alert = "Error in finding AcademicLevel with _id: " + academicLevelId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("182", null, functionCallback)
            }
            else {
                let errCode = "183";
                var alert = "AcademicLevel with _id: " + academicLevelId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    checAcademicLevelName: function (academicPositionName_TH, callback) {
        AcademicLevel.findOne({ "academicLevelName_TH": academicPositionName_TH }, function (error, functionCallback) {
            if (error) {
                let errCode = "521";
                var alert = "Error in finding AcademicLevel with name: " + academicPositionName_TH + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("522", null, functionCallback)
            }
            else {
                let errCode = "523";
                var alert = academicPositionName_TH + " not founded";
                //console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    checkAndInsertAcademicLevelByAcademicLevelName: function (academicPositionName_TH, academicPositionName_EN, callback) {
        AcademicLevel.findOne({ "academicLevelName_TH": academicPositionName_TH }, function (error, functionCallback) {
            if (error) {
                let errCode = "511";
                var alert = "Error in finding AcademicLevel with name: " + academicPositionName_TH + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("512", null, functionCallback)
            }
            else {
                var alert = "AcademicLevel with academicPositionName_TH: " + academicPositionName_TH + " not found";
                
                var academicLevel = new AcademicLevel();
                academicLevel.academicLevelName_TH = academicPositionName_TH;
                academicLevel.academicLevelName_EN = academicPositionName_EN;
                console.log("Saving AcademicLevel: " + academicLevel.academicLevelName_TH);
                academicLevel.save(function (error, saveResponse) {
                    if (error) {
                        let errCode = "513";
                        var alert = "Saving AcademicLevel fail, Error: " + error.message;
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
                var alert = "Error in getAllAcademicLevel , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "192";
                var alert = "Get All AcademicLevel Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "193";
                var alert = "No AcademicLevel Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    deleteAcademicLevelByID: function (academicLevelId, callback) {
        AcademicLevel.remove({ "_id": academicLevelId }, function (error, newsCallback) {
            if (error) {
                let errCode = "201";
                var alert = "Error in deleting AcademicLevel with _id " + academicLevelId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("202", null, newsCallback)
            }
        });
    }
};