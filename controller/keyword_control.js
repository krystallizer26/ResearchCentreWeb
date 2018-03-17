var Keyword = require('../model/keyword_model.js');

module.exports = {
    newKeyword: function (keyword, callback) {
        console.log("Saving Keyword: " + keyword.keywordName_TH);
        keyword.save(function (error, saveResponse) {
            console.log("Saving Keyword >> COMPLETED ");
            if (error) {
                let errCode = "111";
                var alert = "Saving Keyword fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("112", null, saveResponse)
            }
        });
    },
    updateKeywordByID: function (keywordId, keyword, callback) {
        var myquery = { "_id": keywordId };
        var newvalues = { $set: { "keywordName_TH": keyword.keywordName_TH, "keywordName_EN": keyword.keywordName_EN, "editedDate": Date.now() } };
        Keyword.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "121";
                var alert = "Error in updating Keyword with _id: " + keywordId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("122", null, updateResponse);
        });
    },
    checkKeywordByID: function (keywordId, callback) {
        Keyword.findOne({ "_id": keywordId }, function (error, functionCallback) {
            if (error) {
                let errCode = "131";
                var alert = "Error in finding Keyword with _id: " + keywordId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("132", null, functionCallback)
            }
            else {
                let errCode = "133";
                var alert = "Keyword with _id: " + keywordId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    getAllKeyword: function (callback) {
        Keyword.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "141";
                var alert = "Error in getAllKeyword , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "142";
                var alert = "Get All Keyword Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "143";
                var alert = "No Keyword Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    deleteKeywordByID: function (keywordId, callback) {
        Keyword.remove({ "_id": keywordId }, function (error, newsCallback) {
            if (error) {
                let errCode = "151";
                var alert = "Error in deleting Keyword with _id " + keywordId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("152", null, newsCallback)
            }
        });
    }
};