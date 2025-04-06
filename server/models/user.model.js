import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    role:{
        type : String,
        default : "user",
        enum : ['user','admin'],
        trim : true,
        required : true
    },
    name : {
        type : String,
        trim : true,
        required: true
    },
    email:{
        type: String,
        trim : true,
        required: true,
        unique : true
    },
    password:{
        type: String,
        trim : true,
        required: true
    },
    bio:{
        type: String,
        trim : true,
    },
    avatar:{
        type: String,
        trim : true,
        default:""
    }
},{timestamps : true})

const User = mongoose.model('User',userSchema,"users")

export default User