const defaultConfig = './config-default' // 默认
const overrideConfig = './config-onerride' // 备用数据库
const testConfig = './config-default' // 测试数据库

const fs = require('fs')
let config = null

if(process.env.NODE_ENV === 'test') {
    console.log(`load ${testConfig}`)
    config = require(testConfig)
} else {
    console.log(`load ${defaultConfig}`)
    config = require(defaultConfig)
    try {
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`load ${overrideConfig}`)
            config = require(overrideConfig)
        }
    } catch (e) {
        console.log(`Connot find ${overrideConfig}.`)
    }
}
module.exports = config