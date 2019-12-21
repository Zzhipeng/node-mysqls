
// process.on('unhandledRejection', (reason, p) => {
// console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
// // application specific logging, throwing an error, or other logic here
// });
const Koa = require('koa');
const cors = require('koa2-cors');

//抓取数据
// const getHtml = require('./cheerio');
// getHtml()

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

// 签名需要设置 key
app.keys = ["localhost:8099"];

app.use(cors({
    origin: function(ctx) {
      if (ctx.url === '/test') {
        return '*';
      }
      return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }));
// parse request body:
app.use(bodyParser());

// add controller:
app.use(controller());


app.listen(3010);
console.log('app started at port 3010...');