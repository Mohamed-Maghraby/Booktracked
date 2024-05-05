const express = require('express');
const router = express.Router();
const addBook = require('../controller/addBook');
const authMiddleware = require('../middleware/authMiddleware')

const {protect} = authMiddleware



router.post('/', protect, addBook);

module.exports = router;
