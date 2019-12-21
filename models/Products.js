const db = require('../db');

module.exports = db.defineModel('prodctus', {
    prodctusId: db.ID,
    url: db.STRING(200),
    title: db.STRING(100),
    note: db.STRING(200)
});