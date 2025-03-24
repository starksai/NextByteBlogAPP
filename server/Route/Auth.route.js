import express from 'express'
import { GoogleLogin, Login, Logout, Register } from '../controllers/Auth.controller.js'

const AuthRouter = express.Router()

AuthRouter.post('/register', Register)
AuthRouter.post('/login', Login)
AuthRouter.post('/Google-login', GoogleLogin)
AuthRouter.get('/logout', Logout)

export default AuthRouter
