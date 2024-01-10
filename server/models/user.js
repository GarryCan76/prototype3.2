const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const userSchema = new Shema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports.User = User;

const browserSchema = new Shema({
    user_id: {
        type: String,
        require: true
    },
}, { timestamps: true })

const BrowserLog = mongoose.model('Browser_logins', browserSchema);
module.exports.BrowserLog = BrowserLog;