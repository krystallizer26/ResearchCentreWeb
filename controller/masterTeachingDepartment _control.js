var MasterTeachingDepartment = require('../model/masterTeachingDepartment_model.js');

module.exports = {
    newMasterTeachingDepartment: function (masterTeachingDepartment, callback) {
        console.log("Saving MasterTeachingDepartment: " + masterTeachingDepartment.masterTeachingDepartmentName_TH);
        masterTeachingDepartment.save(function (error, saveResponse) {
            console.log("Saving MasterTeachingDepartment >> COMPLETED ");
            if (error) {
                let errCode = "261";
                var alert = "Saving MasterTeachingDepartment fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("262", null, saveResponse)
            }
        });
    },
    updateMasterTeachingDepartmentByID: function (masterTeachingDepartmentId, masterTeachingDepartment, callback) {
        var myquery = { "_id": masterTeachingDepartmentId };
        var newvalues = { $set: { "masterTeachingDepartmentName_TH": masterTeachingDepartment.masterTeachingDepartmentName_TH, "masterTeachingDepartmentName_EN": masterTeachingDepartment.masterTeachingDepartmentName_EN, "editedDate": Date.now() } };
        MasterTeachingDepartment.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "271";
                var alert = "Error in updating MasterTeachingDepartment with _id: " + masterTeachingDepartmentId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("272", null, updateResponse);
        });
    },
    checkMasterTeachingDepartmentByID: function (masterTeachingDepartmentId, callback) {
        MasterTeachingDepartment.findOne({ "_id": masterTeachingDepartmentId }, function (error, functionCallback) {
            if (error) {
                let errCode = "281";
                var alert = "Error in finding MasterTeachingDepartment with _id: " + masterTeachingDepartmentId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("282", null, functionCallback)
            }
            else {
                let errCode = "283";
                var alert = "MasterTeachingDepartment with _id: " + masterTeachingDepartmentId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    getAllMasterTeachingDepartment: function (callback) {
        MasterTeachingDepartment.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "291";
                var alert = "Error in getAllMasterTeachingDepartment , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "292";
                var alert = "Get All MasterTeachingDepartment Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "293";
                var alert = "No MasterTeachingDepartment Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    deleteMasterTeachingDepartmentByID: function (masterTeachingDepartmentId, callback) {
        MasterTeachingDepartment.remove({ "_id": masterTeachingDepartmentId }, function (error, newsCallback) {
            if (error) {
                let errCode = "301";
                var alert = "Error in deleting MasterTeachingDepartment with _id " + masterTeachingDepartmentId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("302", null, newsCallback)
            }
        });
    }
};