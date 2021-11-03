var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var urlShorterRouter = require('./routers/urlshorten');
var collectionRouter = require('./routers/collections');
var categoriesRouter = require('./routers/categories');
var productsRouter = require('./routers/products');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res)=>{
	console.log("matches")
	return res.status(200).send("<h1>Im working</h1>")
})
app.use('/url', urlShorterRouter);
app.use('/collections', collectionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
  });

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-access-token,X-Key');
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});


module.exports = app;