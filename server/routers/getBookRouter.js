const express = require('express');
const router = express.Router();
const getBook = require('../controller/getBook');
const authMiddleware = require('../middleware/authMiddleware')

const {protect} = authMiddleware


router.post('/', protect, getBook);

module.exports = router;
