/**
 * Created by tkasa on 13/02/2018.
 */
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReviewSchema = new Schema({

        rating: Number,
        description: String,
        created: {
                    type: Date,
                    default: Date.now
                },


    builder_id:{
        type: Schema.Types.ObjectId, //String,
        ref: 'Builder'
        //default: null //if !null then its a review
    },
    author_id:{
        type:Schema.Types.ObjectId,
        ref:'Customer'
    }
});


ReviewSchema.pre('save', function (next) {
    author_id  = Review(this.author_id); //slygify in the video
    next();
});

function post(text){
    return text.toString().toLowerCase()
        .replace(/\s+/g,'-') //replace spaces with -
        .replace(/[^(\w\-]+/g,'') //remove all non world chars
        .replace(/^-+/,'') //trim start of text
        .replace(/-+$/,''); // trim end of text
}

/*
 ReviewSchema.post('save', function (next) {
 var count = 0;
 var all = ++this.rating;
 var average = all/count;
 for(let i = 0; i < this.review.length; i++){
 count++;
 }
 return average;
 });
 */
ReviewSchema.methods.getReview = function () {
    return Review.find({reviewId: this._id});

};

var Review = module.exports = mongoose.model('Review', ReviewSchema);