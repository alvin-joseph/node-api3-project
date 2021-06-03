const User = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  // const date = new Date();
  // console.log(`
  //   REQUEST METHOD: ${req.method}
  //   REQUEST URL: ${req.originalUrl}
  //   TIMESTAMP: ${date.toLocaleString()}
  // `);
  console.log(`[${new Date().toLocaleString()}] [${req.method}] ${req.path}`)
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
//another way
// async function validateUserId(req, res, next) {
//   try{
//     const user = await User.getById(req.params.id)
//     if(!user) {
//       res.status(404).json({
//         message: 'no such user'
//       })
//     } else {
//       req.user = user
//       next()
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: 'problem finding user'
//     })
//   }
// }

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
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  //!req.body || Object.keys(req.body).length === 0
  const { text } = req.body
  if (
    !text ||
    typeof text !== 'string' ||
    text.trim().length <= 2
  ) {
    next({
      message: "missing required text field",
      status: 400
    })
  } else {
    req.text = text.trim()
    next()
  }
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