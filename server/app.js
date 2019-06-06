const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path');
const cors = require('koa2-cors');
const config = require('./config');
const initDB = require('./db');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');

const app = new Koa();

app
  .use(cors())
  .use(bodyParser())
  .use(userRouter.routes())
  .use(todoRouter.routes())
  .use(static(path.resolve(__dirname, '../build')));

app.listen(config.PORT, () => {
  console.log(
    '------Server is running on: http://localhost:%s------',
    config.PORT
  );
});

initDB(config.DB_URL);
