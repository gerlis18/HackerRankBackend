var acl = require('acl');
const mongoose = require('mongoose');

acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));

module.exports = acl;