// const UserModel = require("./models/user");

// exports.getUserByemail = async (email) => await UserModel.findOne({email}, 
// })

// const date = new Date();
// console.log(date)
// console.log('aoksdjaks')

const UserTaskModel = require('./models/task')
const UserModel = require('./models/user')

const moment = require('moment')
const today = moment().startOf('day')

const user = UserModel.find({
    createdAt: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate()
    }
}, (err, U) => {
    console.log(U)
})

// console.log(user)
user