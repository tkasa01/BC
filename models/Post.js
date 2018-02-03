const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title:{
        type:String,
        required: true,
        unique: true
    },
    content: {
        type:String,
        required: true
       },
    timestamp:{
        type: Date
    },
    update:{
        type: Date,
        default: Date.now()
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'Customer',  //from customer collection
        required: true
    },
    builder:{
        type: String,
        default: null //if !null then its a review
    },
    review:{
        title: String,
        description: String,
        rating: Number
    }
});



//this middleware make sure that this post is created from this author
/*
PostSchema.pre('save', function (next) {
    this.content  = Post(this.author); //slygify in the video
    next();
});
PostSchema.pre('validate', function(next){
    if(!this.author)
    next();
});
*/
function post(text){
    return text.toString().toLowerCase()
        .replace(/\s+/g,'-') //replace spaces with -
        .replace(/[^(\w\-]+/g,'') //remove all non world chars
        .replace(/^-+/,'') //trim start of text
        .replace(/-+$/,''); // trim end of text
}

var Post = module.exports = mongoose.model('Post', PostSchema);

