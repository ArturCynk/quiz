const express = require('express');
const { validateRegister } = require('../validation/register');
const { validateLogin } = require('../validation/login');
const { register, activate, login, resetPassword, resetPasswordToken } = require('../controllers/auth');

const routesAuth = express.Router();

routesAuth.post('/api/register',validateRegister,register);
routesAuth.post('/api/login',validateLogin,login);
routesAuth.post('/api/activate/:token',activate);


module.exports = routesAuth;