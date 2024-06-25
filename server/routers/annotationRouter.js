const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const annotation = require('../controller/annotation');

const {protect} = authMiddleware

const {addAnnotation, getAnnotation, addNote} = annotation;

router.post('/addAnnotation', protect, addAnnotation);
router.post('/getAnnotation', protect, getAnnotation);
router.post('/addNote', protect, addNote);

module.exports = router;
