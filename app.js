var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mydataRouter = require('./routes/mydata');

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


app.get('/data', async (req, res) => {
  try {
    const response = await axios.get('https://api.eia.gov/v2/densified-biomass/sales-and-price-by-region/data/?frequency=monthly&data[0]=average-price&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=OPlKTwIrfvaVs6g1zxv1nYuKcxeweJcXnpN8c4iz');
    const value = response.data;
    
    const customOrder = ["EAST", "SOUTH", "WEST", "US-TOTAL"];
    value.data.sort((a, b) => customOrder.indexOf(a.region) - customOrder.indexOf(b.region));

    const formattedData = {
      labels: value.data.map(item => item.region),
      values: value.data.map(item => item.average)
    };

    res.json(formattedData);

  }
  catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to get data'});
  }
});

module.exports = app;
