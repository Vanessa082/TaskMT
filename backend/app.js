import createError from 'http-errors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';

dotenv.config();
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/auth', authRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log("\n", { err }, "\n")

  // render the error page
  res.status(err.status || 500);
  res.send({error : err});
});

export default app;