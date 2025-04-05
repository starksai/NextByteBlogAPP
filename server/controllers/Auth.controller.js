import { handleError } from "../Helper/handleErroe.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";

export const Register = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            // user already existes
            return next(handleError('402', "user already registerd."))
        }


        const hashPassword = bcrypt.hashSync(password)

        // register
        const user = new User(
            {
                name,
                email,
                password: hashPassword,
            }
        )
        await user.save()  // saving the user

        res.status(200).json({
            success: true,
            message: "Registeration success"
        })






    } catch (error) {
        next(handleError(500, error.message))

    }



}

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        // console.log(user,"user");
        // console.log(user.email,"email from db");
        // console.log(user.password, "password form db");

        if (!user) {
            return next(handleError(404, "Invalid login credentials."))
        }

        const hashPassword = user.password;

        // console.log(password,"password");
        // console.log(hashPassword,"hashpassword");


        const comparePassword = await bcrypt.compare(password, hashPassword)

        // console.log(comparePassword,"compared password......");


        if (!comparePassword) {
            return next(handleError(404, "Invalid login credentials."))
        }

        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }, process.env.JWT_SECRET_KEY)


        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production',
            path: '/'
        })


        const newUser = user.toObject({ getters: true })
        delete newUser.password

        res.status(200).json({
            success: true,
            user: newUser,
            message: "login successful"
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const GoogleLogin = async (req, res, next) => {
    try {
        const { name, email, avatar } = req.body;
        // console.log("Request Body:", req.body); // Debugging
        let user;
        user = await User.findOne({ email })

        // console.log(user,"user");
        // console.log(user.email,"email from db");
        // console.log(user.password, "password form db");

        if (!user) {
            // Create new user if no user found

            const password = Math.random().toString();
            const hashPassword = bcrypt.hashSync(password)

            const newUser = new User({
                name,
                email,
                password: hashPassword,
                avatar
            })

            user = await newUser.save()

        }

        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }, process.env.JWT_SECRET_KEY)


        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production',
            path: '/'
        })

        const newUser = user.toObject({ getters: true })
        delete newUser.password

        res.status(200).json({
            success: true,
            user: newUser,
            message: "login successful"
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const Logout = async (req, res, next) => {
    try {



        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production',
            path: '/'
        })



        res.status(200).json({
            success: true,
            message: "logout successful"
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}