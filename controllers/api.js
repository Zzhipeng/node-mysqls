
const index = require('./index/index');
const user = require('./user/account');

module.exports = {
    ...index,
    ...user
}