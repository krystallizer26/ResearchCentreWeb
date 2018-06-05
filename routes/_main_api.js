var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise-native');

router.post('/newPublication_EachScrap', function (request, response) {
    var methodCode = "45";

    var requiredData = [];
    requiredData.push(request.body.publicationName);
    requiredData.push(request.body.researcherPersonalID);
    requiredData.push(request.body.researcherName);
    var requiredReady = Validate.requiredData_Check(requiredData);

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                var publication = new Publication();
                publication.researcherName = Validate.scrappingCleanUp(request.body.researcherName)
                publication.researcherPersonalID = Validate.scrappingCleanUp(request.body.researcherPersonalID)
                publication.publicationName = Validate.scrappingCleanUp(request.body.publicationName)
                publication.publicationAuthor = Validate.scrappingCleanUp(request.body.publicationAuthor)
                publication.publishLocation = Validate.scrappingCleanUp(request.body.publishLocation)
                publication.publishYear = Validate.scrappingCleanUp(request.body.publishYear)
                publication.publishType_raw = Validate.scrappingCleanUp(request.body.publishType_raw)
                publication.publishType = "Others"
                if (publication.publishType_raw == "วารสารฯ ระดับนานาชาติ")
                    publication.publishType = "InternationalJournal"
                if (publication.publishType_raw == "การประชุมฯ ระดับนานาชาติ")
                    publication.publishType = "InternationalConference"
                if (publication.publishType_raw == "วารสารฯ ระดับชาติ")
                    publication.publishType = "NationalJournal"
                publication.scholarType = Validate.scrappingCleanUp(request.body.scholarType)
                publication.address = Validate.scrappingCleanUp(request.body.address)
                publication.publicationDatabase = Validate.scrappingCleanUp(request.body.publicationDatabase)
                publication.impactFactor = Validate.scrappingCleanUp(request.body.impactFactor)
                publication.quartile = Validate.scrappingCleanUp(request.body.quartile)
                publication.weight = Validate.scrappingCleanUp(request.body.weight)
                publication.detail = Validate.scrappingCleanUp(request.body.detail)

                publication.studentName = Validate.scrappingCleanUp(request.body.studentName)
                publication.bachelorTeachingDepartmentName_TH = Validate.scrappingCleanUp(request.body.bachelorTeachingDepartmentName_TH)
                publication.masterTeachingDepartmentName_TH = Validate.scrappingCleanUp(request.body.masterTeachingDepartmentName_TH)
                publication.doctoryTeachingDepartmentName_TH = Validate.scrappingCleanUp(request.body.doctoryTeachingDepartmentName_TH)
                publication.graduationYear = Validate.scrappingCleanUp(request.body.graduationYear)
                publication.publicationRaw = Validate.scrappingCleanUp(request.body.doi)

                Publication_Control.newPublication_fromScrap(publication, this);

            }, function (code, err, functionCallback) {
                if (err) {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New Publication was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

module.exports = router;