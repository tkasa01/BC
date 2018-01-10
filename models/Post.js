const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title:{
        type:String,
        required: true,
        unique: true
    },
    text: {
        type:String,
        required: true
       },
    author:{
        type:Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);