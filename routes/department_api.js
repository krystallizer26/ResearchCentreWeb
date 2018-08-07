let express = require('express');
let router = express.Router();

// DATABASE SETUP
let ObjectId = require('mongodb').ObjectId;


//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests

//Must use
let flow = require('../services/flow.js')
let ReturnCode = require('../model/returnCode.js');
let Validate = require("../controller/validation_controller.js");
let Return_Control = require('../controller/return_control.js');

//Model
let Department = require('../model/department_model.js');

//Controller
let Department_Control = require("../controller/department_control.js");

router.post('/newDepartment', function (request, response) {
    let methodCode = "01";

    let requiredData = [];
    requiredData.push(request.body.departmentName_TH);
    requiredData.push(request.body.departmentName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                let department = new Department();
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
    let methodCode = "02";

    let requiredData = [];
    requiredData.push(request.body.departmentId);
    requiredData.push(request.body.departmentName_TH);
    requiredData.push(request.body.departmentName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.departmentId);
    let objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        let alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
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
                    let department = new Department();
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
    let methodCode = "03";

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
    let methodCode = "04";

    let requiredData = [];
    requiredData.push(request.body.departmentId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.departmentId);
    let objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        let alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
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
    let methodCode = "05";

    let requiredData = [];
    requiredData.push(request.body.departmentId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.departmentId);
    let objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        let alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
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