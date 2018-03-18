var express = require('express');
var router = express.Router();

// DATABASE SETUP
var ObjectId = require('mongodb').ObjectId;


//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests
router.use(function (req, res, next) {
    console.log("\n** Request detected >> " + JSON.stringify(req.body));
    next();
});

//Must use
var flow = require('../services/flow.js')
var ReturnCode = require('../model/returnCode.js');
var Validate = require("../controller/validation_controller.js");
var Return_control = require('../controller/return_control.js');

//Model
var MasterTeachingDepartment = require('../model/masterTeachingDepartment_model.js');

//Controller
var MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");

router.post('/newMasterTeachingDepartment', function (request, response) {
    var methodCode = "26";

    var requiredData = [];
    requiredData.push(request.body.masterTeachingDepartmentName_TH);
    requiredData.push(request.body.masterTeachingDepartmentName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                var masterTeachingDepartment = new MasterTeachingDepartment();
                masterTeachingDepartment.masterTeachingDepartmentName_TH = request.body.masterTeachingDepartmentName_TH;
                masterTeachingDepartment.masterTeachingDepartmentName_EN = request.body.masterTeachingDepartmentName_EN;
                MasterTeachingDepartment_Control.newMasterTeachingDepartment(masterTeachingDepartment, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCodeAndData(ReturnCode.success, "New MasterTeachingDepartment was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editMasterTeachingDepartment/', function (request, response) {
    var methodCode = "27";

    var requiredData = [];
    requiredData.push(request.body.masterTeachingDepartmentId);
    requiredData.push(request.body.masterTeachingDepartmentName_TH);
    requiredData.push(request.body.masterTeachingDepartmentName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.masterTeachingDepartmentId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(request.body.masterTeachingDepartmentId), this);
            }, function (code, err, result) {
                if (code != "282") {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    var masterTeachingDepartment = new MasterTeachingDepartment();
                    masterTeachingDepartment.masterTeachingDepartmentName_TH = request.body.masterTeachingDepartmentName_TH;
                    masterTeachingDepartment.masterTeachingDepartmentName_EN = request.body.masterTeachingDepartmentName_EN;
                    MasterTeachingDepartment_Control.updateMasterTeachingDepartmentByID(new ObjectId(request.body.masterTeachingDepartmentId), masterTeachingDepartment, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "MasterTeachingDepartment with _id: " + request.body.masterTeachingDepartmentId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllMasterTeachingDepartment/', function (request, response) {
    var methodCode = "28";

    flow.exec(
        function () {
            MasterTeachingDepartment_Control.getAllMasterTeachingDepartment(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_control.responseWithCodeAndData("999999", "get All MasterTeachingDepartment Completed", functionCallback, response)
            }
        }
    );

});

router.post('/getMasterTeachingDepartmentfromID/', function (request, response) {
    var methodCode = "29";

    var requiredData = [];
    requiredData.push(request.body.masterTeachingDepartmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.masterTeachingDepartmentId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(request.body.masterTeachingDepartmentId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCodeAndData("999999", "get MasterTeachingDepartment with _id " + request.body.masterTeachingDepartmentId + " Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/deleteMasterTeachingDepartment/', function (request, response) {
    var methodCode = "30";

    var requiredData = [];
    requiredData.push(request.body.masterTeachingDepartmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.masterTeachingDepartmentId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(request.body.masterTeachingDepartmentId), this);
            }, function (code, err, result) {
                if (code != "282") {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    MasterTeachingDepartment_Control.deleteMasterTeachingDepartmentByID(new ObjectId(request.body.masterTeachingDepartmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "MasterTeachingDepartment_Control with _id: " + request.body.masterTeachingDepartmentId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------