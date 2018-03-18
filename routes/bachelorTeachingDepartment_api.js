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
var BachelorTeachingDepartment = require('../model/bachelorTeachingDepartment_model.js');

//Controller
var BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");

router.post('/newBachelorTeachingDepartment', function (request, response) {
    var methodCode = "21";

    var requiredData = [];
    requiredData.push(request.body.bachelorTeachingDepartmentName_TH);
    requiredData.push(request.body.bachelorTeachingDepartmentName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                var bachelorTeachingDepartment = new BachelorTeachingDepartment();
                bachelorTeachingDepartment.bachelorTeachingDepartmentName_TH = request.body.bachelorTeachingDepartmentName_TH;
                bachelorTeachingDepartment.bachelorTeachingDepartmentName_EN = request.body.bachelorTeachingDepartmentName_EN;
                BachelorTeachingDepartment_Control.newBachelorTeachingDepartment(bachelorTeachingDepartment, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCodeAndData(ReturnCode.success, "New BachelorTeachingDepartmentTeachingDepartment was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editBachelorTeachingDepartment/', function (request, response) {
    var methodCode = "22";

    var requiredData = [];
    requiredData.push(request.body.bachelorTeachingDepartmentId);
    requiredData.push(request.body.bachelorTeachingDepartmentName_TH);
    requiredData.push(request.body.bachelorTeachingDepartmentName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.bachelorTeachingDepartmentId);
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
                BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorTeachingDepartmentId), this);
            }, function (code, err, result) {
                if (code != "232") {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    var bachelorTeachingDepartment = new BachelorTeachingDepartment();
                    bachelorTeachingDepartment.bachelorTeachingDepartmentName_TH = request.body.bachelorTeachingDepartmentName_TH;
                    bachelorTeachingDepartment.bachelorTeachingDepartmentName_EN = request.body.bachelorTeachingDepartmentName_EN;
                    BachelorTeachingDepartment_Control.updateBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorTeachingDepartmentId), bachelorTeachingDepartment, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "BachelorTeachingDepartment with _id: " + request.body.bachelorTeachingDepartmentId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllBachelorTeachingDepartment/', function (request, response) {
    var methodCode = "23";

    flow.exec(
        function () {
            BachelorTeachingDepartment_Control.getAllBachelorTeachingDepartment(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_control.responseWithCodeAndData("999999", "get All BachelorTeachingDepartment Completed", functionCallback, response)
            }
        }
    );

});

router.post('/getBachelorTeachingDepartmentfromID/', function (request, response) {
    var methodCode = "24";

    var requiredData = [];
    requiredData.push(request.body.bachelorTeachingDepartmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.bachelorTeachingDepartmentId);
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
                BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorTeachingDepartmentId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCodeAndData("999999", "get BachelorTeachingDepartment with _id " + request.body.bachelorTeachingDepartmentId + " Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/deleteBachelorTeachingDepartment/', function (request, response) {
    var methodCode = "25";

    var requiredData = [];
    requiredData.push(request.body.bachelorTeachingDepartmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.bachelorTeachingDepartmentId);
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
                BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorTeachingDepartmentId), this);
            }, function (code, err, result) {
                if (code != "232") {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    BachelorTeachingDepartment_Control.deleteBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorTeachingDepartmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "BachelorTeachingDepartment_Control with _id: " + request.body.bachelorTeachingDepartmentId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------