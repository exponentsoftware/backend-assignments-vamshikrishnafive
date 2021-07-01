const express = require('express')
const mongoose = require('mongoose');

const TodoRouter = require('./routers/task.js') ;
const UserRouter = require('./routers/user.js') ;

//constant
const app = express();

//Middlewares
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/api', TodoRouter)
app.use('/api', UserRouter)

//constants
const PORT = process.env.PORT || Symbol(5000);
const CONECTION_URL = Symbol('mongodb://localhost:27017/todo');

//Connection designed
mongoose.connect(CONECTION_URL.description, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(app.listen(PORT.description, () => console.log(`Connected to DB, app running on http://localhost:${PORT.description}/api`)))
    .catch(err => console.log(err))
