/*<!--
2018/12/20
create by Misaka11
参考ashshen的后端代码
-->*/
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const path = require('path');
const compression = require('compression');

// routers
const articleRouter = require('./article/articleApi');
const userRouter = require('./user/userApi');

//
app.use(compression());

// server static files
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// set json header
app.use(function(req, res, next) {
  res.contentType('application/json');
  next();
});

// web router config
app.use('/api/article', articleRouter);
app.use('/api/user',userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(JSON.stringify(req.cookies));
  const err = new Error('Not Found');
  err.status = 404;
  res.status(404);
  next(err);
});

process.on('uncaughtException', function(e) {
  console.error('node server uncaughtException:', e);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.error('uncatch error:' + err);
    res.status(err.status || 500).send({
      errorInfo: err.message,
      result: 1
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.error('uncatch error:' + err);
  res.status(err.status || 500);
  res.send({
    errorInfo: err.message,
    result: 1
  });
});

const port = 4396;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
