let Department = require('../model/department_model.js');

module.exports = {
    newDepartment: function (department, callback) {
        console.log("Saving Department: " + department.departmentName_TH);
        department.save(function (error, saveResponse) {
            console.log("Saving Department >> COMPLETED ");
            if (error) {
                let errCode = "011";
                let alert = "Saving Department fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("012", null, saveResponse)
            }
        });
    },
    updateDepartmentByID: function (departmentId, department, callback) {
        let myquery = { "_id": departmentId };
        let newvalues = { $set: { "departmentName_TH": department.departmentName_TH, "departmentName_EN": department.departmentName_EN, "editedDate": Date.now() } };
        Department.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "021";
                let alert = "Error in updating Department with _id: " + departmentId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("022", null, updateResponse);
        });
    },
    checkDepartmentByID: function (departmentId, callback) {
        Department.findOne({ "_id": departmentId }, function (error, functionCallback) {
            if (error) {
                let errCode = "031";
                let alert = "Error in finding Department with _id: " + departmentId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("032", null, functionCallback)
            }
            else {
                let errCode = "033";
                let alert = "Department with _id: " + departmentId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    checkDepartmentName: function (departmentName_TH, callback) {
        Department.findOne({ "departmentName_TH": departmentName_TH }, function (error, functionCallback) {
            if (error) {
                let errCode = "521";
                let alert = "Error in finding Department with name: " + departmentName_TH + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("522", null, functionCallback)
            }
            else {
                let errCode = "523";
                let alert = departmentName_TH + " not founded";
                //console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    checkAndInsertDepartmentByDepartmentName: function (departmentName_TH, departmentName_EN, callback) {
        Department.findOne({ "departmentName_TH": departmentName_TH }, function (error, functionCallback) {
            if (error) {
                let errCode = "491";
                let alert = "Error in finding Department with name: " + departmentName_TH + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("492", null, functionCallback)
            }
            else {
                let alert = "Department with departmentName_TH: " + departmentName_TH + " not found";
                
                let department = new Department();
                department.departmentName_TH = departmentName_TH;
                department.departmentName_EN = departmentName_EN;
                console.log("Saving Department: " + department.departmentName_TH);
                department.save(function (error, saveResponse) {
                    if (error) {
                        let errCode = "493";
                        let alert = "Saving Department fail, Error: " + error.message;
                        console.log("ERROR Code: " + errCode + " " + alert);
                        callback(errCode, alert, null);
                    }
                    else {
                        callback("494", null, saveResponse)
                    }
                });
            }
        });
    },
    getAllDepartment: function (callback) {
        Department.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "041";
                let alert = "Error in getAllDepartment , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "042";
                let alert = "Get All Department Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "043";
                let alert = "No Department Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    deleteDepartmentByID: function (departmentId, callback) {
        Department.remove({ "_id": departmentId }, function (error, newsCallback) {
            if (error) {
                let errCode = "051";
                let alert = "Error in deleting Department with _id " + departmentId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("052", null, newsCallback)
            }
        });
    }
};