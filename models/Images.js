const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/BC', { //, {useMongoClient: true}); was added
    useMongoClient: true
});

var ImagesSchema = new mongoose.Schema({

    name: String,
    img: {
        data: Buffer,
        type: String},
    updated: {
        type: Date,
        default: Date.now
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'builder',
        required: true
    },
    categories:[{type: Schema.Types.ObjectId, ref:'category'}]
});

module.exports = mongoose.model('Image', ImagesSchema);
