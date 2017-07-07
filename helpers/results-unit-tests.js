let fs = require('fs');
var xmlToJson = require('../helpers/convert-xml-to-json');
var DOMParser = require('xmldom').DOMParser;

module.exports.getResultsUnitTestsCsharp = function (dir, username, res) {
    fs.readFile(`${dir}/${username}.xml`, (err, data) => {
        if (err) {
            return console.log("Error al leer el archivo" + err);
        }

        var xml = data.toString();
        var parser = new DOMParser();
        var xmlDOM = parser.parseFromString(xml, 'text/xml');
        var obj = xmlToJson(xmlDOM);

        var results = obj.TestRun.ResultSummary.Counters.attributes;
        var score = calculateScoreCSharp(results);
        res.status(200).json({
            statusCode: res.statusCode,
            passed: results.passed,
            total: results.total,
            completed: score
        });
    });
};

module.exports.getResultsUnitTestsJava = function(dir, res) {
    fs.readFile(`${dir}/result.xml`, (err, data) => {
        if (err) {
            return console.log("Error al leer el archivo" + err);
        }

        var xml = data.toString();
        var parser = new DOMParser();
        var xmlDOM = parser.parseFromString(xml, 'text/xml');
        var obj = xmlToJson(xmlDOM);

        var success = obj.Tests.map(x=> parseInt(x.success));
        var total = obj.Tests.map(x=> parseInt(x.total));
        var score = calculateScoreJava(success, total);
        res.status(200).json({
            statusCode: res.statusCode,
            passed: score.passed,
            total: score.total,
            completed: score.score
        });
    });
};

function calculateScoreCSharp(results) {
    var total = parseInt(results.total);
    var passed = parseInt(results.passed);
    var score;

    score = passed * 100 / total;
    return score;
}

function calculateScoreJava(success, total) {
    let successInt = 0;
    let totalInt = 0;

    success.forEach(element => {
        successInt = successInt + element;
    });

    total.forEach(element => {
        totalInt = totalInt + element;
    });

    let score = successInt * 100 / totalInt;
    return {score: score, passed: successInt, total: totalInt};
}