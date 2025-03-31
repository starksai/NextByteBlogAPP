import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },

    title: {
        type: String,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        trim: true,
        required: true,
        unique: true,

    },
    blogContent: {
        type: String,
        trim: true,
        required: true
    },
    featuredImage: {
        type: String,
        trim: true,
        required: true
    }

}, {timestamps : true})

const Blog = mongoose.model('Blog', blogSchema, "Blogs")

export default Blog 