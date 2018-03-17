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
var Position = require('../model/position_model.js');

//Controller
var Position_Control = require("../controller/position_control.js");

router.post('/newPosition', function (request, response) {
    var methodCode = "06";

    var requiredData = [];
    requiredData.push(request.body.positionName_TH);
    requiredData.push(request.body.positionName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                var position = new Position();
                position.positionName_TH = request.body.positionName_TH;
                position.positionName_EN = request.body.positionName_EN;
                Position_Control.newPosition(position, this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCodeAndData(ReturnCode.success, "New Position was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editPosition/', function (request, response) {
    var methodCode = "07";

    var requiredData = [];
    requiredData.push(request.body.positionId);
    requiredData.push(request.body.positionName_TH);
    requiredData.push(request.body.positionName_EN);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.positionId);
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
                Position_Control.checkPositionByID(new ObjectId(request.body.positionId), this);
            }, function (code, err, result) {
                if (code != "082") {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    var position = new Position();
                    position.positionName_TH = request.body.positionName_TH;
                    position.positionName_EN = request.body.positionName_EN;
                    Position_Control.updatePositionByID(new ObjectId(request.body.positionId), position, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "Position with _id: " + request.body.positionId + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllPosition/', function (request, response) {
    var methodCode = "08";

    flow.exec(
        function () {
            Position_Control.getAllPosition(this);
        }, function (code, err, functionCallback) {
            if (err) {
                Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_control.responseWithCodeAndData("999999", "get All Position Completed", functionCallback, response)
            }
        }
    );

});

router.post('/getPositionfromID/', function (request, response) {
    var methodCode = "09";

    var requiredData = [];
    requiredData.push(request.body.positionId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.positionId);
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
                Position_Control.checkPositionByID(new ObjectId(request.body.positionId), this);
            }, function (code, err, functionCallback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCodeAndData("999999", "get Position with _id " + request.body.positionId + " Completed", functionCallback, response)
                }
            }
        );
    }
});

router.post('/deletePosition/', function (request, response) {
    var methodCode = "10";

    var requiredData = [];
    requiredData.push(request.body.positionId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.positionId);
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
                Position_Control.checkPositionByID(new ObjectId(request.body.positionId), this);
            }, function (code, err, result) {
                if (code != "082") {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Position_Control.deletePositionByID(new ObjectId(request.body.positionId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "Position_Control with _id: " + request.body.positionId + " has deleted successfully.", response);
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------