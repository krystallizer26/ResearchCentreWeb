var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Thesis_Schema = new Schema({
    researcherId: { type: String, default: null },
    studentName: { type: String, default: null },
    studentCode: { type: String, default: null },
    studentTel: { type: String, default: null },
    masterDepartmentId: { type: String, default: null },
    doctoryDepartmentId: { type: String, default: null },
    thesisName_TH: { type: String, default: null },
    thesisName_EN: { type: String, default: null },
    coProfessor1: { type: String, default: null },
    coProfessor2: { type: String, default: null },
    chiefCommitee: { type: String, default: null },
    commitee1: { type: String, default: null },
    commitee2: { type: String, default: null },
    commitee3: { type: String, default: null },
    professorAssignDate: { type: String, default: null },
    thesisNameAssignDate: { type: String, default: null },
    thesisNameAnnounceDate: { type: String, default: null },
    qualifyTestDate: { type: String, default: null },
    outlineTestDate: { type: String, default: null },
    thesisTestDate: { type: String, default: null },
    gradutionDate: { type: String, default: null },
    gradutionProduct: { type: [String], default: null },
});

module.exports = mongoose.model('Thesis', Thesis_Schema);

// {
// "_id": "_id","topicShort" : "topicShort","topicFull" : "topicFull","detailShort" : "detailShort","detailFull" : "detailFull","topicPicture" : "topicPicture"
// ,"datetimePost" : "datetimePost","datetimeEdit" : "datetimeEdit","author" : "author","readCount" : "readCount","isPinned" : "isPinned"
// ,"resourceId" : "resourceId","departmentId" : "departmentId","tagId" : "tagId"
// }