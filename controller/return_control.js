module.exports = {
    responseWithCode: function (codeNum, txt, response) {
        console.log("** Response message >> " + txt);
        response.json({ "code": codeNum, "message": txt, "data": null });
    },
    responseWithCodeAndData: function (codeNum, txt, data, response) {
        // console.log("** Response #"+codeNum+" >> " + txt);
        // console.log("** Response data    >> " + JSON.stringify(data));
        response.json({ "code": codeNum, "message": txt, "data": data });
    }
};