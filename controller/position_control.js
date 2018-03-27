var Position = require('../model/position_model.js');

module.exports = {
    newPosition: function (position, callback) {
        console.log("Saving Position: " + position.positionName_TH);
        position.save(function (error, saveResponse) {
            console.log("Saving Position >> COMPLETED ");
            if (error) {
                let errCode = "061";
                var alert = "Saving Position fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("062", null, saveResponse)
            }
        });
    },
    updatePositionByID: function (positionId, position, callback) {
        var myquery = { "_id": positionId };
        var newvalues = { $set: { "positionName_TH": position.positionName_TH, "positionName_EN": position.positionName_EN, "editedDate": Date.now() } };
        Position.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "071";
                var alert = "Error in updating Position with _id: " + positionId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("072", null, updateResponse);
        });
    },
    checkPositionByID: function (positionId, callback) {
        Position.findOne({ "_id": positionId }, function (error, functionCallback) {
            if (error) {
                let errCode = "081";
                var alert = "Error in finding Position with _id: " + positionId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("082", null, functionCallback)
            }
            else {
                let errCode = "083";
                var alert = "Position with _id: " + positionId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    getAllPosition: function (callback) {
        Position.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "091";
                var alert = "Error in getAllPosition , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "092";
                var alert = "Get All Position Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "093";
                var alert = "No Position Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    deletePositionByID: function (positionId, callback) {
        Position.remove({ "_id": positionId }, function (error, newsCallback) {
            if (error) {
                let errCode = "101";
                var alert = "Error in deleting Position with _id " + positionId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("102", null, newsCallback)
            }
        });
    }
};