const express = require('express')
const router = express.Router();
const admin = require('../controller/admin');
const upload = require('../middleware/upload');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const {admin_protect} = adminAuthMiddleware



const {login, logout, listUsers, searchUser, deleteUser, getUserLibrary, createResource, downloadResource, listResources} = admin;

router.post('/login', login);
router.post('/logout', logout);
router.post('/listUsers' ,listUsers);
router.post('/searchUser', searchUser);
router.post('/deleteUser', deleteUser);
router.post('/getUserLibrary', getUserLibrary);
router.post('/createResource', upload.fields([{ name: 'cover'},{ name: 'resource_storage'}]),createResource);
router.get('/downloadResource', downloadResource);
router.get('/listResources', listResources);
module.exports = router;