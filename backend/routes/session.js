const express = require('express');
const { createSession, closeSession, verifySession } = require('../controllers/sesion');

const routerSesion = express.Router();

routerSesion.post('/api/sessions',createSession);
routerSesion.get('/api/sessions/:sessionId',verifySession);
routerSesion.delete('/api/sessions/:sessionId',closeSession);

module.exports = routerSesion;