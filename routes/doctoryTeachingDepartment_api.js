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
var DoctoryTeachingDepartment = require('../model/doctoryTeachingDepartment_model.js');

//Controller
var DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");

router.post('/newDoctoryTeachingDepartment', function (request, response) {
    var methodCode = "31";

    var requiredData = [];
    requiredData.push(request.body.doctoryTeachingDepartmentName_TH);
    requiredData.push(request.body.doctoryTeachingDepartmentName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                var doctoryTeachingDepartment = new DoctoryTeachingDepartment();
                doctoryTeachingDepartment.doctoryTeachingDepartmentName_TH = request.body.doctoryTeachingDepartmentName_TH;
                doctoryTeachingDepartment.doctoryTeachingDepartmentName_EN = request.body.doctoryTeachingDepartmentName_EN;
                DoctoryTeachingDepartment_Control.newDoctoryTeachingDepartment(doctoryTeachingDepartment, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCodeAndData(ReturnCode.success, "New DoctoryTeachingDepartment was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editDoctoryTeachingDepartment/', function (request, response) {
    var methodCode = "32";

    var requiredData = [];
    requiredData.push(request.body.doctoryTeachingDepartmentId);
    requiredData.push(request.body.doctoryTeachingDepartmentName_TH);
    requiredData.push(request.body.doctoryTeachingDepartmentName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.doctoryTeachingDepartmentId);
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
                DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryTeachingDepartmentId), this);
            }, function (code, err, result) {
                if (code != "332") {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    var doctoryTeachingDepartment = new DoctoryTeachingDepartment();
                    doctoryTeachingDepartment.doctoryTeachingDepartmentName_TH = request.body.doctoryTeachingDepartmentName_TH;
                    doctoryTeachingDepartment.doctoryTeachingDepartmentName_EN = request.body.doctoryTeachingDepartmentName_EN;
                    DoctoryTeachingDepartment_Control.updateDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryTeachingDepartmentId), doctoryTeachingDepartment, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "DoctoryTeachingDepartment with _id: " + request.body.doctoryTeachingDepartmentId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllDoctoryTeachingDepartment/', function (request, response) {
    var methodCode = "33";

    flow.exec(
        function () {
            DoctoryTeachingDepartment_Control.getAllDoctoryTeachingDepartment(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_control.responseWithCodeAndData("999999", "get All DoctoryTeachingDepartment Completed", functionCallback, response)
            }
        }
    );

});

router.post('/getDoctoryTeachingDepartmentfromID/', function (request, response) {
    var methodCode = "34";

    var requiredData = [];
    requiredData.push(request.body.doctoryTeachingDepartmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.doctoryTeachingDepartmentId);
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
                DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryTeachingDepartmentId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCodeAndData("999999", "get DoctoryTeachingDepartment with _id " + request.body.doctoryTeachingDepartmentId + " Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/deleteDoctoryTeachingDepartment/', function (request, response) {
    var methodCode = "35";

    var requiredData = [];
    requiredData.push(request.body.doctoryTeachingDepartmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.doctoryTeachingDepartmentId);
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
                DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryTeachingDepartmentId), this);
            }, function (code, err, result) {
                if (code != "332") {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    DoctoryTeachingDepartment_Control.deleteDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryTeachingDepartmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "DoctoryTeachingDepartment_Control with _id: " + request.body.doctoryTeachingDepartmentId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------