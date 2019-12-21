const model = require('./model')

model.sync.then(() => {
    console.log('init db ok.'); 
    // process.exit(0);
}).catch((e) => { 
    console.log(`failed:${e}`); 
    process.exit(0); 
});
// model.sync();
// console.log('init db ok.'); //运行没有生成表,异步没有执行完成就退出了
// process.exit(0);