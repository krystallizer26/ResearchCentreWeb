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
let BachelorTeachingDepartment = require('../model/bachelorTeachingDepartment_model.js');

//Controller
let BachelorTeachingDepartment_Control = require("../controller/bachelorTeachingDepartment_control.js");

router.post('/newBachelorTeachingDepartment', function (request, response) {
    let methodCode = "21";

    let requiredData = [];
    requiredData.push(request.body.bachelorTeachingDepartmentName_TH);
    requiredData.push(request.body.bachelorTeachingDepartmentName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                let bachelorTeachingDepartment = new BachelorTeachingDepartment();
                bachelorTeachingDepartment.bachelorTeachingDepartmentName_TH = request.body.bachelorTeachingDepartmentName_TH;
                bachelorTeachingDepartment.bachelorTeachingDepartmentName_EN = request.body.bachelorTeachingDepartmentName_EN;
                BachelorTeachingDepartment_Control.newBachelorTeachingDepartment(bachelorTeachingDepartment, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New BachelorTeachingDepartmentTeachingDepartment was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editBachelorTeachingDepartment/', function (request, response) {
    let methodCode = "22";

    let requiredData = [];
    requiredData.push(request.body.bachelorTeachingDepartmentId);
    requiredData.push(request.body.bachelorTeachingDepartmentName_TH);
    requiredData.push(request.body.bachelorTeachingDepartmentName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.bachelorTeachingDepartmentId);
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
                BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorTeachingDepartmentId), this);
            }, function (code, err, result) {
                if (code != "232") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    let bachelorTeachingDepartment = new BachelorTeachingDepartment();
                    bachelorTeachingDepartment.bachelorTeachingDepartmentName_TH = request.body.bachelorTeachingDepartmentName_TH;
                    bachelorTeachingDepartment.bachelorTeachingDepartmentName_EN = request.body.bachelorTeachingDepartmentName_EN;
                    BachelorTeachingDepartment_Control.updateBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorTeachingDepartmentId), bachelorTeachingDepartment, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "BachelorTeachingDepartment with _id: " + request.body.bachelorTeachingDepartmentId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllBachelorTeachingDepartment/', function (request, response) {
    let methodCode = "23";

    flow.exec(
        function () {
            BachelorTeachingDepartment_Control.getAllBachelorTeachingDepartment(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData("999999", "get All BachelorTeachingDepartment Completed", functionCallback, response)
            }
        }
    );

});

router.post('/getBachelorTeachingDepartmentfromID/', function (request, response) {
    let methodCode = "24";

    let requiredData = [];
    requiredData.push(request.body.bachelorTeachingDepartmentId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.bachelorTeachingDepartmentId);
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
                BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorTeachingDepartmentId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData("999999", "get BachelorTeachingDepartment with _id " + request.body.bachelorTeachingDepartmentId + " Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/deleteBachelorTeachingDepartment/', function (request, response) {
    let methodCode = "25";

    let requiredData = [];
    requiredData.push(request.body.bachelorTeachingDepartmentId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.bachelorTeachingDepartmentId);
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
                BachelorTeachingDepartment_Control.checkBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorTeachingDepartmentId), this);
            }, function (code, err, result) {
                if (code != "232") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    BachelorTeachingDepartment_Control.deleteBachelorTeachingDepartmentByID(new ObjectId(request.body.bachelorTeachingDepartmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "BachelorTeachingDepartment_Control with _id: " + request.body.bachelorTeachingDepartmentId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------