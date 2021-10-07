const express = require('express')
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport')
require('dotenv').config

const database = require('./config/database');
const TodoRouter = require('./routers/task.js');
const TaskInfo = require('./routers/taskinfo.js');
const UserRouter = require('./routers/user.js');

//constants
const PORT = process.env.PORT || 5000;
const CONECTION_URL = "mongodb://localhost:27017/todo";

const app = express();
app.set('view-engine', 'ejs');

//Middlewares
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(flash())
app.use(session({
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', TodoRouter)
app.use('/api', TaskInfo)
app.use('/api', UserRouter)

//connection
database.authenticate()
    .then(app.listen(PORT, () => console.log(`Connected to DB, app running on http://localhost:${PORT}/api`)))
    .catch(err => console.error(err))