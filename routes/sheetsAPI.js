let express = require('express');
let router = express.Router();
let request = require('request');
let rp = require('request-promise-native');

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
let sheets = google.sheets('v4');

const sheetId = '1-jqRrxaiifgrxyrxNAiaBy0LTSRPq2NmwMjPsnMhL9A';    // research database
// const sheetId = '1FQK00JrBtazJ247OmvPoPjfGympWwV5zLDpeP5iJdQ0';  // my test sheet
const apiKey = 'AIzaSyCGj1-hvQBoDF7CuUryVze0KaMKcrNRVSM';

// GOOGLE SHEETS API SETUP =====================================
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const CLIENT_SECRET_PATH = 'googleapis_credentials/client_secret.json';
const TOKEN_PATH = 'googleapis_credentials/credentials.json';

let Researcher_Control = require("../controller/researcher_control.js");
let Publication_Control = require("../controller/publication_control.js");
let ResearchFund_Control = require("../controller/researchFund_control.js");
let Reward_Control = require("../controller/reward_control.js");
let IntellectualProperty_Control = require("../controller/intellectualProperty_control.js");
let Thesis_Control = require("../controller/thesis_control.js");
let ResearcherTraining_Control = require("../controller/researcherTraining_control.js");


let clientAuth = null;

// DATA SETUP =================================================
let deptData = [];
let positionData = [];
// let keywordData = [];
let academicData = [];

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
function authorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
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
router.get('/insertResearcherSheet', function (req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: ["'นักวิจัย'"],
    auth: clientAuth
  }, function (err, { data }) {
    if (err) {
      res.json({
        code: 'FAILED',
        message: 'The API returned an error: ' + err + ": data >> " + data
      });
    } else {
      scrapingResearcher(data.valueRanges[0].values, function (message) {
        res.json({ code: '999999', message: message });
      })
    }
  });
});

async function scrapingResearcher(rows, callback) {
  let j = 0;
  for (let i = 1; i < rows.length; i++) {  // skip header row (i=0)
    let scrapingData = {
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
      organizationTel: validateValueInRow(rows[i], 50),
      mobileTel: validateValueInRow(rows[i], 51),
      email: validateValueInRow(rows[i], 52),
      workplace: validateValueInRow(rows[i], 53),
      facebook: validateValueInRow(rows[i], 54),
      twitter: validateValueInRow(rows[i], 55),
      instragram: validateValueInRow(rows[i], 56),
      line: validateValueInRow(rows[i], 57),
      personalSite: validateValueInRow(rows[i], 58),
      insignia1: validateValueInRow(rows[i], 59),
      insignia2: validateValueInRow(rows[i], 60),
      totalCitationNotSelf: validateValueInRow(rows[i], 61),
      citation2014: validateValueInRow(rows[i], 62),
      citation2015: validateValueInRow(rows[i], 63),
      citation2016: validateValueInRow(rows[i], 64),
      citation2017: validateValueInRow(rows[i], 65),
      citation2018: validateValueInRow(rows[i], 66),
      researcherPic: null
    }
    Researcher_Control.newResearcher_fromScrap(scrapingData, function () {
      j++
      if (j == rows.length - 1)
        callback(j + " rows of researcher are saved")
    })
  }
}

// --------------------------------------------------------------------------------------------

router.get('/insertPublicationWorkSheet', function (req, res) {
  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: ["'ผลงานวิจัย'"],
    auth: clientAuth
  }, function (err, { data }) {
    if (err) {
      res.json({
        code: 'FAILED',
        message: 'The API returned an error: ' + err + ": data >> " + data
      });
    } else {
      scrapingPublication(data.valueRanges[0].values, function (message) {
        res.json({ code: '999999', message: message });
      })
    }
  });
});

async function scrapingPublication(rows, callback) {
  let j = 0;
  for (let i = 1; i < rows.length; i++) {  // skip header row (i=0)
    let scrapingData = {
      researcherName: validateValueInRow(rows[i], 0),
      researcherPersonalID: validateValueInRow(rows[i], 1),
      publicationName: validateValueInRow(rows[i], 3),
      publicationAuthor: validateValueInRow(rows[i], 4),
      publishLocation: validateValueInRow(rows[i], 5),
      publishYear: validateValueInRow(rows[i], 6),
      publishType_raw: validateValueInRow(rows[i], 7),
      scholarType: validateValueInRow(rows[i], 8),
      address: validateValueInRow(rows[i], 9),
      publicationDatabase: validateValueInRow(rows[i], 11),
      impactFactor: validateValueInRow(rows[i], 12),
      quartile: validateValueInRow(rows[i], 13),
      weight: validateValueInRow(rows[i], 14),
      detail: validateValueInRow(rows[i], 15),
      studentName: validateValueInRow(rows[i], 19),
      bachelorTeachingDepartmentName_TH: validateValueInRow(rows[i], 16),
      masterTeachingDepartmentName_TH: validateValueInRow(rows[i], 17),
      doctoryTeachingDepartmentName_TH: validateValueInRow(rows[i], 18),
      graduationYear: validateValueInRow(rows[i], 20),
      doi: validateValueInRow(rows[i], 21)
    }
    Publication_Control.newPublication_fromScrap(scrapingData, function () {
      j++
      if (j == rows.length - 1)
        callback(j + " rows of publication are saved")
    })
  }
}

// --------------------------------------------------------------------------------------------

router.get('/insertResearchFundSheet', function (req, res) {
  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: ["'ทุนวิจัย'"],
    auth: clientAuth
  }, function (err, { data }) {
    if (err) {
      res.json({
        code: 'FAILED',
        message: 'The API returned an error: ' + err + ": data >> " + data
      });
    } else {
      scrapingResearchFund(data.valueRanges[0].values, function (message) {
        res.json({ code: '999999', message: message });
      })
    }
  });
});

async function scrapingResearchFund(rows, callback) {
  let j = 0;
  for (let i = 1; i < rows.length; i++) {  // skip header row (i=0)
    let scrapingData = {
      researcherName: validateValueInRow(rows[i], 0),
      researcherPersonalID: validateValueInRow(rows[i], 1),

      researchName: validateValueInRow(rows[i], 4),
      fundSource: validateValueInRow(rows[i], 6),

      scholarshipYear: validateValueInRow(rows[i], 7),
      scholarshipStart: validateValueInRow(rows[i], 9),
      scholarshipPeriod: validateValueInRow(rows[i], 8),
      progress6MonthDate: validateValueInRow(rows[i], 10),
      progress6MonthPercent: validateValueInRow(rows[i], 11),
      progress12MonthDate: validateValueInRow(rows[i], 12),
      progress12MonthPercent: validateValueInRow(rows[i], 13),
      extend1: validateValueInRow(rows[i], 14),
      extend2: validateValueInRow(rows[i], 15),
      fullPaperDate: validateValueInRow(rows[i], 16),
      result1: validateValueInRow(rows[i], 17),
      result2: validateValueInRow(rows[i], 18),
      finishDate: validateValueInRow(rows[i], 19),
      perYear: validateValueInRow(rows[i], 20),
      continueYear: validateValueInRow(rows[i], 21),
      maximumFund: validateValueInRow(rows[i], 22),
      ratio: validateValueInRow(rows[i], 23),
      role: validateValueInRow(rows[i], 24),
      before2561Inside: validateValueInRow(rows[i], 25),
      before2561Outside: validateValueInRow(rows[i], 26),
      after2561: validateValueInRow(rows[i], 27),
      detail: validateValueInRow(rows[i], 28)
    }
    ResearchFund_Control.newResearchFund_fromScrap(scrapingData, function () {
      j++
      if (j == rows.length - 1)
        callback(j + " rows of researchFund are saved")
    })
  }
}

// --------------------------------------------------------------------------------------------

router.get('/insertRewardSheet', function (req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: ["'รางวัล'"],
    auth: clientAuth
  }, function (err, { data }) {
    if (err) {
      res.json({
        code: 'FAILED',
        message: 'The API returned an error: ' + err + ": data >> " + data
      });
    } else {
      scrapingReward(data.valueRanges[0].values, function (message) {
        res.json({ code: '999999', message: message });
      })
    }
  });
});

async function scrapingReward(rows, callback) {
  let j = 0;
  for (let i = 1; i < rows.length; i++) {  // skip header row (i=0)
    let scrapingData = {
      researcherName: validateValueInRow(rows[i], 0),
      researcherPersonalID: validateValueInRow(rows[i], 1),

      rewardName: validateValueInRow(rows[i], 4),
      rewardFrom: validateValueInRow(rows[i], 5),
      studentName: validateValueInRow(rows[i], 6),
      rewardYear: validateValueInRow(rows[i], 7),
      rewardDate: validateValueInRow(rows[i], 8),
      rewardRank: validateValueInRow(rows[i], 9)
    }
    Reward_Control.newReward_fromScrap(scrapingData, function () {
      j++
      if (j == rows.length - 1)
        callback(j + " rows of reward are saved")
    })
  }
}

// --------------------------------------------------------------------------------------------

router.get('/insertIntellectualPropertySheet', function (req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: ["'ข้อมูลทรัพย์สินทางปัญญา'"],
    auth: clientAuth
  }, function (err, { data }) {
    if (err) {
      res.json({
        code: 'FAILED',
        message: 'The API returned an error: ' + err
      });
    } else {
      scrapingIntellectualProperty(data.valueRanges[0].values, function (message) {
        res.json({ code: '999999', message: message });
      })
    }
  });
});

async function scrapingIntellectualProperty(rows, callback) {
  let j = 0;
  for (let i = 1; i < rows.length; i++) {  // skip header row (i=0)
    let scrapingData = {
      researcherName: validateValueInRow(rows[i], 0),
      researcherPersonalID: validateValueInRow(rows[i], 1),

      intPropertyCode: validateValueInRow(rows[i], 4),
      intPropertyRegisterDate: validateValueInRow(rows[i], 5),
      licenseCode: validateValueInRow(rows[i], 6),
      intPropertyName: validateValueInRow(rows[i], 7),
      licenseType: validateValueInRow(rows[i], 8),
      claimBy: validateValueInRow(rows[i], 9),
      coCreation: validateValueInRow(rows[i], 10)
    }
    IntellectualProperty_Control.newIntellectualProperty_fromScrap(scrapingData, function () {
      j++
      if (j == rows.length - 1)
        callback(j + " rows of reward are saved")
    })
  }
}

// --------------------------------------------------------------------------------------------

router.get('/insertThesisSheet', function (req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: ["'หัวข้อวิทยานิพนธ์'"],
    auth: clientAuth
  }, function (err, { data }) {
    if (err) {
      res.json({
        code: 'FAILED',
        message: 'The API returned an error: ' + err
      });
    } else {
      scrapingThesis(data.valueRanges[0].values, function (message) {
        res.json({ code: '999999', message: message });
      })
    }
  });
});

async function scrapingThesis(rows, callback) {
  let j = 0;
  for (let i = 1; i < rows.length; i++) {  // skip header row (i=0)
    let scrapingData = {
      researcherName: validateValueInRow(rows[i], 0),
      researcherPersonalID: validateValueInRow(rows[i], 1),

      studentName: rows[i][3] + " " + validateValueInRow(rows[i], 5),
      studentCode: validateValueInRow(rows[i], 6),
      studentTel: validateValueInRow(rows[i], 7),
      studentEmail: validateValueInRow(rows[i], 8),
      masterDepartmentName: validateValueInRow(rows[i], 9),
      doctoryDepartmentName: validateValueInRow(rows[i], 10),
      thesisName_TH: validateValueInRow(rows[i], 11),
      thesisName_EN: validateValueInRow(rows[i], 12),
      coProfessor1: validateValueInRow(rows[i], 13),
      coProfessor2: validateValueInRow(rows[i], 14),
      chiefCommitee: validateValueInRow(rows[i], 15),
      commitee1: validateValueInRow(rows[i], 16),
      commitee2: validateValueInRow(rows[i], 17),
      commitee3: validateValueInRow(rows[i], 18),
      professorAssignDate: validateValueInRow(rows[i], 19),
      thesisNameAssignDate: validateValueInRow(rows[i], 20),
      thesisNameAnnounceDate: validateValueInRow(rows[i], 21),
      qualifyTestDate: validateValueInRow(rows[i], 23),
      outlineTestDate: validateValueInRow(rows[i], 22),
      thesisTestDate: validateValueInRow(rows[i], 24),
      gradutionDate: validateValueInRow(rows[i], 25),
      gradutionProduct1: validateValueInRow(rows[i], 26),
      gradutionProduct2: validateValueInRow(rows[i], 27),
      gradutionProduct3: validateValueInRow(rows[i], 28),
    }
    Thesis_Control.newThesis_fromScrap(scrapingData, function () {
      j++
      if (j == rows.length - 1)
        callback(j + " rows of reward are saved")
    })
  }
}

// --------------------------------------------------------------------------------------------

router.get('/insertAcademicServiceSheet', function (req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: ["'บริการวิชาการ'"],
    auth: clientAuth
  }, (err, { data }) => {
    if (err) {
      res.json({
        code: 'FAILED',
        message: 'The API returned an error: ' + err
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

router.get('/insertSciKmitlJournalSheet', function (req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: ["'บทความวารสารวิทยาศาสตร์ลาดกระบัง'"],
    auth: clientAuth
  }, (err, { data }) => {
    if (err) {
      res.json({
        code: 'FAILED',
        message: 'The API returned an error: ' + err
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

router.get('/insertStaffTrainingSheet', function (req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: ["'อบรม/พัฒนา ของเจ้าหน้าที่'"],
    auth: clientAuth
  }, (err, { data }) => {
    if (err) {
      res.json({
        code: 'FAILED',
        message: 'The API returned an error: ' + err
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

// --------------------------------------------------------------------------------------------

router.get('/insertTeacherTrainingSheet', function (req, res) {

  sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: ["'อบรม/พัฒนา ของอาจารย์'"],
    auth: clientAuth
  }, (err, { data }) => {
    if (err) {
      res.json({
        code: 'FAILED',
        message: 'The API returned an error: ' + err
      });
    } else {
      scrapingResearcherTraining(data.valueRanges[0].values, function (message) {
        res.json({ code: '999999', message: message });
      })
    }
  });
});

async function scrapingResearcherTraining(rows, callback) {
  let j = 0;
  for (let i = 1; i < rows.length; i++) {  // skip header row (i=0)
    let scrapingData = {
      researcherName: validateValueInRow(rows[i], 0),
          researcherPersonalID: validateValueInRow(rows[i], 1),

          researchTopic: validateValueInRow(rows[i], 4),
          trainingName: validateValueInRow(rows[i], 5),
          trainingType: validateValueInRow(rows[i], 6),
          trainingLevel: validateValueInRow(rows[i], 7),
          trainingYear: validateValueInRow(rows[i], 8),
          trainingStartDate: validateValueInRow(rows[i], 9),
          trainingFinishDate: validateValueInRow(rows[i], 10),
          trainingLocation: validateValueInRow(rows[i], 11),
          scholarshipType: validateValueInRow(rows[i], 12),
          scholarshipLimit: validateValueInRow(rows[i], 13),
          orderCode: validateValueInRow(rows[i], 15),
          approveDate: validateValueInRow(rows[i], 16)
    }
    ResearcherTraining_Control.newResearcherTraining_fromScrap(scrapingData, function () {
      j++
      if (j == rows.length - 1)
        callback(j + " rows of reward are saved")
    })
  }
}

// --------------------------------------------------------------------------------------------

router.get('/getDataSetup', async function (req, res) {

  let response1 = await rp({
    uri: 'http://localhost:2000/api/getAllDepartment',
    method: 'POST',
    form: {}
  });
  let response2 = await rp({
    uri: 'http://localhost:2000/api/getAllPosition',
    method: 'POST',
    form: {}
  });
  let response3 = await rp({
    uri: 'http://localhost:2000/api/getAllAcademicLevel',
    method: 'POST',
    form: {}
  });
  if (response1.constructor != Object) response1 = JSON.parse(response1);
  if (response2.constructor != Object) response2 = JSON.parse(response2);
  if (response3.constructor != Object) response3 = JSON.parse(response3);

  if (response1.code == '999999' && response1.data.length > 0) {
    let depts_new = response1.data;
    for (let i = 0; i < depts_new.length; i++) {
      let isNew = true;
      for (let j = 0; j < deptData.length; j++) if (depts_new[i]._id == deptData[j]._id) { isNew = false; break; }
      if (isNew) deptData.push(depts_new[i]);
    }
  }
  if (response2.code == '999999' && response2.data.length > 0) {
    let pos_new = response2.data;
    for (let i = 0; i < pos_new.length; i++) {
      let isNew = true;
      for (let j = 0; j < positionData.length; j++) if (pos_new[i]._id == positionData[j]._id) { isNew = false; break; }
      if (isNew) positionData.push(pos_new[i]);
    }
  }
  if (response3.code == '999999' && response3.data.length > 0) {
    let acads_new = response3.data;
    for (let i = 0; i < acads_new.length; i++) {
      let isNew = true;
      for (let j = 0; j < academicData.length; j++) if (acads_new[i]._id == academicData[j]._id) { isNew = false; break; }
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
