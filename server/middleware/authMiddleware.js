const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {

  console.log(req.cookies.user_token);

  let user_token = req.cookies.user_token
  
  if (user_token) {
    try {
      // Verify token
      const decoded = jwt.verify(user_token, process.env.JWT_SECRET_KEY)

      // Get user from the token & attach the user id to the req for the next function
      req.user_id = await decoded.id

      next()
    } catch (error) {
      // console.log(error)
      res.status(401).json("Not authorized")
      throw new Error('Not authorized')
    }
  }

  if (!user_token) {
    res.status(401).json("No token")
    throw new Error('Not authorized, no token')
  }
})

module.exports = {protect}