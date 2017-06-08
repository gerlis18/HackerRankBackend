const router = require('express').Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const auth = require('../middlewares/auth');
const mkdirp = require('mkdirp');

router.route('/image')
    .post((req, res, next) => {

        var form = new formidable.IncomingForm();

        form.keepExtensions = true;

        form.multiples = true;

        form.uploadDir = path.join(__dirname, '../public/uploads/avatars/');

        /*form.on('field', function (name, value) {
            console.log('name: '+name+'value: '+value);
            if (name == "field") {
                form.uploadDir = path.join(__dirname, '../public/uploads/avatars/');
                mkdirp(form.uploadDir, function (err) {
                    if (err) console.error(err)
                    else console.log('pow!')
                });
            }
        })*/

        form.on('file', function (name, file) {
            console.log('file: ' + name);
            fs.rename(file.path, path.join(form.uploadDir, file.name));
            console.log(file.toJSON());
        });

        form.on('error', function (err) {
            console.log('An error has occured: \n' + err);
        });

        form.on('end', function () {
            res.end('success');
        });

        form.parse(req);
    });

router.route('/file')
    .post((req, res, next) => {
        var form = new formidable.IncomingForm();

        form.keepExtensions = true;

        form.multiples = true;

        form.uploadDir = path.join(__dirname, '../uploads/files/');

        form.on('field', function (name, value) {
            console.log('name: ' + name + 'value: ' + value);
            if (name === 'titulo') {
                form.uploadDir = path.join(__dirname, '../uploads/files/'+value);
                mkdirp(form.uploadDir, function (err) {
                    if (err) {
                        return console.log('Oo´ps: '+ err);
                    }

                    console.log('!Exito');
                });
            }
        })

        form.on('file', function (name, file) {
            console.log('file: ' + name);
            fs.rename(file.path, path.join(form.uploadDir, file.name));
            console.log(file.toJSON());
        });

        form.on('error', function (err) {
            console.log('An error has occured: \n' + err);
        });

        form.on('end', function () {
            res.end('success');
        });

        form.parse(req);
    });

module.exports = router;