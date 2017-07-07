var shell = require('shelljs');
var multipleClasses = require('./multiple-classes-java');

module.exports.runUnitTestJava = function (file, tittleChallenge, uploadDir) {
    let localDir = uploadDir.replace(/\\/g, '/');

    shell.exec(`cp C:/Users/Galvarez/Desktop/maratonIG/uploads/unitTests/java/*.jar ${uploadDir}`);

    shell.exec(`cp C:/Users/Galvarez/Desktop/maratonIG/uploads/unitTests/Intergrupo.Algoritmos.${tittleChallenge}.Tests/*.jar ${uploadDir}`);
    
    shell.cd(`${localDir}`);

    shell.exec(`%JAVA_HOME%/bin/java -classpath runJunit.jar;${file};Intergrupo.Algoritmos.${tittleChallenge}.Tests.jar org.eclipse.jdt.internal.jarinjarloader.JarRsrcLoader ${multipleClasses(tittleChallenge)}`);
};

module.exports.runUnitTestCsharp = function (file, tittleChallenge, uploadDir, username) {
    shell.exec(`cp C:/Users/Galvarez/Desktop/maratonIG/uploads/unitTests/Intergrupo.Algoritmos.${tittleChallenge}.Tests/*.dll ${uploadDir}`);

    shell.cd('C:/Program Files (x86)/Microsoft Visual Studio 14.0/Common7/IDE');

    shell.exec(`MSTest.exe /testcontainer:${uploadDir}/${tittleChallenge}.dll /resultsfile:${uploadDir}/${username}.xml`);
};