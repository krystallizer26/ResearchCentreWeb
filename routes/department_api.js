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
var Return_Control = require('../controller/return_control.js');

//Model
var Department = require('../model/department_model.js');

//Controller
var Department_Control = require("../controller/department_control.js");

router.post('/newDepartment', function (request, response) {
    var methodCode = "01";

    var requiredData = [];
    requiredData.push(request.body.departmentName_TH);
    requiredData.push(request.body.departmentName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                var department = new Department();
                department.departmentName_TH = request.body.departmentName_TH;
                department.departmentName_EN = request.body.departmentName_EN;
                Department_Control.newDepartment(department, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New Department was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editDepartment/', function (request, response) {
    var methodCode = "02";

    var requiredData = [];
    requiredData.push(request.body.departmentId);
    requiredData.push(request.body.departmentName_TH);
    requiredData.push(request.body.departmentName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.departmentId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Department_Control.checkDepartmentByID(new ObjectId(request.body.departmentId), this);
            }, function (code, err, result) {
                if (code != "032") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    var department = new Department();
                    department.departmentName_TH = request.body.departmentName_TH;
                    department.departmentName_EN = request.body.departmentName_EN;
                    Department_Control.updateDepartmentByID(new ObjectId(request.body.departmentId), department, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Department with _id: " + request.body.departmentId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllDepartment/', function (request, response) {
    var methodCode = "03";

    flow.exec(
        function () {
            Department_Control.getAllDepartment(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData("999999", "get All Department Completed", functionCallback, response)
            }
        }
    );

});

router.post('/getDepartmentfromID/', function (request, response) {
    var methodCode = "04";

    var requiredData = [];
    requiredData.push(request.body.departmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.departmentId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Department_Control.checkDepartmentByID(new ObjectId(request.body.departmentId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData("999999", "get Department with _id " + request.body.departmentId + " Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/deleteDepartment/', function (request, response) {
    var methodCode = "05";

    var requiredData = [];
    requiredData.push(request.body.departmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.departmentId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Department_Control.checkDepartmentByID(new ObjectId(request.body.departmentId), this);
            }, function (code, err, result) {
                if (code != "032") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Department_Control.deleteDepartmentByID(new ObjectId(request.body.departmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Department_Control with _id: " + request.body.departmentId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------