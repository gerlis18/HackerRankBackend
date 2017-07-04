var shell = require('shelljs');

module.exports.runUnitTestJava = function (file, uploadDir) {
    shell.exec(`%JAVA_HOME%/bin/java -classpath C:/Users/Galvarez/Desktop/EjecutarPorLineaComandos/sumaTest/junit.jar;C:/Users/Galvarez/Desktop/EjecutarPorLineaComandos/sumaTest/suma2.jar;C:/Users/Galvarez/Desktop/EjecutarPorLineaComandos/sumaTest/sumaTest.jar;C:/Users/Galvarez/Desktop/EjecutarPorLineaComandos/sumaTest/org.hamcrest.core.jar org.junit.runner.JUnitCore sumaTest.ISumaTest >> ${uploadDir}/output.xml`);
};

module.exports.runUnitTestCsharp = function (file, tittleChallenge, uploadDir, username) {
    shell.exec(`cp C:/Users/Galvarez/Desktop/maratonIG/uploads/unitTests/${tittleChallenge}/*.dll ${uploadDir}`);

    shell.cd('C:/Program Files (x86)/Microsoft Visual Studio 14.0/Common7/IDE');

    shell.exec(`MSTest.exe /testcontainer:${uploadDir}/${tittleChallenge}.dll /resultsfile:${uploadDir}/${username}.xml`);
};