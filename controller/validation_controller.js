var ObjectId = require('mongodb').ObjectId;

module.exports = {
    requiredData_Check: function (requiredInput) {
        //console.log("Checking Data.. Length=" + requiredInput.length);
        //console.log(requiredInput.toString());
        let nullNotFounded = true;
        for (var i = 0; i < requiredInput.length; i++) {
            //console.log("Checking.. @"+i+":" +requiredInput[i]);
            if (requiredInput[i] == null) {
                nullNotFounded = false;
                break;
            }
            else if (requiredInput[i].length < 1) {
                nullNotFounded = false;
                break;
            }
        }
        return (nullNotFounded);
    },
    booleanData_Check: function (requiredInput) {
        //console.log("Checking Data.. Length=" + requiredInput.length);
        //console.log(requiredInput.toString());
        let wrongNotFounded = true;
        for (var i = 0; i < requiredInput.length; i++) {
            //console.log("Checking.. @"+i+":" +requiredInput[i]);
            if (requiredInput[i] != "true" && requiredInput[i] != "false") {
                wrongNotFounded = false;
                break;
            }
        }
        return (wrongNotFounded);
    },
    objectIDData_Check: function (requiredInput) {
        //console.log("Checking Data.. Length=" + requiredInput.length);
        //console.log(requiredInput.toString());
        let wrongNotFounded = true;
        for (var i = 0; i < requiredInput.length; i++) {
            //console.log("Checking.. @"+i+":" +requiredInput[i]);
            if (!ObjectId.isValid(requiredInput[i])) {
                wrongNotFounded = false;
                break;
            }
        }
        return (wrongNotFounded);
    },
    numberData_Check: function (requiredInput) {
        //console.log("Checking Data.. Length=" + requiredInput.length);
        //console.log(requiredInput.toString());
        let wrongNotFounded = true;
        for (var i = 0; i < requiredInput.length; i++) {
            //console.log("Checking.. @"+i+":" +requiredInput[i]);
            if (isNaN(requiredInput[i])) {
                wrongNotFounded = false;
                break;
            }
        }
        return (wrongNotFounded);
    },
    scrappingCleanUp: function (input) {
        //console.log("input: " + input);
        if (input) {
            let string = input;
            string = string.replace(/\\n/g, ' ')
            string = string.replace(/\\u/g, '-')
            string = string.replace(/\\r/g, ' ')
            string = string.trim()
            //console.log("output: " + string);
            return (string);
        }
        else
            return ""
    }
};