var Researcher = require('../model/researcher_model.js');

module.exports = {
    newResearcher: function (researcher, callback) {
        console.log("Saving Researcher: " + researcher.researcherName_TH);
        researcher.save(function (error, saveResponse) {
            console.log("Saving Researcher >> COMPLETED ");
            if (error) {
                let errCode = "361";
                var alert = "Saving Researcher fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("362", null, saveResponse)
            }
        });
    },
    updateResearcherByID: function (researcherId, newvalues, callback) {
        var myquery = { "_id": researcherId };
        console.log("In Method: " + JSON.stringify(newvalues))
        Researcher.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "371";
                var alert = "Error in updating Researcher with _id: " + researcherId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("372", null, updateResponse);
        });
    },
    checkResearcherByID: function (researcherId, query, callback) {
        Researcher.findOne({ "_id": researcherId }, query, function (error, functionCallback) {
            if (error) {
                let errCode = "381";
                var alert = "Error in finding Researcher with _id: " + researcherId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("382", null, functionCallback)
            }
            else {
                let errCode = "383";
                var alert = "Researcher with _id: " + researcherId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    checkBindedKeywordwithResearcher: function (researcherId, keywordId, callback) {
        Researcher.findOne({ $and: [{ "_id": researcherId }, { "keywordIdArray": keywordId }] }, function (error, findCallback) {
            if (error) {
                var alert = "Error in finding Researcher with _id: " + researcherId + "with bankaccoount Id: " + keywordId + "\nError: " + error.message;
                callback("391", alert, null)
            }
            else if (findCallback) {
                var alert = "Keyword with _id: " + keywordId + " is already binded to this Researcher";
                callback("392", alert, null)
            }
            else {
                var alert = "Keyword with _id: " + keywordId + " is not binded to this Researcher";
                callback("393", alert, null)
            }
        });
    },
    bindKeywordtoResearcher: function (researcherId, keywordId, callback) {
        Researcher.update({ "_id": researcherId }, { $push: { "keywordIdArray": keywordId } }, function (error, findCallback) {
            if (error) {
                var alert = "Error in updating Researcher with _id: " + researcherId + "with Keyword Id: " + keywordId + "\nError: " + error.message;
                callback("401", alert, null)
            }
            else {
                callback("402", alert, null)
            }
        });
    },
    removeKeywordfromResearcher: function (researcherId, keywordId, callback) {
        Researcher.update({ "_id": researcherId }, { $pull: { "keywordIdArray": keywordId } }, function (error, findCallback) {
            if (error) {
                var alert = "Error in updating Researcher with _id: " + researcherId + "with Keyword Id: " + keywordId + "\nError: " + error.message;
                callback("411", alert, null)
            }
            else {
                callback("412", alert, null)
            }
        });
    }
};