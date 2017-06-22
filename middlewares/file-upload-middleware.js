let fs = require('fs');
var xmlToJson = require('../helpers/convert-xml-to-json');
var DOMParser = require('xmldom').DOMParser;
const shelljs = require('../helpers/shell');
const mkdirp = require('mkdirp');

function getResultsUnitTestsCsharp(dir, username, res) {
    fs.readFile(`${dir}/${username}.xml`, (err, data) => {
        if (err) {
            return console.log("Error al leer el archivo" + err);
        }

        var xml = data.toString();
        var parser = new DOMParser();
        var xmlDOM = parser.parseFromString(xml, 'text/xml');
        var obj = xmlToJson(xmlDOM);

        var results = obj.TestRun.ResultSummary.Counters.attributes;
        var score = calculateScore(results);
        res.status(200).json({
            statusCode: res.statusCode,
            completed: score
        })
    });
}

function calculateScore(results) {
    var total = parseInt(results.total);
    var passed = parseInt(results.passed);
    var score;

    score = passed * 100 / total;
    return score;
}

module.exports.getLocalDateTime = function () {
    var date = new Date();
    var dateTime = `${date.toLocaleDateString()}_${date.toLocaleTimeString()}`
    return dateTime.split(':').join('-');
};

module.exports.createFolder = function (dir) {
    mkdirp(dir, function (err) {
        if (err) {
            return console.log('Oo´ps: ' + err);
        }
        return true;
    });
};

module.exports.getResults = function (processedFile, uploadDir, titleChallenge, username, language, res) {
    if (language === 'Java') {
        shelljs.runUnitTestJava(processedFile, uploadDir);
        res.send({msg: 'completo'});
    } else if (language === 'C#') {
        shelljs.runUnitTestCsharp(processedFile, titleChallenge, uploadDir, username);
        getResultsUnitTestsCsharp(uploadDir,username, res);
    } else {
        res.status(400).json({
            statusCode: res.statusCode,
            msg: "Se esperaba un nombre de lenguaje de programacion valido, intenta con 'Java' o 'C#' "
        });
    }
};