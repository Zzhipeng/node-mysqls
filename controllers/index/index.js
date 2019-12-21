const model = require('../../model') // 导入表
let Products = model.Products;

const index = async (ctx, next) => {
    let code = 200, result = '查询成功', objects = [], swipers = [], hots = []
    try {
        objects = await Products.findAll({
            
        })
        swipers = await Products.findAll(
            { 
                limit: 3 
            }
        )
        hots = await Products.findAll(
            { 
                limit: 3,
                offset: 5
            }
        )
    } catch (e) {
        console.log(e)
    }
    ctx.response.type = 'application/json'; // 设置Content-Type:
    ctx.response.body = { // 设置Response Body:
        data: {
            recList: objects,
            flashList: swipers,
            hotList: hots
        },
        message: result,
        code: code
    };
}
module.exports = {
    'GET /api/index/productList': index
}