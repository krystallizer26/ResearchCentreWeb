var BachelorTeachingDepartment = require('../model/bachelorTeachingDepartment_model.js');
var Researcher = require('../model/researcher_model.js');

module.exports = {
    newBachelorTeachingDepartment: function (bachelorTeachingDepartment, callback) {
        console.log("Saving BachelorTeachingDepartment: " + bachelorTeachingDepartment.bachelorTeachingDepartmentName_TH);
        bachelorTeachingDepartment.save(function (error, saveResponse) {
            console.log("Saving BachelorTeachingDepartment >> COMPLETED ");
            if (error) {
                let errCode = "211";
                var alert = "Saving BachelorTeachingDepartment fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("212", null, saveResponse)
            }
        });
    },
    updateBachelorTeachingDepartmentByID: function (bachelorTeachingDepartmentId, bachelorTeachingDepartment, callback) {
        var myquery = { "_id": bachelorTeachingDepartmentId };
        var newvalues = { $set: { "bachelorTeachingDepartmentName_TH": bachelorTeachingDepartment.bachelorTeachingDepartmentName_TH, "bachelorTeachingDepartmentName_EN": bachelorTeachingDepartment.bachelorTeachingDepartmentName_EN, "editedDate": Date.now() } };
        BachelorTeachingDepartment.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "221";
                var alert = "Error in updating BachelorTeachingDepartment with _id: " + bachelorTeachingDepartmentId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("222", null, updateResponse);
        });
    },
    checkBachelorTeachingDepartmentByID: function (bachelorTeachingDepartmentId, callback) {
        BachelorTeachingDepartment.findOne({ "_id": bachelorTeachingDepartmentId }, function (error, functionCallback) {
            if (error) {
                let errCode = "231";
                var alert = "Error in finding BachelorTeachingDepartment with _id: " + bachelorTeachingDepartmentId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("232", null, functionCallback)
            }
            else {
                let errCode = "233";
                var alert = "BachelorTeachingDepartment with _id: " + bachelorTeachingDepartmentId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    getAllBachelorTeachingDepartment: function (callback) {
        BachelorTeachingDepartment.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "241";
                var alert = "Error in getAllBachelorTeachingDepartment , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "242";
                var alert = "Get All BachelorTeachingDepartment Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "243";
                var alert = "No BachelorTeachingDepartment Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    deleteBachelorTeachingDepartmentByID: function (bachelorTeachingDepartmentId, callback) {
        BachelorTeachingDepartment.remove({ "_id": bachelorTeachingDepartmentId }, function (error, newsCallback) {
            if (error) {
                let errCode = "251";
                var alert = "Error in deleting BachelorTeachingDepartment with _id " + bachelorTeachingDepartmentId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("252", null, newsCallback)
            }
        });
    },
    
};