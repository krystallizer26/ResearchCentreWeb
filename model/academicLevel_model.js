var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AcademicLevel_Schema = new Schema({
    academicLevelName_TH: { type: String, required: true, unique: true },
    academicLevelName_EN: { type: String, required: true, unique: true },
    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AcademicLevel', AcademicLevel_Schema);

// {
// "_id": "_id","topicShort" : "topicShort","topicFull" : "topicFull","detailShort" : "detailShort","detailFull" : "detailFull","topicPicture" : "topicPicture"
// ,"datetimePost" : "datetimePost","datetimeEdit" : "datetimeEdit","author" : "author","readCount" : "readCount","isPinned" : "isPinned"
// ,"resourceId" : "resourceId","departmentId" : "departmentId","tagId" : "tagId"
// }