import cloudinary from '../config/cloudinary.js'
import { handleError } from '../Helper/handleErroe.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'


export const getUser = async (req, res, next) => {

    try {
        const { userid } = req.params
        const user = await User.findOne({ _id: userid }).lean().exec()

        if (!user) {
            next(handleError(404, "user not found"))
        }

        res.status(200).json({
            success: true,
            message: "user data found",
            user,
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data)
        const { userid } = req.params

        const user = await User.findById(userid)
        user.name = data.name
        user.email = data.email
        user.bio = data.bio


        if (data.password && data.password.length >= 8) {
            const hashPassword = bcrypt.hashSync(data.password)
            user.password = hashPassword

        }

        if (req.file) {
            try {
                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: "nextbyteblog",
                    resource_type: "auto",
                }).catch((err => {
                    next(handleError(500, err.message))
                }));

                user.avatar = uploadResult.secure_url;
            } catch (cloudinaryError) {
                return next(handleError(500, "Cloudinary upload failed: " + cloudinaryError.message));
            }
        }

        await user.save()
        const newUser = user.toObject({ getters: true })
        delete newUser.password

        res.status(200).json({
            success: true,
            message: "data updated",
            user: newUser
        })

    } catch (error) {
        next(handleError(500, error.message))


    }
}


export const getAllUser = async (req, res, next) => {

    try {
        const users = await User.find().lean().exec()

        // console.log(user);


        if (!users) {
            next(handleError(404, "user not found"))
        }

        res.status(200).json({
            success: true,
            message: "user data found",
            users,
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const deleteUser = async (req, res, next) => {

    try {
        const {userId} = req.params
        const user = await User.findByIdAndDelete(userId).lean().exec()

        // console.log(user);


        if (!user) {
            next(handleError(404, "user not found"))
        }

        res.status(200).json({
            success: true,
            message: "user deleted success"
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}