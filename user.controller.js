var mongoose = require('mongoose');
const User = require('../model/user');
const moment= require('moment')  

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//create
module.exports.user_create = function (req, res) {
    console.log(req.body)
    
    const user = new User(
        {
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            email: req.body.email,
            password :req.body.password,
            birthday: new Date(req.body.year, req.body.month - 1, req.body.day)
        }
    );
    // if(req.body.year != null){
    //     user.created = new Date(req.body.year, req.body.month - 1, req.body.day, req.body.hour, req.body.minute)
    // }
    //console.log('them dl co name="', req.body.name);
    user.save(function (err) {
        if (err) throw err;
        res.send('User Created successfully')
    })
};

//read
exports.user_details = function (req, res) {
    console.log("userid: " + req.body.userid);
    User.findById(
    {
        _id : req.body.userid
    }, function (err, user) {
        if (err) return next(err);
        // var showUser = {
        //     _id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     password :user.password,
        //     profilePicture: user.profilePicture,
        //     created: moment(user.created).format('LLL'),
        //     job: user.job,
        //     home: user.home,
        //     gender: user.gender,
        //     birthday: moment(user.birthday).format('LLL'),
        //     maxim: user.maxim
        // }

        console.log("user : " , user);
    
        res.status(200).send(user);
    })
};

//update - chưa doi trong database
exports.user_update = function (req, res, next) {  
    console.log("user updated");
    console.log("user updated " +  req.body)
    User.findByIdAndUpdate(
        {
            _id : req.body.userid
        },  
        {
            $set: req.body
        }, 
        function (err, user) {
            if (err){
                console.log(err);
                return res.status(404).send('user updated fail.' + err);
            }
            else {
                console.log("update thanh cong" +user);
                return res.status(200).send('user updated.');
            }
    });
};
exports.changePassword = function (req, res, next) {  
    User.findOneAndUpdate(
        {
            email : res.locals.email
        },
        {
            $set: {
                password: res.locals.password        
            }
        }, 
        function (err, user) {
            if (err) return next(err);
            res.status(200).send('user updated.');
    });
};


//delete
exports.user_delete = function (req, res) {
    User.findByIdAndRemove( 
        {
            _id : res.body.userid
        }, function (err) {
            if (err) return next(err);
            res.send('Deleted successfully!');
        }
    )
};




