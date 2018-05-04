var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BachelorTeachingDepartment_Schema = new Schema({
    bachelorTeachingDepartmentName_TH: { type: String, unique: true },
    bachelorTeachingDepartmentName_EN: { type: String, default: null },
    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BachelorTeachingDepartment', BachelorTeachingDepartment_Schema);

// {
// "_id": "_id","topicShort" : "topicShort","topicFull" : "topicFull","detailShort" : "detailShort","detailFull" : "detailFull","topicPicture" : "topicPicture"
// ,"datetimePost" : "datetimePost","datetimeEdit" : "datetimeEdit","author" : "author","readCount" : "readCount","isPinned" : "isPinned"
// ,"resourceId" : "resourceId","departmentId" : "departmentId","tagId" : "tagId"
// }