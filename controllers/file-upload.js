const router = require('express').Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const fileUploadMiddleware = require('../middlewares/file-upload-middleware');

router.route('/image')
    .post((req, res) => {

        var userid;
        var finalName;
        var form = new formidable.IncomingForm();

        form.keepExtensions = true;

        form.multiples = true;

        form.uploadDir = path.join(__dirname, '../uploads/avatars/');

        form.on('field', function (name, value) {

            if (!fs.existsSync(form.uploadDir)) {
                fileUploadMiddleware.createFolder(form.uploadDir);
            }
            console.log('name: ' + name + 'value: ' + value);
            if (name === "_id") {
                userid = value;
            }
        });

        form.on('file', function (name, file) {
            console.log('file: ' + name);
            finalName = `${userid}.${file.type.split('/')[1]}`;
            fs.rename(file.path, path.join(form.uploadDir, finalName));
            console.log(file.toJSON());
        });

        form.on('error', function (err) {
            console.log('An error has occured: \n' + err);
        });

        form.on('end', function () {
            res.status(200).json({
                name: finalName
            });
        });

        form.parse(req);
    });

router.route('/file')
    .post((req, res) => {
        var form = new formidable.IncomingForm();

        form.keepExtensions = true;

        form.multiples = true;

        form.uploadDir = path.join(__dirname, '../uploads/files/');

        form.on('field', function (name, value) {
            if (!fs.existsSync(form.uploadDir)) {
                fileUploadMiddleware.createFolder(form.uploadDir);
            }
            console.log('name: ' + name + 'value: ' + value);
            if (name === 'titulo') {
                form.uploadDir = path.join(__dirname, '../uploads/files/' + value);
                fileUploadMiddleware.createFolder(form.uploadDir);
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

router.route('/execfile')
    .post((req, res) => {
        var form = new formidable.IncomingForm();
        var language = '';
        var username;
        var processedFile;
        var titleChallenge;
        form.keepExtensions = true;

        form.multiples = true;

        form.uploadDir = path.join(__dirname, '../uploads/solutions/');

        form.on('field', function (key, value) {

            if (!fs.existsSync(form.uploadDir)) {
                fileUploadMiddleware.createFolder(form.uploadDir);
            }
            console.log('name: ' + key + 'value: ' + value);
            if (key === 'username') {
                form.uploadDir = path.join(__dirname, '../uploads/solutions/' + value);
                fileUploadMiddleware.createFolder(form.uploadDir);
                username = value;
            }

            if (value === 'Java' || value === 'C#') {
                form.uploadDir = path.join(__dirname, `../uploads/solutions/${username}/${value}`);
                fileUploadMiddleware.createFolder(form.uploadDir);
                language = value;
            }

            if (key === 'titleChallenge') {
                titleChallenge = value;
            }
        });

        form.on('file', function (name, file) {
            form.uploadDir = path.join(__dirname, `../uploads/solutions/${username}/${language}/${fileUploadMiddleware.getLocalDateTime()}`);
            fileUploadMiddleware.createFolder(form.uploadDir);
            console.log('file: ' + name);
            fs.rename(file.path, path.join(form.uploadDir, file.name));
            processedFile = file;
        });

        form.on('error', function (err) {
            console.log('An error has occured: \n' + err);
        });

        form.on('end', function () {
            fileUploadMiddleware.getResults(processedFile, form.uploadDir, titleChallenge, username, language, res);
        });

        form.parse(req);
    });

module.exports = router;