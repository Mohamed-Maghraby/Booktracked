const express = require('express')
const router = express.Router();
const user = require('../controller/user');



const {login, register, logout} = user;

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;