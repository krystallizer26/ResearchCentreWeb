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
    retirementStatus: { type: Boolean, default: false },

    bachelorTeachingDepartmentId: { type: String, default: null },
    bachelor_AcademicYear: { type: Number, default: null },
    bachelor_FacultyBoard_Comment: { type: String, default: null },
    bachelor_FacultyBoard_Time: { type: Number, default: null },
    bachelor_CouncilBoard_Comment: { type: String, default: null },
    bachelor_CouncilBoard_Time: { type: Number, default: null },
    bachelor_InstituteBoard_Comment: { type: String, default: null },
    bachelor_InstituteBoard_Time: { type: Number, default: null },
    
    masterTeachingDepartmentId: { type: String, default: null },
    master_AcademicYear: { type: Number, default: null },
    master_FacultyBoard_Comment: { type: String, default: null },
    master_FacultyBoard_Time: { type: Number, default: null },
    master_CouncilBoard_Comment: { type: String, default: null },
    master_CouncilBoard_Time: { type: Number, default: null },
    master_InstituteBoard_Comment: { type: String, default: null },
    master_InstituteBoard_Time: { type: Number, default: null },
    
    doctoryTeachingDepartmentId: { type: String, default: null },
    doctory_AcademicYear: { type: Number, default: null },
    doctory_FacultyBoard_Comment: { type: String, default: null },
    doctory_FacultyBoard_Time: { type: Number, default: null },
    doctory_CouncilBoard_Comment: { type: String, default: null },
    doctory_CouncilBoard_Time: { type: Number, default: null },
    doctory_InstituteBoard_Comment: { type: String, default: null },
    doctory_InstituteBoard_Time: { type: Number, default: null },

    scopusBefore2560: { type: String, default: null },
    citationBefore2560: { type: Number, default: null },
    hIndex: { type: String, default: null },

    citationTotal: { type: Number, default: null },
    citationAfter2560: { type: Number, default: null },
    citationLifeTime: { type: Number, default: null },
    citationTCI: { type: Number, default: null },

    publicationTotal: { type: Number, default: null },
    publication2560: { type: Number, default: null },
    publicationLifeTime: { type: Number, default: null },
    publicationTCI: { type: Number, default: null },

    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Researcher', Researcher_Schema);

// {
// "_id": "_id","topicShort" : "topicShort","topicFull" : "topicFull","detailShort" : "detailShort","detailFull" : "detailFull","topicPicture" : "topicPicture"
// ,"datetimePost" : "datetimePost","datetimeEdit" : "datetimeEdit","author" : "author","readCount" : "readCount","isPinned" : "isPinned"
// ,"resourceId" : "resourceId","departmentId" : "departmentId","tagId" : "tagId"
// }