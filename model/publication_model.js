var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Publication_Schema = new Schema({
    researcherId: { type: String, required: true },
    publicationName: { type: String, required: true },
    publishLocation: { type: String, default: "N/A" },
    publishYear: { type: Number, default: 0 },
    publishType: { type: String, default: "N/A" },
    scholarType: { type: String, default: "N/A" },
    address: { type: String, default: "N/A" },
    publicationDatabase: { type: String, default: "N/A" },
    impactFactor: { type: Number, default: 0 },
    quartile: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    detail: { type: String, default: "N/A" },
    
    studentName: { type: String, default: "N/A" },
    bachelorDepartment: { type: String, default: null },
    masterDepartment: { type: String, default: null },
    doctoryDepartment: { type: String, default: null },

    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Publication', Publication_Schema);

// {
// "_id": "_id","topicShort" : "topicShort","topicFull" : "topicFull","detailShort" : "detailShort","detailFull" : "detailFull","topicPicture" : "topicPicture"
// ,"datetimePost" : "datetimePost","datetimeEdit" : "datetimeEdit","author" : "author","readCount" : "readCount","isPinned" : "isPinned"
// ,"resourceId" : "resourceId","departmentId" : "departmentId","tagId" : "tagId"
// }