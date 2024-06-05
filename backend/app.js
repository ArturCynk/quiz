const express = require('express');
const connectDB = require('./db/connect');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const routerSesion = require('./routes/session');
const routesAuth = require('./routes/auth');
const routesAdmin = require('./routes/admin');
const routesUser = require('./routes/user');
const app = express()
const port = 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use(routesAuth);
app.use(routesAdmin);
app.use(routerSesion);
app.use(routesUser);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))