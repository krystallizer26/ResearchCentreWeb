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
let DoctoryTeachingDepartment = require('../model/doctoryTeachingDepartment_model.js');

//Controller
let DoctoryTeachingDepartment_Control = require("../controller/doctoryTeachingDepartment_control.js");

router.post('/newDoctoryTeachingDepartment', function (request, response) {
    let methodCode = "31";

    let requiredData = [];
    requiredData.push(request.body.doctoryTeachingDepartmentName_TH);
    requiredData.push(request.body.doctoryTeachingDepartmentName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                let doctoryTeachingDepartment = new DoctoryTeachingDepartment();
                doctoryTeachingDepartment.doctoryTeachingDepartmentName_TH = request.body.doctoryTeachingDepartmentName_TH;
                doctoryTeachingDepartment.doctoryTeachingDepartmentName_EN = request.body.doctoryTeachingDepartmentName_EN;
                DoctoryTeachingDepartment_Control.newDoctoryTeachingDepartment(doctoryTeachingDepartment, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New DoctoryTeachingDepartment was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editDoctoryTeachingDepartment/', function (request, response) {
    let methodCode = "32";

    let requiredData = [];
    requiredData.push(request.body.doctoryTeachingDepartmentId);
    requiredData.push(request.body.doctoryTeachingDepartmentName_TH);
    requiredData.push(request.body.doctoryTeachingDepartmentName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.doctoryTeachingDepartmentId);
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
                DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryTeachingDepartmentId), this);
            }, function (code, err, result) {
                if (code != "332") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    let doctoryTeachingDepartment = new DoctoryTeachingDepartment();
                    doctoryTeachingDepartment.doctoryTeachingDepartmentName_TH = request.body.doctoryTeachingDepartmentName_TH;
                    doctoryTeachingDepartment.doctoryTeachingDepartmentName_EN = request.body.doctoryTeachingDepartmentName_EN;
                    DoctoryTeachingDepartment_Control.updateDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryTeachingDepartmentId), doctoryTeachingDepartment, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "DoctoryTeachingDepartment with _id: " + request.body.doctoryTeachingDepartmentId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllDoctoryTeachingDepartment/', function (request, response) {
    let methodCode = "33";

    flow.exec(
        function () {
            DoctoryTeachingDepartment_Control.getAllDoctoryTeachingDepartment(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData("999999", "get All DoctoryTeachingDepartment Completed", functionCallback, response)
            }
        }
    );

});

router.post('/getDoctoryTeachingDepartmentfromID/', function (request, response) {
    let methodCode = "34";

    let requiredData = [];
    requiredData.push(request.body.doctoryTeachingDepartmentId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.doctoryTeachingDepartmentId);
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
                DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryTeachingDepartmentId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData("999999", "get DoctoryTeachingDepartment with _id " + request.body.doctoryTeachingDepartmentId + " Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/deleteDoctoryTeachingDepartment/', function (request, response) {
    let methodCode = "35";

    let requiredData = [];
    requiredData.push(request.body.doctoryTeachingDepartmentId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.doctoryTeachingDepartmentId);
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
                DoctoryTeachingDepartment_Control.checkDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryTeachingDepartmentId), this);
            }, function (code, err, result) {
                if (code != "332") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    DoctoryTeachingDepartment_Control.deleteDoctoryTeachingDepartmentByID(new ObjectId(request.body.doctoryTeachingDepartmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "DoctoryTeachingDepartment_Control with _id: " + request.body.doctoryTeachingDepartmentId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------