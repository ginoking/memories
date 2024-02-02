var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(fileUpload({
	createParentPath: true,
}));
app.use(cors({
	origin: 'https://ginoking-memory-v1-client-qkusmmamqq-de.a.run.app/'
}));

app.use('/', cors({
	origin: 'https://ginoking-memory-v1-client-qkusmmamqq-de.a.run.app/'
}), indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
	res.send("Sorry can't find that!")
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.locals.bucket = "memory-image";

module.exports = app;
