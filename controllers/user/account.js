const isObject = require('../../appliance/index') // 对比前后端的值
const model = require('../../model') // 导入表
let User = model.User, Accounts = model.Accounts

const register = async (ctx, next) => {
    let code = 200, result = '注册成功', objects = []
    let body = ctx.request.body, userId = new Date().getTime().toString()
    try {
        User.create({
            userId: userId,
            account: body.telephone,
            password: body.password,
            name: body.nickname
        })
        Accounts.create({
            userId: userId,
            money: 0,
            gold: 0,
            grade: 0
        })
        code = 200, result = '注册成功'
    } catch (e) {
        code = 10001, result = '注册失败'
        console.log(e)
    }
    ctx.response.type = 'application/json'; // 设置Content-Type:
    ctx.response.body = { // 设置Response Body:
        data: objects,
        message: result,
        code: code
    };
}

const login = async (ctx, next) => {
    let code = 200, result = '成功', objects = [], accountTag = {}, results = {}
    let body = ctx.request.body
    try {
        objects = await User.findAll({
            where: {
                name: body.telephone
            }
        })
    } catch (e) {
        console.log(e)
    }
    if (!objects.length) {
        result = '用户名不存在', code = 10001
    } else {
        const { name, password, userId } = objects[0]
            accountTag = { telephone: name, password: password }
            results = { authcode: userId}
        const checkString = isObject.isObjectValueEqual(accountTag, body)
        if (checkString) {
            code = 10001
            switch (checkString) {
                case 'username':
                    result = '用户名错误'
                    break;
                case 'password':
                    result = '密码错误'
                    break;
                default:
                    break;
            }
        } else {
            // 验证码
            // if(!authCode) {
            //     result = '验证码失效', code = 10001
            // } else {
            //     if (authCode.toLowerCase() !== data.imageCode.toLowerCase()) {
            //         result = '验证码错误', code = 10001
            //     } else {
            //         result = '登陆成功', code = 200
            //     }
            // }
        }
    }
    ctx.response.type = 'application/json'; // 设置Content-Type:
    ctx.response.body = { // 设置Response Body:
        data: results,
        message: result,
        code: code
    };
}

const getLogin = async (ctx, next) => {
    let code = 200, result = '查询成功', objects = []
    let body = ctx.query
    try {
        // User.hasMany(Accounts, {foreignKey: 'userId', targetKey: 'userId'})
        Accounts.belongsTo(User, {foreignKey: 'userId', targetKey: 'userId'})
        objects = await Accounts.findAll({
            include: [{
                model: User,
                'where': {
                    userId: body.authcode
                },
                attributes: { exclude: ['version', 'updatedAt', 'password','createdAt'] } // 过滤属性
            }]
        })
    } catch (e) {
        console.log(e)
    }
    ctx.response.type = 'application/json'; // 设置Content-Type:
    ctx.response.body = { // 设置Response Body:
        data: objects[0],
        message: result,
        code: code
    };
}

module.exports = {
    'POST /api/register/account': register,
    'POST /api/register/login': login,
    'GET /api/register/login': getLogin
}