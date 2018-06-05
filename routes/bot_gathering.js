

const fs = require("fs");
const querystring = require('querystring');


const path = require('path');

const request = require('request');



const Nightmare = require('nightmare');		

require('nightmare-window-manager')(Nightmare);

var nightmare = Nightmare({
    show: true,
    waitTimeout: 50000, 
    gotoTimeout: 50000, // in mssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    loadTimeout: 50000,
    executionTimeout: 50000
  });


function bot_gathering(data,callback)
{


  console.log("bot_gathering()  = " + JSON.stringify(data));
  let publictation=0
  let citetation =0
var vo = require('vo');

vo(function * () {

var enter_code =[];
var code = data.securecode;


  var title = yield nightmare  .windowManager()
  .goto('https://www.scopus.com/search/form.uri?display=authorLookup&clear=t&origin=searchbasic&txGid=ddab0b1e35c0e69a2fb5b0a117d67d49')
  .waitWindowLoad()

    .type('input[name = st1 ]', data.lastname)
    .type('input[name = st2 ]', data.firstname)
    .click('#authorMainSearch')
    .waitWindowLoad()
    
     publictation =yield nightmare                                                                                                                                                                         
    .evaluate(function() {                                                                                                                                                                         
        var buf = document.querySelector("#resultsDocumentsCol1 > a").innerHTML;                                                                                                                                
        return buf;                                                                                                                                                                      
    })
    

    console.log('publictation = '+publictation);
    yield nightmare.click('#resultDataRow1 > td >a.docTitle')

     citetation =yield nightmare                                                                                                                                                                         
    .evaluate(function() {                                                                                                                                                                         
        var buf = document.querySelector("#totalCiteCount").innerHTML;                                                                                                                                
        return buf;                                                                                                                                                                      
    })
    console.log('citetation = '+citetation);

    





  //yield nightmare.end();

})(function(err) {
  if (err) {
    console.log('Error bot_gathering', err.toString());
    console.log('name = '+data.lastname +" _____ "+data.firstname);
 
    //เก็บ log
    callback(null)

  } else {
    //เก็บ log


    
    var form = {
        researcherId : data._id,
        publicationTotal :publictation.trim(),
        citationTotal : citetation.trim()
    }
    var formData = querystring.stringify(form);
    var contentLength = formData.length;
    request({
      header : {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    },
      uri: 'http://localhost:2000/api/editResearcherTotal/',
      form: formData,
      method: 'POST'
    }, function (err, res2, body) {
      //it works!
      if(err){
          console.log("[ERROR] = "+err);
          
      }
      else{
        console.log("err ="+err )
        console.log("res2 ="+res2 )
        console.log("body ="+body )
       
      
        
        }
        callback(null)
        
    
    });

   



  }


});


  

}

module.exports.bot_gathering = bot_gathering;  
