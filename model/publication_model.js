var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Publication_Schema = new Schema({
    researcherId: { type: String, default: null },
    publicationName: { type: String, required: true },
    publicationAuthor: { type: String, default: null },
    publishLocation: { type: String, default: null },
    publishYear: { type: Number, default: 0 },
    publishType: { type: String, default: null },
    scholarType: { type: String, default: null },
    address: { type: String, default: null },
    publicationDatabase: { type: String, default: null },
    impactFactor: { type: String, default: null },
    quartile: { type: String, default: null },
    weight: { type: String, default: null },
    detail: { type: String, default: null },

    studentName: { type: String, default: null },
    bachelorDepartmentId: { type: String, default: null },
    masterDepartmentId: { type: String, default: null },
    doctoryDepartmentId: { type: String, default: null },
    graduationYear: { type: String, default: null },
    publicationRaw: { type: String, default: null },

    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Publication', Publication_Schema);

// {
// "_id": "_id","topicShort" : "topicShort","topicFull" : "topicFull","detailShort" : "detailShort","detailFull" : "detailFull","topicPicture" : "topicPicture"
// ,"datetimePost" : "datetimePost","datetimeEdit" : "datetimeEdit","author" : "author","readCount" : "readCount","isPinned" : "isPinned"
// ,"resourceId" : "resourceId","departmentId" : "departmentId","tagId" : "tagId"
// }