var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Position_Schema = new Schema({
    positionName_TH: { type: String, unique: true  },
    positionName_EN: { type: String, default: null },
    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Position', Position_Schema);

// {
// "_id": "_id","topicShort" : "topicShort","topicFull" : "topicFull","detailShort" : "detailShort","detailFull" : "detailFull","topicPicture" : "topicPicture"
// ,"datetimePost" : "datetimePost","datetimeEdit" : "datetimeEdit","author" : "author","readCount" : "readCount","isPinned" : "isPinned"
// ,"resourceId" : "resourceId","departmentId" : "departmentId","tagId" : "tagId"
// }