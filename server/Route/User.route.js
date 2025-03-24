import express from 'express'
import { getUser, updateUser } from '../controllers/user.controller.js'
import upload from '../config/multer.config.js'

const UserRouter = express.Router()

UserRouter.get('/get-user/:userid', getUser)
UserRouter.put('/update-user/:userid',upload.single('file'), updateUser)


export default UserRouter




