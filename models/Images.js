const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/BC', { //, {useMongoClient: true}); was added
    useMongoClient: true
});

var ImagesSchema = new mongoose.Schema({
    name: String,
    img: Buffer,
    updated: {
        type: Date,
        default: Date.now
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Builder',
        required: true
    },
   // categories:[{type: Schema.Types.ObjectId, ref:'Category'}]
});

var Image = module.exports = mongoose.model('Image', ImagesSchema);
