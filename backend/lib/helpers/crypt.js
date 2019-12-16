'use strict';

const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.encrypt = async data => await bcrypt.hash(data, saltRounds);
exports.compare = async (data, hash) => await bcrypt.compare(data, hash);
