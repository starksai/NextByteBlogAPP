import express from 'express'
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/user.controller.js'
import upload from '../config/multer.config.js'

const UserRouter = express.Router()

UserRouter.get('/get-user/:userid', getUser)
UserRouter.put('/update-user/:userid',upload.single('file'), updateUser)
UserRouter.get('/get-all-users', getAllUser)
UserRouter.delete('/delete/:userId', deleteUser)



export default UserRouter




