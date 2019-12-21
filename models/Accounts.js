const db = require('../db');

module.exports = db.defineModel('accounts', {
    userId: db.ID,
    money: db.BIGINT(10),
    gold: db.BIGINT(10),
    grade: db.BIGINT(10)
});