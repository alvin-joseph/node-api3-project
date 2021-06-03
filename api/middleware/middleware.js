const User = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${new Date().toISOString()}] [${req.method}] ${req.path}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  User.getById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: "user not found"
        })
      } else {
        req.user = user
        next()
      }
    })
    .catch(next)
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
  if (
    !name ||
    typeof name !== 'string' ||
    name.trim().length <= 2
  ) {
    next({
      message: "missing required name field",
      status: 400
    })
  } else {
    req.user = { name: name.trim() }
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  // DO NOT DELETE NEXT FROM YOUR ERR HANDLING MIDDLEWARE
  console.log('err handling midd kicking in!', err.message)
  res.status(err.status || 500).json({
    custom: 'you done messed up a a ron',
    message: err.message,
    stack: err.stack,
  })
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  errorHandler,
  validateUserId,
  validateUser,
  validatePost,
}