const mkdirp = require('mkdirp');

module.exports.getLocalDateTime = function () {
    var date = new Date();
    var dateTime = `${date.toLocaleDateString()}_${date.toLocaleTimeString()}`;
    return dateTime.split(':').join('-');
};

module.exports.createFolder = function (dir) {
    mkdirp(dir, function (err) {
        if (err) {
            return console.log('Oo´ps: Error al crear el folder' + err);
        }
        return true;
    });
};