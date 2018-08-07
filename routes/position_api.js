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
let Position = require('../model/position_model.js');

//Controller
let Position_Control = require("../controller/position_control.js");

router.post('/newPosition', function (request, response) {
    let methodCode = "06";

    let requiredData = [];
    requiredData.push(request.body.positionName_TH);
    requiredData.push(request.body.positionName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        let alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                let position = new Position();
                position.positionName_TH = request.body.positionName_TH;
                position.positionName_EN = request.body.positionName_EN;
                Position_Control.newPosition(position, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New Position was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editPosition/', function (request, response) {
    let methodCode = "07";

    let requiredData = [];
    requiredData.push(request.body.positionId);
    requiredData.push(request.body.positionName_TH);
    requiredData.push(request.body.positionName_EN);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.positionId);
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
                Position_Control.checkPositionByID(new ObjectId(request.body.positionId), this);
            }, function (code, err, result) {
                if (code != "082") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    let position = new Position();
                    position.positionName_TH = request.body.positionName_TH;
                    position.positionName_EN = request.body.positionName_EN;
                    Position_Control.updatePositionByID(new ObjectId(request.body.positionId), position, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Position with _id: " + request.body.positionId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllPosition/', function (request, response) {
    let methodCode = "08";

    flow.exec(
        function () {
            Position_Control.getAllPosition(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_Control.responseWithCodeAndData("999999", "get All Position Completed", functionCallback, response)
            }
        }
    );
});

router.post('/getPositionfromID/', function (request, response) {
    let methodCode = "09";

    let requiredData = [];
    requiredData.push(request.body.positionId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.positionId);
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
                Position_Control.checkPositionByID(new ObjectId(request.body.positionId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData("999999", "get Position with _id " + request.body.positionId + " Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/deletePosition/', function (request, response) {
    let methodCode = "10";

    let requiredData = [];
    requiredData.push(request.body.positionId);
    let requiredReady = Validate.requiredData_Check(requiredData)

    let objectIdData = [];
    objectIdData.push(request.body.positionId);
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
                Position_Control.checkPositionByID(new ObjectId(request.body.positionId), this);
            }, function (code, err, result) {
                if (code != "082") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Position_Control.deletePositionByID(new ObjectId(request.body.positionId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Position_Control with _id: " + request.body.positionId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------