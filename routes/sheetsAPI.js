var express = require('express');
var router = express.Router();
var rp = require('request-promise-native');

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
var sheets = google.sheets('v4');

const sheetId = '1-jqRrxaiifgrxyrxNAiaBy0LTSRPq2NmwMjPsnMhL9A';    // research database
// const sheetId = '1FQK00JrBtazJ247OmvPoPjfGympWwV5zLDpeP5iJdQ0';  // my test sheet
const apiKey = 'AIzaSyCGj1-hvQBoDF7CuUryVze0KaMKcrNRVSM';

// GOOGLE SHEETS API SETUP =====================================
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const CLIENT_SECRET_PATH = 'googleapis_credentials/client_secret.json';
const TOKEN_PATH = 'googleapis_credentials/credentials.json';

var clientAuth = null;

// DATA SETUP =================================================
var deptData = [];
var positionData = [];
// var keywordData = [];
var academicData = [];

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  clientAuth = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) getNewToken(clientAuth);
    else {
        console.log('SHEET: read token file SUCCESS!');
        clientAuth.setCredentials(JSON.parse(token));
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) console.log('Error get token : ' + err);
      else {
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
      }
    });
  });
}

// Load client secrets from a local file.
fs.readFile(CLIENT_SECRET_PATH, (err, content) => {
  if (err) console.log('Error loading client secret file:', err);
  else {
    // Authorize a client with credentials, then call the Google Sheets API.
    console.log('SHEET: read client_secret.json SUCCESS!');
    authorize(JSON.parse(content));
  }
});

// route definitions ==============================================
router.get('/insertResearcherSheet', function(req, res) {

    sheets.spreadsheets.values.batchGet({
      spreadsheetId: sheetId,
      ranges: [ "'นักวิจัย'" ],
      auth: clientAuth
    }, (err, {data}) => {
      if (err) {
        res.json({
          code: 'FAILED',
          message:'The API returned an error: ' + err
        });
      } else {
        const rows = data.valueRanges[0].values;
        var fail_info = null;
        for (var i=1; i<rows.length; i++) {  // skip header row (i=0)

          var name_th = rows[i].length > 0 ? rows[i][0].trim() : 'N/A';
          if (name_th.includes(' ')) {
            name_th = {
              fname: (name_th.split(' '))[0].trim(),
              lname: (name_th.split(' '))[1].trim()
            }
          } else {
            name_th = {
              fname: name_th,
              lname: ''
            }
          }

          var name_en = rows[i].length > 2 ? rows[i][2].trim() : 'N/A';
          if (name_en.includes(' ')) {
            name_en = {
              fname: (name_en.split(' '))[0].trim(),
              lname: (name_en.split(' '))[1].trim()
            }
          } else {
            name_en = {
              fname: name_en,
              lname: ''
            }
          }
          var formData = {
            researcherFName_TH: name_th.fname,
            researcherLName_TH: name_th.lname,
            researcherFName_EN: name_en.fname,
            researcherLName_EN: name_en.lname,
            gender: 'N/A',
            personalID: rows[i].length > 1 ? (rows[i][1].length > 0 ? rows[i][1].trim() : 'N/A') : 'N/A',
            birthDate: rows[i].length > 11 ? (rows[i][11].length > 0 ? rows[i][11].trim() : 'N/A') : 'N/A',
            departmentId: 'N/A',
            positionId: 'N/A',
            academicLevelId: 'N/A',
            bachelorGraduation: rows[i].length > 7 ? (rows[i][7].length > 0 ? rows[i][7].trim() : 'N/A') : 'N/A',
            masterGraduation: rows[i].length > 8 ? (rows[i][8].length > 0 ? rows[i][8].trim() : 'N/A') : 'N/A',
            doctoralGraduation: rows[i].length > 9 ? (rows[i][9].length > 0 ? rows[i][9].trim() : 'N/A') : 'N/A',
            target: rows[i].length > 28 ? (rows[i][28].length > 0 ? rows[i][28].trim() : 'N/A') : 'N/A',
            assignDate: rows[i].length > 10 ? (rows[i][10].length > 0 ? rows[i][10].trim() : 'N/A') : 'N/A',
            retirementStatus: rows[i].length > 12 ? (rows[i][12].length > 0 ? rows[i][12].trim() : 'N/A') : 'N/A',
          }
          for (var k=0; k<deptData.length; k++) if (deptData[k].departmentName_TH == rows[i][3].trim()) { formData.departmentId = deptData[k]._id;  break; }
          for (var k=0; k<positionData.length; k++) if (positionData[k].positionName_TH == rows[i][5].trim()) { formData.positionId = positionData[k]._id;  break; }
          for (var k=0; k<academicData.length; k++) if (academicData[k].academicLevelName_TH == rows[i][4].trim()) { formData.academicLevelId = academicData[k]._id;  break; }

          var response = await rp({
            uri: 'http://localhost:2000/api/newResearcher',
            method: 'POST',
            form: formData
          });

          if (response.code != '999999') {
            console.log('FAILED => ' + response.code + ' ---> ' + response.message);
            fail_info = {
              code: response.code,
              message: response.message
            };
            break;
          } 
        }
        // res.json({
        //   code: rows
        // });
        
        if (fail_info) {
          console.log('FAIL INFO => ' + fail_info.code + ' ---> ' + fail_info.message);
          res.json({
            code: 'FAILED',
            message: 'API failed with code => ' + fail_info.code + ' and message => ' + fail_info.message
          });
        } else {
          res.json({
            code: '999999',
            message: 'done!'
          });
        }
      }
    });
});

router.get('/insertResearchWorkSheet', function(req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: [ "'ผลงานวิจัย'" ],
    auth: clientAuth
  }, (err, {data}) => {
    if (err) {
      res.json({
        code: 'FAILED',
        message:'The API returned an error: ' + err
      });
    } else {
      const rows = data.valueRanges.values;
      res.json({
        code: '999999',
        message: data
      });
    }
  });
});

router.get('/insertResearchFundSheet', function(req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: [ "'ทุนวิจัย'" ],
    auth: clientAuth
  }, (err, {data}) => {
    if (err) {
      res.json({
        code: 'FAILED',
        message:'The API returned an error: ' + err
      });
    } else {
      const rows = data.valueRanges[0].values;
      res.json({
        code: '999999',
        message: rows
      });
    }
  });
});

router.get('/insertRewardSheet', function(req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: [ "'รางวัล'" ],
    auth: clientAuth
  }, (err, {data}) => {
    if (err) {
      res.json({
        code: 'FAILED',
        message:'The API returned an error: ' + err
      });
    } else {
      const rows = data.valueRanges[0].values;
      res.json({
        code: '999999',
        message: rows
      });
    }
  });
});

router.get('/insertIntellectualPropertySheet', function(req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: [ "'ข้อมูลทรัพย์สินทางปัญญา'" ],
    auth: clientAuth
  }, (err, {data}) => {
    if (err) {
      res.json({
        code: 'FAILED',
        message:'The API returned an error: ' + err
      });
    } else {
      const rows = data.valueRanges[0].values;
      res.json({
        code: '999999',
        message: rows
      });
    }
  });
});

router.get('/insertThesisSheet', function(req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: [ "'หัวข้อวิทยานิพนธ์'" ],
    auth: clientAuth
  }, (err, {data}) => {
    if (err) {
      res.json({
        code: 'FAILED',
        message:'The API returned an error: ' + err
      });
    } else {
      const rows = data.valueRanges[0].values;
      res.json({
        code: '999999',
        message: rows
      });
    }
  });
});

router.get('/insertAcademicServiceSheet', function(req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: [ "'บริการวิชาการ'" ],
    auth: clientAuth
  }, (err, {data}) => {
    if (err) {
      res.json({
        code: 'FAILED',
        message:'The API returned an error: ' + err
      });
    } else {
      const rows = data.valueRanges[0].values;
      res.json({
        code: '999999',
        message: rows
      });
    }
  });
});

router.get('/insertSciKmitlJournalSheet', function(req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: [ "'บทความวารสารวิทยาศาสตร์ลาดกระบัง'" ],
    auth: clientAuth
  }, (err, {data}) => {
    if (err) {
      res.json({
        code: 'FAILED',
        message:'The API returned an error: ' + err
      });
    } else {
      const rows = data.valueRanges[0].values;
      res.json({
        code: '999999',
        message: rows
      });
    }
  });
});

router.get('/insertStaffTrainingSheet', function(req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: [ "'อบรม/พัฒนา ของเจ้าหน้าที่'" ],
    auth: clientAuth
  }, (err, {data}) => {
    if (err) {
      res.json({
        code: 'FAILED',
        message:'The API returned an error: ' + err
      });
    } else {
      const rows = data.valueRanges[0].values;
      res.json({
        code: '999999',
        message: rows
      });
    }
  });
});

router.get('/insertTeacherTrainingSheet', function(req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: [ "'อบรม/พัฒนา ของอาจารย์'" ],
    auth: clientAuth
  }, (err, {data}) => {
    if (err) {
      res.json({
        code: 'FAILED',
        message:'The API returned an error: ' + err
      });
    } else {
      const rows = data.valueRanges[0].values;
      res.json({
        code: '999999',
        message: rows
      });
    }
  });
});

router.get('/getDataSetup', async function(req, res) {

    var response1 = await rp({
      uri: 'http://localhost:2000/api/getAllDepartment',
      method: 'POST',
      form: {}
    });
    var response2 = await rp({
      uri: 'http://localhost:2000/api/getAllPosition',
      method: 'POST',
      form: {}
    });
    var response3 = await rp({
      uri: 'http://localhost:2000/api/getAllAcademicLevel',
      method: 'POST',
      form: {}
    });
    if (response1.constructor != Object) response1 = JSON.parse(response1);
    if (response2.constructor != Object) response2 = JSON.parse(response2);
    if (response3.constructor != Object) response3 = JSON.parse(response3);

    if (response1.code == '999999' && response1.data.length > 0) {
        var depts_new = response1.data;
        for (var i=0; i<depts_new.length; i++) {
          var isNew = true;
          for (var j=0; j<deptData.length; j++) if (depts_new[i]._id == deptData[j]._id) { isNew=false; break; }
          if (isNew) deptData.push(depts_new[i]);
        }
    }
    if (response2.code == '999999' && response2.data.length > 0) {
      var pos_new = response2.data;
      for (var i=0; i<pos_new.length; i++) {
        var isNew = true;
        for (var j=0; j<positionData.length; j++) if (pos_new[i]._id == positionData[j]._id) { isNew=false; break; }
        if (isNew) positionData.push(pos_new[i]);
      }
    }
    if (response3.code == '999999' && response3.data.length > 0) {
      var acads_new = response3.data;
      for (var i=0; i<acads_new.length; i++) {
        var isNew = true;
        for (var j=0; j<academicData.length; j++) if (acads_new[i]._id == academicData[j]._id) { isNew=false; break; }
        if (isNew) academicData.push(acads_new[i]);
      }
    }

    res.json({
      code: '999999',
      message: {
        dept: deptData,
        pos: positionData,
        acad: academicData
      }
    });
});

module.exports = router;

