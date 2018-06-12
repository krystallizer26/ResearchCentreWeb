var express = require('express');
var router = express.Router();
var request = require('request');
const querystring = require('querystring');

router.get('/deleteAllData', function (request2, response) {
    var methodCode = "!!";
    let j = 0;

    let form = {}
    let formData = querystring.stringify(form);

    request({
        header: {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://localhost:2000/api/wipeIntellectualProperty',
        form: formData,
        method: 'POST'
    }, function (err, res2, body) {
        j++;
        if (j == 7) {
            scrapResearcher(response);
        }
    })

    request({
        header: {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://localhost:2000/api/wipePublication',
        form: formData,
        method: 'POST'
    }, function (err, res2, body) {
        j++;
        if (j == 7) {
            scrapResearcher(response);
        }
    })

    request({
        header: {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://localhost:2000/api/wipeResearcher',
        form: formData,
        method: 'POST'
    }, function (err, res2, body) {
        j++;
        if (j == 7) {
            scrapResearcher(response);
        }
    })

    request({
        header: {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://localhost:2000/api/wipeResearcherTraining',
        form: formData,
        method: 'POST'
    }, function (err, res2, body) {
        j++;
        if (j == 7) {
            scrapResearcher(response);
        }
    })

    request({
        header: {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://localhost:2000/api/wipeResearchFund',
        form: formData,
        method: 'POST'
    }, function (err, res2, body) {
        j++;
        if (j == 7) {
            scrapResearcher(response);
        }
    })

    request({
        header: {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://localhost:2000/api/wipeReward',
        form: formData,
        method: 'POST'
    }, function (err, res2, body) {
        j++;
        if (j == 7) {
            scrapResearcher(response);
        }
    })

    request({
        header: {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://localhost:2000/api/wipeThesis',
        form: formData,
        method: 'POST'
    }, function (err, res2, body) {
        j++;
        if (j == 7) {
            scrapResearcher(response);
        }
    })

})

function scrapResearcher(response) {
    let form = {}
    let formData = querystring.stringify(form);

    request({
        header: {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://localhost:2000/api/insertResearcherSheet',
        method: 'GET'
    }, function (err, res2, body) {
        let r = JSON.parse(body)
        response.json({ code: "999999", message: r.message + " scraping others!!!" })
    })

}

router.get('/scrapAllData', function (request2, response) {
    var methodCode = "!!";

    request({
        header: {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://localhost:2000/api/insertResearchFundSheet',
        method: 'GET'
    }, function (err, res2, body) {
        request({
            header: {
                'User-Agent': 'Super Agent/0.0.1',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri: 'http://localhost:2000/api/insertRewardSheet',
            method: 'GET'
        }, function (err, res2, body) {
            request({
                header: {
                    'User-Agent': 'Super Agent/0.0.1',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                uri: 'http://localhost:2000/api/insertIntellectualPropertySheet',
                method: 'GET'
            }, function (err, res2, body) {
                request({
                    header: {
                        'User-Agent': 'Super Agent/0.0.1',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    uri: 'http://localhost:2000/api/insertThesisSheet',
                    method: 'GET'
                }, function (err, res2, body) {
                    request({
                        header: {
                            'User-Agent': 'Super Agent/0.0.1',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        uri: 'http://localhost:2000/api/insertTeacherTrainingSheet',
                        method: 'GET'
                    }, function (err, res2, body) {
                        request({
                            header: {
                                'User-Agent': 'Super Agent/0.0.1',
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            uri: 'http://localhost:2000/api/insertPublicationWorkSheet',
                            method: 'GET'
                        }, function (err, res2, body) {
                            //let r = JSON.parse(body)
                            response.json({ code: "999999", message: "Scraping Complete :)" })
                        })
                    })
                })
            })
        })
    })
})

module.exports = router;