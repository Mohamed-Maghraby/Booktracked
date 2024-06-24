const express = require('express');
const router = express.Router();
const loadBook = require('../controller/loadBook');
const authMiddleware = require('../middleware/authMiddleware')

const {protect} = authMiddleware


router.post('/', protect, loadBook);

module.exports = router;
