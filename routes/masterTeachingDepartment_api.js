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
let MasterTeachingDepartment = require('../model/masterTeachingDepartment_model.js');

//Controller
let MasterTeachingDepartment_Control = require("../controller/masterTeachingDepartment_control.js");

router.post('/newMasterTeachingDepartment', function (request, response) {
    let methodCode = "26";

    let requiredData = [];
    requiredData.push(request.body.masterTeachingDepartmentName_TH);
    requiredData.push(request.body.masterTeachingDepartmentName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                let masterTeachingDepartment = new MasterTeachingDepartment();
                masterTeachingDepartment.masterTeachingDepartmentName_TH = request.body.masterTeachingDepartmentName_TH;
                masterTeachingDepartment.masterTeachingDepartmentName_EN = request.body.masterTeachingDepartmentName_EN;
                MasterTeachingDepartment_Control.newMasterTeachingDepartment(masterTeachingDepartment, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New MasterTeachingDepartment was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editMasterTeachingDepartment/', function (request, response) {
    let methodCode = "27";

    let requiredData = [];
    requiredData.push(request.body.masterTeachingDepartmentId);
    requiredData.push(request.body.masterTeachingDepartmentName_TH);
    requiredData.push(request.body.masterTeachingDepartmentName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.masterTeachingDepartmentId);
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
                MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(request.body.masterTeachingDepartmentId), this);
            }, function (code, err, result) {
                if (code != "282") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    let masterTeachingDepartment = new MasterTeachingDepartment();
                    masterTeachingDepartment.masterTeachingDepartmentName_TH = request.body.masterTeachingDepartmentName_TH;
                    masterTeachingDepartment.masterTeachingDepartmentName_EN = request.body.masterTeachingDepartmentName_EN;
                    MasterTeachingDepartment_Control.updateMasterTeachingDepartmentByID(new ObjectId(request.body.masterTeachingDepartmentId), masterTeachingDepartment, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "MasterTeachingDepartment with _id: " + request.body.masterTeachingDepartmentId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllMasterTeachingDepartment/', function (request, response) {
    let methodCode = "28";

    flow.exec(
        function () {
            MasterTeachingDepartment_Control.getAllMasterTeachingDepartment(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData("999999", "get All MasterTeachingDepartment Completed", functionCallback, response)
            }
        }
    );

});

router.post('/getMasterTeachingDepartmentfromID/', function (request, response) {
    let methodCode = "29";

    let requiredData = [];
    requiredData.push(request.body.masterTeachingDepartmentId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.masterTeachingDepartmentId);
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
                MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(request.body.masterTeachingDepartmentId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData("999999", "get MasterTeachingDepartment with _id " + request.body.masterTeachingDepartmentId + " Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/deleteMasterTeachingDepartment/', function (request, response) {
    let methodCode = "30";

    let requiredData = [];
    requiredData.push(request.body.masterTeachingDepartmentId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.masterTeachingDepartmentId);
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
                MasterTeachingDepartment_Control.checkMasterTeachingDepartmentByID(new ObjectId(request.body.masterTeachingDepartmentId), this);
            }, function (code, err, result) {
                if (code != "282") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    MasterTeachingDepartment_Control.deleteMasterTeachingDepartmentByID(new ObjectId(request.body.masterTeachingDepartmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "MasterTeachingDepartment_Control with _id: " + request.body.masterTeachingDepartmentId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------