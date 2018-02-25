const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title:{ type:String, required: true},
    content: {type: String, required: true},

    author_id:{
        type:Schema.Types.ObjectId,
        ref: 'Customer'
    },
/*
    author_id:{
        type:String,
        required: true
   },*/
    timestamp: {type: Date},
    update: {type: Date, default: Date.now()}

});


//this middleware make sure that this post is created from this author

PostSchema.pre('save', function (next) {
    author_id  = Post(this.author_id); //slygify in the video
    next();
});

PostSchema.pre('validate', function(next){
    if(!this.author)
    next();
});

PostSchema.pre('save', function(next){// added updated date
    var currentDate = new Date();
    this.updated_at = currentDate;
    if(!this.updated_at)
        this.updated_at = currentDate;
    next();
});

function post(text){
    return text.toString().toLowerCase()
        .replace(/\s+/g,'-') //replace spaces with -
        .replace(/[^(\w\-]+/g,'') //remove all non world chars
        .replace(/^-+/,'') //trim start of text
        .replace(/-+$/,''); // trim end of text
}

var Post = module.exports = mongoose.model('Post', PostSchema);

