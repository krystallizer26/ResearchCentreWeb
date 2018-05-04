var express = require('express');
var router = express.Router();

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const OAuth2Client = google.auth.OAuth2;

// const sheetId = '1-jqRrxaiifgrxyrxNAiaBy0LTSRPq2NmwMjPsnMhL9A';
const sheetId = '1FQK00JrBtazJ247OmvPoPjfGympWwV5zLDpeP5iJdQ0';  // my test sheet
const apiKey = 'AIzaSyCGj1-hvQBoDF7CuUryVze0KaMKcrNRVSM';

// GOOGLE SHEETS API SETUP =====================================
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'googleapis_credentials/credentials.json';

var clientAuth = null;

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
fs.readFile('googleapis_credentials/client_secret.json', (err, content) => {
  if (err) console.log('Error loading client secret file:', err);
  else {
    // Authorize a client with credentials, then call the Google Sheets API.
    console.log('SHEET: read client_secret.json SUCCESS!');
    authorize(JSON.parse(content));
  }
});

// route definitions ==============================================
router.get('/getResearcherSheet', function(req, res) {
    const service = google.sheets({version: 'v4', clientAuth});
  service.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'Sheet1!A2:B',
    key: apiKey
  }, (err, {data}) => {
    if (err) res.json({m:'The API returned an error: ' + err});
    else {
      const rows = data.values;
      if (rows.length) {
          // Print columns A and E, which correspond to indices 0 and 4.
          var l = [];
          rows.map((row) => {
              l.push(`${row[0]}, ${row[1]}`);
          })

          res.json({m: l});
      } else {
          res.json({m:'No data found.'});
      }
    }
  });
});

module.exports = router;

