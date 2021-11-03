var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var listRouter = require("./routes/list");
var filesRouter = require("./routes/files");
var commentsRouter = require("./routes/comments");

var sessions = require("express-session");
var mysqlSession = require("express-mysql-session")(sessions);

var app = express();

var mysqlSessionStore = new mysqlSession(
  {
    /* using default options */
  },
  require("./conf/database")
);

app.use(
  sessions({
    key: "csid",
    secret: "this is a secret for csc648 team01",
    store: mysqlSessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24
    }
  })
);

const corsConfig = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/list", listRouter);
app.use("/files", filesRouter);
app.use("/comments", commentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  return res.status(err.status || 500).send({ err_message: err });
});

module.exports = app;
