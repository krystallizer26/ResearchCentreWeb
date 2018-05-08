var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Researcher_Schema = new Schema({
    researcherName_TH: { type: String, required: true, unique: true },
    researcherName_EN: { type: String, required: true, unique: true },
    gender: { type: String, default: null }, 
    personalID: { type: String, required: true },
    departmentId: { type: String, default: null },
    positionId: { type: String, default: null },
    academicLevelId: { type: String, default: null },
    bachelorGraduation: { type: String, default: null },
    masterGraduation: { type: String, default: null },
    doctoralGraduation: { type: String, default: null },
    target: { type: String, default: null },
    assignDate: { type: String, default: null }, // Need to be date
    birthDate: { type: String, default: null }, // Need to be date
    retirementStatus: { type: String, default: null }, // Need to be boolean
    researcherPic: { type: String, default: null },
    
    keyword1_TH: { type: String, default: null },
    keyword2_TH: { type: String, default: null },
    keyword3_TH: { type: String, default: null },
    keyword4_TH: { type: String, default: null },
    keyword5_TH: { type: String, default: null },
    keyword1_EN: { type: String, default: null },
    keyword2_EN: { type: String, default: null },
    keyword3_EN: { type: String, default: null },
    keyword4_EN: { type: String, default: null },
    keyword5_EN: { type: String, default: null },

    bachelorTeachingDepartmentId: { type: String, default: null },
    bachelor_AcademicYear: { type: Number, default: null },
    bachelor_FacultyBoard_Comment: { type: String, default: null },
    bachelor_CouncilBoard_Comment: { type: String, default: null },
    bachelor_InstituteBoard_Comment: { type: String, default: null },
    
    masterTeachingDepartmentId: { type: String, default: null },
    master_AcademicYear: { type: Number, default: null },
    master_FacultyBoard_Comment: { type: String, default: null },
    master_CouncilBoard_Comment: { type: String, default: null },
    master_InstituteBoard_Comment: { type: String, default: null },
    
    doctoryTeachingDepartmentId: { type: String, default: null },
    doctory_AcademicYear: { type: Number, default: null },
    doctory_FacultyBoard_Comment: { type: String, default: null },
    doctory_CouncilBoard_Comment: { type: String, default: null },
    doctory_InstituteBoard_Comment: { type: String, default: null },

    scopusBefore2560: { type: Number, default: 0 },
    citationBefore2560: { type: Number, default: 0 },
    hIndex: { type: String, default: null },

    citationTotal: { type: Number, default: 0 },
    citationAfter2560: { type: Number, default: 0 },
    citationLifeTime: { type: Number, default: 0 },
    citationTCI: { type: Number, default: 0 },

    publicationTotal: { type: Number, default: 0 },
    publication2560: { type: Number, default: 0 },
    publicationLifeTime: { type: Number, default: 0 },
    publicationTCI: { type: Number, default: 0 },

    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Researcher', Researcher_Schema);

// {
// "_id": "_id","topicShort" : "topicShort","topicFull" : "topicFull","detailShort" : "detailShort","detailFull" : "detailFull","topicPicture" : "topicPicture"
// ,"datetimePost" : "datetimePost","datetimeEdit" : "datetimeEdit","author" : "author","readCount" : "readCount","isPinned" : "isPinned"
// ,"resourceId" : "resourceId","departmentId" : "departmentId","tagId" : "tagId"
// }