const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

let FeelSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    felling: Number,
    symptom: Number,
    workinghours: Number, 
    sleepinghours: Number,
    created:{
        type : Date,
        default: Date.now
    }
});

// Export the model
module.exports = mongoose.model('Feel', FeelSchema, 'feel');