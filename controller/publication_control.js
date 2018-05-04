var Publication = require('../model/publication_model.js');

module.exports = {
    newPublication: function (publication, callback) {
        console.log("Saving Publication: " + publication.publicationName_TH);
        publication.save(function (error, saveResponse) {
            console.log("Saving Publication >> COMPLETED ");
            if (error) {
                let errCode = "441";
                var alert = "Saving Publication fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("442", null, saveResponse)
            }
        });
    },
    updatePublicationByID: function (publicationId, publication, callback) {
        var myquery = { "_id": publicationId };
        var newvalues = {
            $set: {
                "researcherId": publication.researcherId,
                "publicationName": publication.publicationName,
                "publishLocation": publication.publishLocation,
                "publishYear": publication.publishYear,
                "publishType": publication.publishType,
                "scholarType": publication.scholarType,
                "address": publication.address,
                "publicationDatabase": publication.publicationDatabase,
                "impactFactor": publication.impactFactor,
                "quartile": publication.quartile,
                "weight": publication.weight,
                "detail": publication.detail,
                "studentName": publication.studentName,
                "bachelorDepartment": publication.bachelorDepartment,
                "masterDepartment": publication.masterDepartment,
                "doctoryDepartment": publication.doctoryDepartment,
                "editedDate": Date.now()
            }
        };
        Publication.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "451";
                var alert = "Error in updating Publication with _id: " + publicationId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("452", null, updateResponse);
        });
    },
    checkPublicationByID: function (publicationId, callback) {
        Publication.findOne({ "_id": publicationId }, function (error, functionCallback) {
            if (error) {
                let errCode = "461";
                var alert = "Error in finding Publication with _id: " + publicationId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("462", null, functionCallback)
            }
            else {
                let errCode = "463";
                var alert = "Publication with _id: " + publicationId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    getAllPublication: function (callback) {
        Publication.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "471";
                var alert = "Error in getAllPublication , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "472";
                var alert = "Get All Publication Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "473";
                var alert = "No Publication Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    deletePublicationByID: function (publicationId, callback) {
        Publication.remove({ "_id": publicationId }, function (error, newsCallback) {
            if (error) {
                let errCode = "481";
                var alert = "Error in deleting Publication with _id " + publicationId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("482", null, newsCallback)
            }
        });
    }
};