const express = require('express')
const router = express.Router()
const readBook = require('../controller/readBook')
const searchMiddleWare = require('../middleware/authMiddleware')

const {protect} = searchMiddleWare

router.get('/', protect, readBook)

module.exports = router;
