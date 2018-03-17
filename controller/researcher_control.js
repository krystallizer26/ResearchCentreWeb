var Researcher = require('../model/researcher_model.js');

module.exports = {
    newResearcher: function (researcher, callback) {
        console.log("Saving Researcher: " + researcher.researcherName_TH);
        researcher.save(function (error, saveResponse) {
            console.log("Saving Keyword >> COMPLETED ");
            if (error) {
                let errCode = "211";
                var alert = "Saving Researcher fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("212", null, saveResponse)
            }
        });
    }
};