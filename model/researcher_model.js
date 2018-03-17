var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Researcher_Schema = new Schema({
    researcherName_TH: { type: String, required: true, unique: true },
    researcherName_EN: { type: String, required: true, unique: true },
    personalID: { type: String, required: true, unique: true },
    departmentId: { type: String, default: null },
    positionId: { type: String, default: null },
    academicLevelId: { type: String, default: null },
    bachelorGraduation: { type: String, default: null },
    masterGraduation: { type: String, default: null },
    doctoralGraduation: { type: String, default: null },
    target: { type: String, default: null },
    keywordIdArray: { type: [String], default: null },
    assignDate: { type: Date, default: null },
    birthDate: { type: Date, default: null },
    retirementStatus: { type: Boolean, default: null },

    Bachelor_DepartmentId: { type: String, default: null },
    Bachelor_AcademicYear: { type: Number, default: null },
    Bachelor_FacultyBoard_Comment: { type: String, default: null },
    Bachelor_FacultyBoard_Time: { type: Number, default: null },
    Bachelor_CouncilBoard_Comment: { type: String, default: null },
    Bachelor_CouncilBoard_Time: { type: Number, default: null },
    Bachelor_InstituteBoard_Comment: { type: String, default: null },
    Bachelor_InstituteBoard_Time: { type: Number, default: null },
    
    Master_DepartmentId: { type: String, default: null },
    Master_AcademicYear: { type: Number, default: null },
    Master_FacultyBoard_Comment: { type: String, default: null },
    Master_FacultyBoard_Time: { type: Number, default: null },
    Master_CouncilBoard_Comment: { type: String, default: null },
    Master_CouncilBoard_Time: { type: Number, default: null },
    Master_InstituteBoard_Comment: { type: String, default: null },
    Master_InstituteBoard_Time: { type: Number, default: null },
    
    Doctory_DepartmentId: { type: String, default: null },
    Doctory_AcademicYear: { type: Number, default: null },
    Doctory_FacultyBoard_Comment: { type: String, default: null },
    Doctory_FacultyBoard_Time: { type: Number, default: null },
    Doctory_CouncilBoard_Comment: { type: String, default: null },
    Doctory_CouncilBoard_Time: { type: Number, default: null },
    Doctory_InstituteBoard_Comment: { type: String, default: null },
    Doctory_InstituteBoard_Time: { type: Number, default: null },

    scopusBefore2560: { type: String, default: null },
    citationBefore2560: { type: Number, default: null },
    hIndex: { type: String, default: null },

    CitationTotal: { type: Number, default: null },
    CitationAfter2560: { type: Number, default: null },
    CitationLifeTime: { type: Number, default: null },
    CitationTCI: { type: Number, default: null },

    PublicationTotal: { type: Number, default: null },
    Publication2560: { type: Number, default: null },
    PublicationLifeTime: { type: Number, default: null },
    PublicationTCI: { type: Number, default: null },

    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Researcher', Researcher_Schema);

// {
// "_id": "_id","topicShort" : "topicShort","topicFull" : "topicFull","detailShort" : "detailShort","detailFull" : "detailFull","topicPicture" : "topicPicture"
// ,"datetimePost" : "datetimePost","datetimeEdit" : "datetimeEdit","author" : "author","readCount" : "readCount","isPinned" : "isPinned"
// ,"resourceId" : "resourceId","departmentId" : "departmentId","tagId" : "tagId"
// }