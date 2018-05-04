var DoctoryTeachingDepartment = require('../model/doctoryTeachingDepartment_model.js');

module.exports = {
    newDoctoryTeachingDepartment: function (doctoryTeachingDepartment, callback) {
        console.log("Saving DoctoryTeachingDepartment: " + doctoryTeachingDepartment.doctoryTeachingDepartmentName_TH);
        doctoryTeachingDepartment.save(function (error, saveResponse) {
            console.log("Saving DoctoryTeachingDepartment >> COMPLETED ");
            if (error) {
                let errCode = "311";
                var alert = "Saving DoctoryTeachingDepartment fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("312", null, saveResponse)
            }
        });
    },
    updateDoctoryTeachingDepartmentByID: function (doctoryTeachingDepartmentId, doctoryTeachingDepartment, callback) {
        var myquery = { "_id": doctoryTeachingDepartmentId };
        var newvalues = { $set: { "doctoryTeachingDepartmentName_TH": doctoryTeachingDepartment.doctoryTeachingDepartmentName_TH, "doctoryTeachingDepartmentName_EN": doctoryTeachingDepartment.doctoryTeachingDepartmentName_EN, "editedDate": Date.now() } };
        DoctoryTeachingDepartment.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "321";
                var alert = "Error in updating DoctoryTeachingDepartment with _id: " + doctoryTeachingDepartmentId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("322", null, updateResponse);
        });
    },
    checkDoctoryTeachingDepartmentByID: function (doctoryTeachingDepartmentId, callback) {
        DoctoryTeachingDepartment.findOne({ "_id": doctoryTeachingDepartmentId }, function (error, functionCallback) {
            if (error) {
                let errCode = "331";
                var alert = "Error in finding DoctoryTeachingDepartment with _id: " + doctoryTeachingDepartmentId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("332", null, functionCallback)
            }
            else {
                let errCode = "333";
                var alert = "DoctoryTeachingDepartment with _id: " + doctoryTeachingDepartmentId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    checkAndInsertDoctoryTeachingByDoctoryTeachingDepartmentName: function (doctoryTeachingDepartmentName_TH, doctoryTeachingDepartmentName_EN, callback) {
        DoctoryTeachingDepartment.findOne({ "doctoryTeachingDepartmentName_TH": doctoryTeachingDepartmentName_TH }, function (error, functionCallback) {
            if (error) {
                let errCode = "541";
                var alert = "Error in finding DoctoryTeachingDepartment with name: " + doctoryTeachingDepartmentName_TH + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("542", null, functionCallback)
            }
            else {
                var alert = "DoctoryTeachingDepartment with doctoryTeachingDepartmentName_TH: " + doctoryTeachingDepartmentName_TH + " not found";
                
                var doctoryTeachingDepartment = new DoctoryTeachingDepartment();
                doctoryTeachingDepartment.doctoryTeachingDepartmentName_TH = doctoryTeachingDepartmentName_TH;
                doctoryTeachingDepartment.doctoryTeachingDepartmentName_EN = doctoryTeachingDepartmentName_EN;
                console.log("Saving DoctoryTeachingDepartment: " + doctoryTeachingDepartment.doctoryTeachingDepartmentName_TH);
                doctoryTeachingDepartment.save(function (error, saveResponse) {
                    if (error) {
                        let errCode = "543";
                        var alert = "Saving DoctoryTeachingDepartment fail, Error: " + error.message;
                        console.log("ERROR Code: " + errCode + " " + alert);
                        callback(errCode, alert, null);
                    }
                    else {
                        callback("544", null, saveResponse)
                    }
                });
            }
        });
    },
    getAllDoctoryTeachingDepartment: function (callback) {
        DoctoryTeachingDepartment.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "341";
                var alert = "Error in getAllDoctoryTeachingDepartment , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "342";
                var alert = "Get All DoctoryTeachingDepartment Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "343";
                var alert = "No DoctoryTeachingDepartment Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    deleteDoctoryTeachingDepartmentByID: function (doctoryTeachingDepartmentId, callback) {
        DoctoryTeachingDepartment.remove({ "_id": doctoryTeachingDepartmentId }, function (error, newsCallback) {
            if (error) {
                let errCode = "351";
                var alert = "Error in deleting DoctoryTeachingDepartment with _id " + doctoryTeachingDepartmentId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("352", null, newsCallback)
            }
        });
    }
};