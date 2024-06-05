const express = require('express');
const { verifyUserAndSession } = require('../middleware/verifyUserAndSession');
const { getSettings, putSettings } = require('../controllers/user');

const routesUser = express.Router();

routesUser.get('/api/user/settings',verifyUserAndSession,getSettings)
routesUser.put('/api/user/settings',putSettings)

module.exports = routesUser;