import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({

    name: {
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

})

const Category = mongoose.model('Category', categorySchema, "categories")

export default Category 