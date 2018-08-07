let MasterTeachingDepartment = require('../model/masterTeachingDepartment_model.js');

module.exports = {
    newMasterTeachingDepartment: function (masterTeachingDepartment, callback) {
        console.log("Saving MasterTeachingDepartment: " + masterTeachingDepartment.masterTeachingDepartmentName_TH);
        masterTeachingDepartment.save(function (error, saveResponse) {
            console.log("Saving MasterTeachingDepartment >> COMPLETED ");
            if (error) {
                let errCode = "261";
                let alert = "Saving MasterTeachingDepartment fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("262", null, saveResponse)
            }
        });
    },
    updateMasterTeachingDepartmentByID: function (masterTeachingDepartmentId, masterTeachingDepartment, callback) {
        let myquery = { "_id": masterTeachingDepartmentId };
        let newvalues = { $set: { "masterTeachingDepartmentName_TH": masterTeachingDepartment.masterTeachingDepartmentName_TH, "masterTeachingDepartmentName_EN": masterTeachingDepartment.masterTeachingDepartmentName_EN, "editedDate": Date.now() } };
        MasterTeachingDepartment.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "271";
                let alert = "Error in updating MasterTeachingDepartment with _id: " + masterTeachingDepartmentId + "\nError: " + error.message;
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
                let alert = "Error in finding MasterTeachingDepartment with _id: " + masterTeachingDepartmentId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("282", null, functionCallback)
            }
            else {
                let errCode = "283";
                let alert = "MasterTeachingDepartment with _id: " + masterTeachingDepartmentId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    checkMasterTeachingDepartmentName: function (masterTeachingDepartmentName_TH, callback) {
        MasterTeachingDepartment.findOne({ "masterTeachingDepartmentName_TH": masterTeachingDepartmentName_TH }, function (error, functionCallback) {
            if (error) {
                let errCode = "531";
                let alert = "Error in finding MasterTeachingDepartment with name: " + masterTeachingDepartmentName_TH + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("532", null, functionCallback)
            }
            else {
                let errCode = "533";
                let alert = masterTeachingDepartmentName_TH + " not founded";
                //console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    checkAndInsertMasterTeachingByMasterTeachingDepartmentName: function (masterTeachingDepartmentName_TH, masterTeachingDepartmentName_EN, callback) {
        MasterTeachingDepartment.findOne({ "masterTeachingDepartmentName_TH": masterTeachingDepartmentName_TH }, function (error, functionCallback) {
            if (error) {
                let errCode = "531";
                let alert = "Error in finding MasterTeachingDepartment with name: " + masterTeachingDepartmentName_TH + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("532", null, functionCallback)
            }
            else {
                let alert = "MasterTeachingDepartment with masterTeachingDepartmentName_TH: " + masterTeachingDepartmentName_TH + " not found";
                
                let masterTeachingDepartment = new MasterTeachingDepartment();
                masterTeachingDepartment.masterTeachingDepartmentName_TH = masterTeachingDepartmentName_TH;
                masterTeachingDepartment.masterTeachingDepartmentName_EN = masterTeachingDepartmentName_EN;
                console.log("Saving MasterTeachingDepartment: " + masterTeachingDepartment.masterTeachingDepartmentName_TH);
                masterTeachingDepartment.save(function (error, saveResponse) {
                    if (error) {
                        let errCode = "533";
                        let alert = "Saving MasterTeachingDepartment fail, Error: " + error.message;
                        console.log("ERROR Code: " + errCode + " " + alert);
                        callback(errCode, alert, null);
                    }
                    else {
                        callback("534", null, saveResponse)
                    }
                });
            }
        });
    },
    getAllMasterTeachingDepartment: function (callback) {
        MasterTeachingDepartment.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "291";
                let alert = "Error in getAllMasterTeachingDepartment , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "292";
                let alert = "Get All MasterTeachingDepartment Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "293";
                let alert = "No MasterTeachingDepartment Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    deleteMasterTeachingDepartmentByID: function (masterTeachingDepartmentId, callback) {
        MasterTeachingDepartment.remove({ "_id": masterTeachingDepartmentId }, function (error, newsCallback) {
            if (error) {
                let errCode = "301";
                let alert = "Error in deleting MasterTeachingDepartment with _id " + masterTeachingDepartmentId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("302", null, newsCallback)
            }
        });
    }
};