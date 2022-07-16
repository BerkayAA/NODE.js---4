const { json } = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routers/tourRouters');
const userRouter = require('./routers/userRouter');

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

//* enviromental variable usage
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//* because of in real senario we do not use files for data manipulations we do not write and delete all off this user
//* data based operations to the files

//? app.get('/api/v1/tours',getAllTours);
//? app.post('/api/v1/tours', saveTour);

//* app.get('/api/v1/tours/:id',getTour);
//* app.patch('/api/v1/tours/:id',patchTour);
//* app.delete('/api/v1/tours/:id',deleteTour);

// app.route('/api/v1/tours').get(getAllTours).post(saveTour);
// app.route('/api/v1/tours/:id').get(getTour).patch(patchTour).delete(deleteTour);

// app.route('/api/v1/users').get(getAllUsers).post(createUser);
// app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

//* a lot more professional usage
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
