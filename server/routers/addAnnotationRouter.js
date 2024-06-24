const express = require('express');
const router = express.Router();
const addAnnotation = require('../controller/addAnnotation');
const authMiddleware = require('../middleware/authMiddleware')

const {protect} = authMiddleware



router.post('/', protect, addAnnotation);

module.exports = router;
