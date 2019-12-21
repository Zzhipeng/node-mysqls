const db = require('../db');

module.exports = db.defineModel('user', {
    userId: db.ID,
    account: db.INTEGER(20),
    password: db.STRING(30),
    name: db.STRING(20)
});