import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: { 
        type: String, 
        require: true, 
        unique: true
    }, 
    description: {
        type: String ,
        required: true
    }, 
    picture: {
        type: String, 
        require: false 
    }, 
    username: {
        type: String, 
        require: true
    }, 
    categories: { 
        type: Array,
        require: false 
    },
    createdDate: {
        type: Date
    }
})

const Post = mongoose.model('Post', PostSchema);

export default Post;

