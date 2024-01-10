const {User, BrowserLog} = require('../models/user.js');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
class LoginRegister{
    constructor(socket) {
        this.socket = socket;
    }
     loginHandler(){

         this.socket.on('userLogin', async loginData => {
             let errorList = [];
             let username = loginData.inputUsername;
             let password = loginData.inputPassword1;

             await User.find({name:username})
                 .then(async (result) => {
                     if (result[0].name === username) {
                         let isMatch = await bcrypt.compare(password, result[0].password)
                         if (!(isMatch)){
                             errorList.push(" Username and password does not match ")
                         }
                     }else {
                         errorList.push(" Username and password does not match ")
                     }
                     let id = result[0]['_id'];
                     if (errorList.length > 0){
                         this.socket.emit('userLoginError', errorList)
                     }else {
                         const browser = new BrowserLog({
                             name: username,
                             user_id: id,
                         })
                         console.log(browser)
                         await browser.save()
                             .then((result) => {
                                 this.socket.send(result)
                             })
                             .catch((err) => console.log(err));
                         this.socket.emit('userLoginSucces', browser['_id'])
                     }
                 })
                 .catch((err) => {
                     console.log(err)
                 })

             this.socket.emit('userLoginError', errorList)

         })
        this.socket.on('userRegister', async RegisterData => {
            console.log(RegisterData)
            let username = RegisterData.inputUsername;
            let password1 = RegisterData.inputPassword1;
            let password2 = RegisterData.inputPassword2;
            let errorList = [];
            let validChars = /^[A-Za-z0-9]+$/;

            //check if everything is filled in
            if (username && password1 && password2) {

                await User.find({name:username})
                    .then((result) => {
                        if (result.length > 0){
                            errorList.push(' username taken ')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })

                //check if username is valid length
                if (username.length > 15 || username.length <= 3) {
                    errorList.push(' username invalid length ');
                }

                //check if password is valid length
                if (password1.length > 25 || password1.length <= 8) {
                    errorList.push(' password invalid length ');
                }

                //check if user has valid characters
                if (!(username.match(validChars))) {
                    errorList.push(' username invalid characters ');
                }

                //check if password matches
                if (password1 !== password2) {
                    errorList.push(' Password does not match ');
                }
            } else {
                errorList.push(' Missing data ');
            }

            //send client errors
            if (errorList.length > 0) {
                this.socket.emit('userRegisterError', errorList)
            } else {
                let hashedPassword = await bcrypt.hash(password1, 13)
                const user = new User({
                    name: username,
                    password: hashedPassword,
                })

                await user.save()
                    .then((result) => {
                        this.socket.send(result)
                        this.socket.emit('userRegisterSucces', 'Register succes')
                    })
                    .catch((err) => console.log(err));
            }
            console.log(errorList)
        })
    }
}

module.exports.LoginRegister = LoginRegister;