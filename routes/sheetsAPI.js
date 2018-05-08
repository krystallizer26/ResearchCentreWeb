var express = require('express');
var router = express.Router();
var request = require('request');
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
    }, function(err, {data}) {
      if (err) {
        res.json({
          code: 'FAILED',
          message:'The API returned an error: ' + err
        });
      } else {
        const rows = data.valueRanges[0].values;
        var fail_info = null;
        var dataSend = [];
        for (var i=1; i<rows.length; i++) {  // skip header row (i=0)
          var formData = {
            researcherName_TH: validateValueInRow(rows[i], 0),
            researcherName_EN: validateValueInRow(rows[i], 2),
            personalID: validateValueInRow(rows[i], 1),
            departmentName_TH: validateValueInRow(rows[i], 3),
            academicPositionName_TH: validateValueInRow(rows[i], 4),
            academicPositionName_EN: validateValueInRow(rows[i], 6),
            positionName_TH: validateValueInRow(rows[i], 5),
            bachelorGraduation: validateValueInRow(rows[i], 7),
            masterGraduation: validateValueInRow(rows[i], 8),
            doctoralGraduation: validateValueInRow(rows[i], 9),
            assignDate: validateValueInRow(rows[i], 10),
            birthDate: validateValueInRow(rows[i], 11),
            retirementStatus: validateValueInRow(rows[i], 12),
            target: validateValueInRow(rows[i], 28),
            bachelorTeachingDepartmentName_TH: validateValueInRow(rows[i], 13),
            bachelor_AcademicYear: validateValueInRow(rows[i], 14),
            bachelor_FacultyBoard_Comment: validateValueInRow(rows[i], 15),
            bachelor_CouncilBoard_Comment: validateValueInRow(rows[i], 16),
            bachelor_InstituteBoard_Comment: validateValueInRow(rows[i], 17),
            masterTeachingDepartmentName_TH: validateValueInRow(rows[i], 18),
            master_AcademicYear: validateValueInRow(rows[i], 19),
            master_FacultyBoard_Comment: validateValueInRow(rows[i], 20),
            master_CouncilBoard_Comment: validateValueInRow(rows[i], 21),
            master_InstituteBoard_Comment: validateValueInRow(rows[i], 22),
            doctoryTeachingDepartmentName_TH: validateValueInRow(rows[i], 23),
            doctory_AcademicYear: validateValueInRow(rows[i], 24),
            doctory_FacultyBoard_Comment: validateValueInRow(rows[i], 25),
            doctory_CouncilBoard_Comment: validateValueInRow(rows[i], 26),
            doctory_InstituteBoard_Comment: validateValueInRow(rows[i], 27),
            keyword1_TH: validateValueInRow(rows[i], 34),
            keyword2_TH: validateValueInRow(rows[i], 35),
            keyword3_TH: validateValueInRow(rows[i], 36),
            keyword4_TH: validateValueInRow(rows[i], 37),
            keyword5_TH: validateValueInRow(rows[i], 38),
            keyword1_EN: validateValueInRow(rows[i], 29),
            keyword2_EN: validateValueInRow(rows[i], 30),
            keyword3_EN: validateValueInRow(rows[i], 31),
            keyword4_EN: validateValueInRow(rows[i], 32),
            keyword5_EN: validateValueInRow(rows[i], 33),
            scopusBefore2560: validateValueInRow(rows[i], 39),
            citationBefore2560: validateValueInRow(rows[i], 40),
            hIndex: validateValueInRow(rows[i], 41),
            citationTotal: validateValueInRow(rows[i], 42),
            citationAfter2560: validateValueInRow(rows[i], 43),
            citationLifeTime: validateValueInRow(rows[i], 44),
            citationTCI: validateValueInRow(rows[i], 45),
            publicationTotal: validateValueInRow(rows[i], 46),
            publication2560: validateValueInRow(rows[i], 47),
            publicationLifeTime: validateValueInRow(rows[i], 48),
            publicationTCI: validateValueInRow(rows[i], 49),
            researcherPic: null
          };
          dataSend.push(formData);
          // for (var k=0; k<deptData.length; k++) if (deptData[k].departmentName_TH == rows[i][3].trim()) { formData.departmentId = deptData[k]._id;  break; }
          // for (var k=0; k<positionData.length; k++) if (positionData[k].positionName_TH == rows[i][5].trim()) { formData.positionId = positionData[k]._id;  break; }
          // for (var k=0; k<academicData.length; k++) if (academicData[k].academicLevelName_TH == rows[i][4].trim()) { formData.academicLevelId = academicData[k]._id;  break; }

          rp({
            uri: 'http://localhost:2000/api/newResearcher_EachScrap',
            method: 'POST',
            form: formData
          }).then(function(response) {
            if (response.code != '999999') {
              console.log('FAILED => ' + response.code + ' ---> ' + response.message);
            } else {
              console.log('--------- SUCCESS !!!');
            }
          }).catch(function(err) {
            console.log('ERROR => ' + err.message);
          });
        }
        
        // res.json({
        //   code: '999999',
        //   message: dataSend
        // });

        res.json({
          code: '999999',
          message: 'done!'
        });
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

function validateValueInRow(row, idx) {
  return row.length > idx ? (row[idx].length > 0 ? row[idx].trim() : null) : null;
}

module.exports = router;

