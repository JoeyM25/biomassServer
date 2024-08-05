var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios');

// var request = require('request');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mydataRouter = require('./routes/mydata');
var priceByRegionRouter = require('./routes/priceByRegion')
var QandAPofDBRouter = require('./routes/QandAPofDB')
var moForestResiduesRouter = require('./routes/missouriForestResidues')
var iaForestResiduesRouter = require('./routes/iowaForestResidues')
var ksForestResiduesRouter = require('./routes/kansasForestResidues')
var testRouter = require('./routes/testOneTemplateThing')
var arforestResiduesRouter = require('./routes/arkansasForestResidues')
var alForestResiduesRouter = require('./routes/alabamaForestResidues')
var akForestResiduesRouter = require('./routes/alaskaForestResidues')
var azForestResiduesRouter = require('./routes/arizonaForestResidues')
var caForestResiduesRouter = require('./routes/californiaForestResidues')
var coForestResiduesRouter = require('./routes/coloradoForestResidues')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mydata', mydataRouter);
app.use('/priceByRegion', priceByRegionRouter)
app.use('/QandAPofDB', QandAPofDBRouter)
app.use('/missouriForestResidues', moForestResiduesRouter)
app.use('/iowaForestResidues', iaForestResiduesRouter)
app.use('/kansasForestResidues', ksForestResiduesRouter)
app.use('/test', testRouter)
app.use('/arkansasForestResidues', arforestResiduesRouter)
app.use('/alabamaForestResidues', alForestResiduesRouter)
app.use('/alaskaForestResidues', akForestResiduesRouter)
app.use('/arizonaForestResidues', azForestResiduesRouter)
app.use('/californiaForestResidues', caForestResiduesRouter)
app.use('/coloradoForestResidues', coForestResiduesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
