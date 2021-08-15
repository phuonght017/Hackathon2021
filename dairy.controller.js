var mongoose = require('mongoose');
const Dairy = require('../model/dairy');
const Feel = require('../model/feel');
const moment= require('moment')  

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//create
module.exports.dairy_create = function (req, res) {
    console.log(req.body)
    
    const dairy = new Dairy(
        {
            _id: new mongoose.Types.ObjectId,
            userid: req.body.userid,
            dayStart: new Date(req.body.yearS, req.body.monthS - 1, req.body.dayS)
            // dayEnd : new Date(req.body.yearE, req.body.monthE - 1, req.body.dayE)
        }
    );
    dairy.save(function (err) {
        if (err) throw err;
        res.send('dairy Created successfully')
    })
};

//read all dairy
exports.dairy_all = function (req, res) {
    console.log("userid: " + req.body.userid);
    Dairy.find(
        {
            userid : req.body.userid
        }, function (err, dairy) {
        if (err) throw err;

        console.log("dairy : " , dairy);
        res.status(200).send(dairy);
    })
};

//get the last one
exports.dairy_newest = function(req, res){
    Dairy.findOne(
        {
            userid : req.body.userid
        }
    ).sort({created_at : -1}).exec(function(err, dairy){
        if(err) throw err;
        console.log(dairy.dayStart);
        res.status(200).send(dairy.dayStart);
    });
}

//add feel
exports.dairy_addfeel = function(req, res){
    const feel = new Feel(
        {
            _id: new mongoose.Types.ObjectId,
            userid: req.body.userid,
            felling: req.body.felling,
            symptom: req.body.symptom,
            workinghours: req.body.workinghours, 
            sleepinghours: req.body.sleepinghours
        }
    );
    feel.save(function (err) {
        if (err) throw err;
        res.send('Feel created successfully')
    })
}