import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import Config from './config';
import connectDB from './db';
import pricesRouter from './routes/prices';
import './schedule'

const app = new Koa();

connectDB(Config.MONGODB_URI);

app.use(async ctx => {
  ctx.body = 'Hello Vercel, Hi Koa2 666';
});

app
  .use(cors())
  .use(bodyParser())
  .use(pricesRouter.routes())

app.listen(Config.PORT, () => {
  console.log(`server starts successful: http://localhost:${Config.PORT}`);
});
