const cheerio = require('cheerio')
const charset = require('superagent-charset')
const superagent = charset(require('superagent'))

const model = require('./model') // 导入表
let Products = model.Products;

const getHtml =  async (ctx, next) => {
    console.log(Products)
    let objects = []
    let url = 'http://shop.bytravel.cn/produce/index226.html'
    let arr = await superagent.get(url)
        .charset('gb2312')  // 当前页面编码格式
        .buffer(true)
        .then((data) => { //页面获取到的数据
            // console.log(data.text)
            let html = data.text,
                $ = cheerio.load(html, {
                    decodeEntities: false,
                    ignoreWhitespace: false,
                    xmlMode: false,
                    lowerCaseTags: false
                }); //用cheerio解析页面数据
            $("table tbody").each((index, element) => { // cheerio的使用类似jquery的操作
                let $element = $(element);
                $element.find('#tctitle').next().find('a').addClass('link').attr('class', 'link').text('')
                objects.push({
                    'title': $element.find('a.blue14b').text(),
                    'image': $element.find('#bright img').attr('src'),
                    'summary': $element.find('#tctitle').next().text(),
                    'is_cgiia': $element.find('#tctitle font').attr('color') === 'green' ? 1 : 0
                })
            })
            return objects
        }).catch(err => {
            console.log(err.response.status)
        })
        let data = ''
        try {
            arr.forEach(element => {
                data = 'prd' + new Date().getTime()
                Products.create({
                    prodctusId: data ,
                    url: element.image,
                    title: element.title,
                    note: element.summary
                })
            }); 
        } catch(e) {
            console.log(e)
        }
}

module.exports = function (){
    getHtml()
}