const shelljs = require('../helpers/shell');
const resultsHelper = require('../helpers/results-unit-tests');

module.exports.getResults = function (processedFile, uploadDir, titleChallenge, username, language, res) {
    if (language === 'Java') {
        shelljs.runUnitTestJava(processedFile.name, titleChallenge, uploadDir);
        resultsHelper.getResultsUnitTestsJava(uploadDir, res);
    } else if (language === 'C#') {
        shelljs.runUnitTestCsharp(processedFile, titleChallenge, uploadDir, username);
        resultsHelper.getResultsUnitTestsCsharp(uploadDir,username, res);
    } else {
        res.status(400).json({
            statusCode: res.statusCode,
            msg: "Se esperaba un nombre de lenguaje de programacion valido, intenta con 'Java' o 'C#' "
        });
    }
};