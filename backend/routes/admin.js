const express = require('express');
const { getSettings, putSettings, getUsers, deleteUser, updateUser } = require('../controllers/admin');
const { verifyUserAndSession } = require('../middleware/verifyUserAndSession');

const routesAdmin = express.Router();

routesAdmin.get('/api/admin/settings/:email',getSettings);
routesAdmin.put('/api/admin/settings',putSettings);
routesAdmin.get('/api/admin/users',verifyUserAndSession,getUsers);
routesAdmin.delete('/api/admin/users/:userId',verifyUserAndSession,deleteUser)
routesAdmin.put('/api/admin/users/:userId',verifyUserAndSession,updateUser);

module.exports = routesAdmin;