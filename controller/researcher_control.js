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
    getResearcherTeachingByID: function (researcherId,query, callback) {
        Researcher.findOne({ "_id": researcherId },query, function (error, functionCallback) {
            if (error) {
                let errCode = "371";
                var alert = "Error in finding Researcher with _id: " + researcherId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("372", null, functionCallback)
            }
            else {
                let errCode = "373";
                var alert = "Researcher with _id: " + researcherId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    }
};