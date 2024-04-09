var createError = require('http-errors');
var express = require('express');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compress = require('compression');
const cors = require('cors');
const fileUpload = require('express-fileupload');

var app = express();
app.disable("x-powered-by");

passport.initialize();
passport.session();

const corsOptions = {
	origin: [
		'https://ginoking-memory-v1-client-qkusmmamqq-de.a.run.app',
		'http://localhost:7070',
	],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
	allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compress());
app.use(cookieParser());
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(fileUpload({
	useTempFiles: true,
	createParentPath: true,
}));

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

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

	console.log(err);

	// render the error page
	res.status(err.status || 500);
	res.json(err);
});

// app.use(Storage(process.env.memoryStorageSecret));
app.locals.bucket = "memory-image";

module.exports = app;
