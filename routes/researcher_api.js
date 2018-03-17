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

router.post('/newResearcher', function (request, response) {
    var methodCode = "21";

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

module.exports = router;

//-----------------------------------------------------------------------------