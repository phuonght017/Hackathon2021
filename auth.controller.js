var mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");

const User = require('../model/user');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Test Auth controller!');
};

exports.login = function (req, res) {
    res.send('Vao trang login');
};

exports.post_Login = function (req, res) {
    console.log("post_login", req.body.email , " pass:", req.body.password)
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }).exec(function(err, users){
        if(err) throw err
        
        //console.log(users);
        if(users){
            //var user = users[0]
            var result = {
                userId: users._id,
                name : users.name
            }
            // console.log("kq",result)
            // console.log("json", JSON.stringify(result))
            console.log("Dang nhap thanh cong")
            res.status(200).send(JSON.stringify(result));
        }else{
            console.log("Dang nhap that bai")
            res.status(404).send()
        }
    }) 
};

module.exports.post_Signin = function (req, res, next) {
    console.log(req.body)

    User.find({
        email: req.body.email
    }).exec(function(err, users){
        if(err) throw err
        if(Object.keys(users).length === 0){
            return next()
        }else{
            // console.log('User da ton tai')
            // console.log(users)
            res.status(400).send("User da ton tai")
            return next('router')
        }
    }) 
};

exports.forgetpassword = function(req, res, next){
    var email = req.body.email;
    const random = randomstring.generate(8);

	User.findOne({ 
        email : email 
    },function(err, user) {
        if(err) throw err

        if (user.length == 0) {
            res.status(404).send('User Not Found !')
        } else {
            
            //gui thu
            var transporter =  nodemailer.createTransport({ // config mail server
                service: 'Gmail',
                auth: {
                    user: 'mondidongqua@gmail.com',
                    pass: 'qua1234@'
                }
            });
            var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                from: '"Change password 👻" <mondidongqua@gmail.com>',
                to: user.email,  
                subject: 'Reset Password Request ', 
                html: `Hello ${user.name},            
                    <p>Your reset password is <b>${random}</b>. </p> 
                    <p>The password is valid for only 2 minutes.</p> </br>
        
                    <p>Thanks, </p>
                    <p>QuaQuaToDoList.</p>`
            };
            console.log("mainOptions" , mainOptions)
        
            transporter.sendMail(mainOptions, function(err, info){
                if (err) throw err
                
                console.log('Message sent: ' +  info.response);

                res.locals.email = email
                res.locals.password = random 
                next()
            });     
        }
    })
};






