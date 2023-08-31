const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

function handleOperation(req, res, next, operationFn) {
  if (!req.query.nums) {
    throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
  }

  const numsAsStrings = req.query.nums.split(',');
  const nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  const result = {
    operation: operationFn.name,
    result: operationFn(nums),
  };

  return res.send(result);
}

app.get('/mean', (req, res, next) => {
  handleOperation(req, res, next, findMean);
});

app.get('/median', (req, res, next) => {
  handleOperation(req, res, next, findMedian);
});

app.get('/mode', (req, res, next) => {
  handleOperation(req, res, next, findMode);
});

// General error handler for 404
app.use((req, res, next) => {
  const err = new ExpressError('Not Found', 404);
  return next(err);
});

// General error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err,
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log('Server starting on port 3000');
});
