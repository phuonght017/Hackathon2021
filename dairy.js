const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

let DairySchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dayStart: {
        type: Date,
        required: true
    },
    // dayEnd: {
    //     type: Date,
    //     default: Date.now
    // },
    created:{
        type : Date,
        default: Date.now
    }
});

// Export the model
module.exports = mongoose.model('Dairy', DairySchema, 'dairy');