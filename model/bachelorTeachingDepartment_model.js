var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bachelor_Schema = new Schema({
    bachelorName_TH: { type: String, required: true, unique: true },
    bachelorName_EN: { type: String, required: true, unique: true },
    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bachelor', Bachelor_Schema);

// {
// "_id": "_id","topicShort" : "topicShort","topicFull" : "topicFull","detailShort" : "detailShort","detailFull" : "detailFull","topicPicture" : "topicPicture"
// ,"datetimePost" : "datetimePost","datetimeEdit" : "datetimeEdit","author" : "author","readCount" : "readCount","isPinned" : "isPinned"
// ,"resourceId" : "resourceId","departmentId" : "departmentId","tagId" : "tagId"
// }