const express = require('express')
const router = express.Router()
const search = require('../controller/search')
const searchMiddleWare = require('../middleware/searchMiddleWare')

const {protect} = searchMiddleWare

router.get('/', protect, search)

module.exports = router;

